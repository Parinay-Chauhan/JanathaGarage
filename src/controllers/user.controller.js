import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 1. User ko sync/create karna (Jab frontend se Clerk/Firebase login ke baad request aaye)
const syncUser = asyncHandler(async (req, res) => {
  const { phone, fullName, clerkId, firebaseUid, email } = req.body;

  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }

  // Check karo ki user pehle se database mein hai ya nahi (phone ya external IDs se)
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { phone },
        ...(clerkId ? [{ clerkId }] : []),
        ...(firebaseUid ? [{ firebaseUid }] : []),
      ],
    },
  });

  if (user) {
    // Agar user mil gaya, toh external IDs update kar sakte hain agar missing ho
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        clerkId: clerkId || user.clerkId,
        firebaseUid: firebaseUid || user.firebaseUid,
        fullName: fullName || user.fullName,
      },
    });
  } else {
    // Agar naya user hai, toh create kar do
    user = await prisma.user.create({
      data: {
        phone,
        fullName: fullName || "Janta User",
        clerkId,
        firebaseUid,
      },
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User synchronized successfully"));
});

// 2. Current Logged-in User ki details nikalna
const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // Yeh auth middleware se aayega

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

// 3. User Profile Update karna
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { fullName, phone } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
      phone,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});


export {
    syncUser,
    getCurrentUser,
    updateProfile
}