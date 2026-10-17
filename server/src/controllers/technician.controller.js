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


// 4.3 — Update Technician Availability and Online Status
export const updateAvailability = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { isOnline, isAvailable } = req.body;

  // Validation: At least one field must be provided
  if (isOnline === undefined && isAvailable === undefined) {
    throw new ApiError(400, "Provide at least 'isOnline' or 'isAvailable' to update");
  }

  const data = {};
  if (isOnline !== undefined) {
    if (typeof isOnline !== "boolean") {
      throw new ApiError(400, "'isOnline' must be a boolean value");
    }
    data.isOnline = isOnline;
  }

  if (isAvailable !== undefined) {
    if (typeof isAvailable !== "boolean") {
      throw new ApiError(400, "'isAvailable' must be a boolean value");
    }
    data.isAvailable = isAvailable;
  }

  const technicianProfile = await prisma.technicianProfile.update({
    where: { userId },
    data,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        technicianProfile,
        "Technician status updated successfully"
      )
    );
});


// 4.4 — Submit KYC Documents (Technician)
export const submitKYC = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { docType, docNumber, docUrl } = req.body;

  if (!docType || typeof docType !== "string" || docType.trim() === "") {
    throw new ApiError(400, "Document type is required (e.g., AADHAAR, PAN)");
  }

  if (!docNumber || typeof docNumber !== "string" || docNumber.trim() === "") {
    throw new ApiError(400, "Document number is required");
  }

  if (!docUrl || typeof docUrl !== "string" || docUrl.trim() === "") {
    throw new ApiError(400, "Document image/file URL is required");
  }

  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technicianProfile) {
    throw new ApiError(404, "Technician profile not found. Complete onboarding first.");
  }

  // Update KYC details and set status to SUBMITTED
  const updatedProfile = await prisma.technicianProfile.update({
    where: { userId },
    data: {
      docType: docType.trim().toUpperCase(),
      docNumber: docNumber.trim(),
      docUrl: docUrl.trim(),
      kycStatus: "SUBMITTED", // Automatically set to SUBMITTED for admin review
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProfile,
        "KYC documents submitted successfully. Pending admin review."
      )
    );
});

// 4.5 — Get Public List of Available Technicians
export const getTechnicians = asyncHandler(async (req, res) => {
  const { serviceId, isOnline } = req.query;

  const where = {
    kycStatus: "VERIFIED",
    ...(isOnline !== undefined ? { isOnline: isOnline === "true" } : {}),
    ...(serviceId ? { servicesOffered: { some: { serviceId } } } : {}),
  };

  const technicians = await prisma.technicianProfile.findMany({
    where,
    include: {
      user: { select: { id: true, fullName: true, phone: true } },
      servicesOffered: { include: { service: true } },
      reviews: { select: { rating: true } },
    },
  });

  const formatted = technicians.map((tech) => {
    const totalReviews = tech.reviews.length;
    const avgRating =
      totalReviews > 0
        ? Number((tech.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
        : 5.0;
    return {
      ...tech,
      avgRating,
      totalReviews,
    };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, formatted, "Technicians fetched successfully"));
});

// 4.6 — Get Single Technician Public Profile By ID
export const getTechnicianById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const technician = await prisma.technicianProfile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, fullName: true, phone: true } },
      servicesOffered: { include: { service: true } },
      reviews: {
        include: {
          customer: { include: { user: { select: { fullName: true } } } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!technician) {
    throw new ApiError(404, "Technician not found");
  }

  const totalReviews = technician.reviews.length;
  const avgRating =
    totalReviews > 0
      ? Number((technician.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
      : 5.0;

  return res.status(200).json(
    new ApiResponse(
      200,
      { ...technician, avgRating, totalReviews },
      "Technician details fetched successfully"
    )
  );
});