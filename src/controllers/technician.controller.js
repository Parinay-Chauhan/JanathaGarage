import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 4.1 — Technician Onboarding / Profile Setup (UPSERT)
export const onboardTechnician = asyncHandler(async (req, res) => {
  const userId = req.user.id; // verifyJWT middleware se milega
  const {
    bio,
    experienceYears,
    baseVisitingCharge,
    serviceRadiusKm,
    latitude,
    longitude,
  } = req.body;

  // Validation
  if (baseVisitingCharge === undefined || isNaN(Number(baseVisitingCharge)) || Number(baseVisitingCharge) < 0) {
    throw new ApiError(400, "Valid base visiting charge is required");
  }

  if (experienceYears !== undefined && (isNaN(Number(experienceYears)) || Number(experienceYears) < 0)) {
    throw new ApiError(400, "Valid experience years must be a non-negative number");
  }

  if (serviceRadiusKm !== undefined && (isNaN(Number(serviceRadiusKm)) || Number(serviceRadiusKm) <= 0)) {
    throw new ApiError(400, "Service radius must be greater than zero");
  }

  // Upsert Technician Profile (Create if not exists, Update if exists)
  const technicianProfile = await prisma.technicianProfile.upsert({
    where: { userId },
    update: {
      ...(bio !== undefined && { bio: bio.trim() }),
      ...(experienceYears !== undefined && { experienceYears: Number(experienceYears) }),
      ...(baseVisitingCharge !== undefined && { baseVisitingCharge: Number(baseVisitingCharge) }),
      ...(serviceRadiusKm !== undefined && { serviceRadiusKm: Number(serviceRadiusKm) }),
      ...(latitude !== undefined && { latitude: Number(latitude) }),
      ...(longitude !== undefined && { longitude: Number(longitude) }),
    },
    create: {
      userId,
      bio: bio ? bio.trim() : null,
      experienceYears: experienceYears ? Number(experienceYears) : 0,
      baseVisitingCharge: Number(baseVisitingCharge),
      serviceRadiusKm: serviceRadiusKm ? Number(serviceRadiusKm) : 10.0,
      latitude: latitude !== undefined ? Number(latitude) : null,
      longitude: longitude !== undefined ? Number(longitude) : null,
      isOnline: false,
      isAvailable: true,
      kycStatus: "NOT_SUBMITTED",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        technicianProfile,
        "Technician onboarding details saved successfully"
      )
    );
});

// 4.2 — Map Services to Technician
export const updateTechnicianServices = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { services } = req.body; // Array of { serviceId, customPrice }

  if (!Array.isArray(services)) {
    throw new ApiError(400, "Services must be provided as an array");
  }

  // Get technician profile ID using userId
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technicianProfile) {
    throw new ApiError(404, "Technician profile not found. Complete onboarding first.");
  }

  const technicianId = technicianProfile.id;

  // Validate that all serviceIds exist in the catalog
  const serviceIds = services.map((s) => s.serviceId);
  
  // Check for duplicate serviceIds in the request
  const uniqueServiceIds = new Set(serviceIds);
  if (uniqueServiceIds.size !== serviceIds.length) {
    throw new ApiError(400, "Duplicate service IDs are not allowed in the request");
  }

  const existingServices = await prisma.service.findMany({
    where: { id: { in: serviceIds } },
  });

  if (existingServices.length !== serviceIds.length) {
    throw new ApiError(400, "One or more service IDs are invalid or do not exist");
  }

  // Use transaction to sync technician services securely
  const updatedMapping = await prisma.$transaction(async (tx) => {
    // Optional: Delete existing mappings or upsert them. 
    // Here we will upsert each service mapping provided.
    const operations = services.map((item) => {
      return tx.technicianService.upsert({
        where: {
          technicianId_serviceId: {
            technicianId,
            serviceId: item.serviceId,
          },
        },
        update: {
          customPrice: item.customPrice !== undefined ? Number(item.customPrice) : null,
        },
        create: {
          technicianId,
          serviceId: item.serviceId,
          customPrice: item.customPrice !== undefined ? Number(item.customPrice) : null,
        },
      });
    });

    await Promise.all(operations);

    // Return current list of mapped services
    return tx.technicianService.findMany({
      where: { technicianId },
      include: {
        service: {
          include: {
            category: true,
          },
        },
      },
    });
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedMapping,
        "Technician services updated successfully"
      )
    );
});