import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";
import { firebaseAuth } from "../utils/firebase.js";

// Helper function for tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// Secure Customer Signup / Login via Firebase OTP
const syncUser = asyncHandler(async (req, res) => {
  const { firebaseIdToken, fullName, authProvider } = req.body;

  if (authProvider === "clerk") {
    throw new ApiError(
      400,
      "Clerk authentication is currently disabled. Please use Firebase OTP."
    );
  }

  if (authProvider !== "firebase") {
    throw new ApiError(400, "Invalid or unsupported authentication provider");
  }

  if (!firebaseIdToken) {
    throw new ApiError(400, "Firebase ID token is required");
  }

  let verifiedPhone;
  let firebaseUid;

  // --- POSTMAN TESTING BYPASS (Jab tak frontend na ho) ---
  if (firebaseIdToken === "test_token_123") {
    verifiedPhone = "9876543210";
    firebaseUid = "test_firebase_uid_abc123";
  } else {
    let decodedToken;
    try {
      decodedToken = await firebaseAuth.verifyIdToken(firebaseIdToken);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired Firebase token");
    }

    firebaseUid = decodedToken.uid;
    verifiedPhone = decodedToken.phone_number;
  }

  if (!verifiedPhone) {
    throw new ApiError(
      400,
      "Verified phone number is missing from authentication token"
    );
  }

  let user = await prisma.user.findUnique({
    where: { firebaseUid },
  });

  if (user) {
    if (fullName && fullName.trim() !== "") {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { fullName: fullName.trim() },
      });
    }
  } else {
    user = await prisma.user.findUnique({
      where: { phone: verifiedPhone },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          firebaseUid,
          ...(fullName && fullName.trim() !== ""
            ? { fullName: fullName.trim() }
            : {}),
        },
      });
    } else {
      if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
        throw new ApiError(400, "Full name is required for new registration");
      }

      user = await prisma.user.create({
        data: {
          phone: verifiedPhone,
          fullName: fullName.trim(),
          role: "CUSTOMER",
          firebaseUid,
        },
      });
    }
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user.id
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  const safeUserData = {
    id: user.id,
    phone: user.phone,
    fullName: user.fullName,
    role: user.role,
    isActive: user.isActive,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: safeUserData, accessToken },
        "User authenticated successfully"
      )
    );
});

// Current Logged-in User
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      phone: true,
      fullName: true,
      role: true,
      isActive: true,
      createdAt: true,
      customerProfile: true,
      technicianProfile: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

// Profile Update (updateMe)
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { fullName } = req.body;

  if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
    throw new ApiError(400, "Valid full name is required for profile update");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName: fullName.trim(),
    },
    select: {
      id: true,
      phone: true,
      fullName: true,
      role: true,
      isActive: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

const updateCustomerProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { address, latitude, longitude } = req.body;

  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }

  // Verify the current role from the database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, isActive: true },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  if (user.role !== "CUSTOMER") {
    throw new ApiError(403, "Only customers can update customer profiles");
  }

  const allowedFields = ["address", "latitude", "longitude"];
  const receivedFields = Object.keys(req.body);

  if (
    receivedFields.length === 0 ||
    receivedFields.some((key) => !allowedFields.includes(key))
  ) {
    throw new ApiError(400, "Provide valid customer profile fields");
  }

  const data = {};

  if (Object.hasOwn(req.body, "address")) {
    if (
      address !== null &&
      (typeof address !== "string" || address.trim() === "")
    ) {
      throw new ApiError(400, "Address must be a non-empty string or null");
    }

    data.address = address === null ? null : address.trim();
  }

  if (Object.hasOwn(req.body, "latitude")) {
    if (
      latitude !== null &&
      (typeof latitude !== "number" ||
        !Number.isFinite(latitude) ||
        latitude < -90 ||
        latitude > 90)
    ) {
      throw new ApiError(400, "Latitude must be between -90 and 90, or null");
    }

    data.latitude = latitude;
  }

  if (Object.hasOwn(req.body, "longitude")) {
    if (
      longitude !== null &&
      (typeof longitude !== "number" ||
        !Number.isFinite(longitude) ||
        longitude < -180 ||
        longitude > 180)
    ) {
      throw new ApiError(
        400,
        "Longitude must be between -180 and 180, or null"
      );
    }

    data.longitude = longitude;
  }

  const profile = await prisma.customerProfile.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, profile, "Customer profile updated successfully")
    );
});

const updateTechnicianProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Authentication required");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, isActive: true },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  if (user.role !== "TECHNICIAN") {
    throw new ApiError(403, "Only technicians can update technician profiles");
  }

  const allowedFields = [
    "bio",
    "experienceYears",
    "baseVisitingCharge",
    "serviceRadiusKm",
    "latitude",
    "longitude",
  ];

  const receivedFields = Object.keys(req.body);

  if (
    receivedFields.length === 0 ||
    receivedFields.some((key) => !allowedFields.includes(key))
  ) {
    throw new ApiError(400, "Provide valid technician profile fields");
  }

  const data = {};

  if (Object.hasOwn(req.body, "bio")) {
    const { bio } = req.body;

    if (bio !== null && typeof bio !== "string") {
      throw new ApiError(400, "Bio must be a string or null");
    }

    data.bio = bio === null ? null : bio.trim();
  }

  if (Object.hasOwn(req.body, "experienceYears")) {
    const { experienceYears } = req.body;

    if (
      !Number.isInteger(experienceYears) ||
      experienceYears < 0 ||
      experienceYears > 80
    ) {
      throw new ApiError(
        400,
        "Experience must be a whole number between 0 and 80"
      );
    }

    data.experienceYears = experienceYears;
  }

  if (Object.hasOwn(req.body, "baseVisitingCharge")) {
    const { baseVisitingCharge } = req.body;

    if (
      typeof baseVisitingCharge !== "number" ||
      !Number.isFinite(baseVisitingCharge) ||
      baseVisitingCharge < 0
    ) {
      throw new ApiError(400, "Visiting charge must be a non-negative number");
    }

    data.baseVisitingCharge = baseVisitingCharge;
  }

  if (Object.hasOwn(req.body, "serviceRadiusKm")) {
    const { serviceRadiusKm } = req.body;

    if (
      typeof serviceRadiusKm !== "number" ||
      !Number.isFinite(serviceRadiusKm) ||
      serviceRadiusKm <= 0 ||
      serviceRadiusKm > 200
    ) {
      throw new ApiError(
        400,
        "Service radius must be greater than 0 and at most 200 km"
      );
    }

    data.serviceRadiusKm = serviceRadiusKm;
  }

  if (Object.hasOwn(req.body, "latitude")) {
    const { latitude } = req.body;

    if (
      latitude !== null &&
      (typeof latitude !== "number" ||
        !Number.isFinite(latitude) ||
        latitude < -90 ||
        latitude > 90)
    ) {
      throw new ApiError(400, "Latitude must be between -90 and 90, or null");
    }

    data.latitude = latitude;
  }

  if (Object.hasOwn(req.body, "longitude")) {
    const { longitude } = req.body;

    if (
      longitude !== null &&
      (typeof longitude !== "number" ||
        !Number.isFinite(longitude) ||
        longitude < -180 ||
        longitude > 180)
    ) {
      throw new ApiError(
        400,
        "Longitude must be between -180 and 180, or null"
      );
    }

    data.longitude = longitude;
  }

  // A technician profile must be created through onboarding first.
  const existingProfile = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new ApiError(
      404,
      "Technician profile not found. Complete technician onboarding first."
    );
  }

  const profile = await prisma.technicianProfile.update({
    where: { userId },
    data,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, profile, "Technician profile updated successfully")
    );
});

export {
  syncUser,
  getCurrentUser,
  updateProfile,
  updateCustomerProfile,
  updateTechnicianProfile,
};
