import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";
import { firebaseAdmin } from "../utils/firebase.js";
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

  // Clerk flow ko abhi temporarily disable rakha hai jab tak proper SDK verification na lag jaye
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

  let decodedToken;
  try {
    // Firebase token verify karo
    decodedToken = await firebaseAdmin.auth().verifyIdToken(firebaseIdToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired Firebase token");
  }

  const firebaseUid = decodedToken.uid;
  const verifiedPhone = decodedToken.phone_number;

  // Agar Firebase token mein phone number claim nahi hai, request reject karo
  if (!verifiedPhone) {
    throw new ApiError(
      400,
      "Verified phone number is missing from authentication token"
    );
  }

  // Account matching: Pehle Firebase UID se user dhoondo
  let user = await prisma.user.findUnique({
    where: { firebaseUid },
  });

  if (user) {
    // User pehle se exist karta hai, naam update kar sakte hain agar diya ho
    if (fullName && fullName.trim() !== "") {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { fullName: fullName.trim() },
      });
    }
  } else {
    // Agar Firebase UID se nahi mila, toh check karo ki ye verified phone pehle se registered hai kya
    user = await prisma.user.findUnique({
      where: { phone: verifiedPhone },
    });

    if (user) {
      // Phone match ho gaya, ab secure tarike se is account ko current Firebase UID se link karo
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
      // Naya user hai toh full name required hona chahiye
      if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
        throw new ApiError(400, "Full name is required for new registration");
      }

      user = await prisma.user.create({
        data: {
          phone: verifiedPhone,
          fullName: fullName.trim(),
          role: "CUSTOMER", // Backend khud default CUSTOMER set karega
          firebaseUid,
        },
      });
    }
  }

  // Tokens generate karo
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
        { user: safeUserData },
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

// Profile Update with validation
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

export {
  generateAccessAndRefreshTokens,
  syncUser,
  getCurrentUser,
  updateProfile,
};
