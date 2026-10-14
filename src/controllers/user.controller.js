import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";

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

// Customer Signup / Login via Phone & OTP (Firebase/Auth handled on frontend, backend syncs user)
export const syncUser = asyncHandler(async (req, res) => {
  const { phone, fullName, firebaseUid, clerkId } = req.body;

  if (!phone) {
    throw new ApiError(400, "Mobile number is required");
  }

  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { phone },
        ...(firebaseUid ? [{ firebaseUid }] : []),
        ...(clerkId ? [{ clerkId }] : []),
      ],
    },
  });

  if (user) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        firebaseUid: firebaseUid || user.firebaseUid,
        clerkId: clerkId || user.clerkId,
        fullName: fullName || user.fullName,
      },
    });
  } else {
    if (!fullName) {
      throw new ApiError(400, "Full name is required for registration");
    }

    user = await prisma.user.create({
      data: {
        phone,
        fullName,
        role: "CUSTOMER",
        firebaseUid,
        clerkId,
      },
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user.id
  );

  // Cookie options for security
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  // JSON body ki jagah cookies mein tokens set karke response bhejna
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user.id,
            phone: user.phone,
            fullName: user.fullName,
            role: user.role,
          },
          // Agar chaho toh yahan se tokens hata bhi sakte ho kyunki ab ye cookies mein chale gaye hain
        },
        "User authenticated successfully"
      )
    );
});

// Current Logged-in User (Har protected request par fresh database se data fetch karega)
export const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // verifyJWT middleware se aayega

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
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

// Profile Update (Name ya basic details)
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { fullName } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});
