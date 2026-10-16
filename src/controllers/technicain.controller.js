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