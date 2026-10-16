import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Helper function to generate unique booking number
const generateBookingNumber = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomStr = Math.floor(1000 + Math.random() * 9000);
  return `JG-${dateStr}-${randomStr}`;
};

// 5.1 — Create Booking (Customer Only)
export const createBooking = asyncHandler(async (req, res) => {
  const userId = req.user.id; // verifyJWT se aayega
  const { serviceId, problemDescription, scheduledAt, serviceAddress, latitude, longitude } = req.body;

  // 1. Validate required fields
  if (!serviceId) {
    throw new ApiError(400, "Service ID is required");
  }

  if (!scheduledAt) {
    throw new ApiError(400, "Scheduled appointment time is required");
  }

  if (!serviceAddress || typeof serviceAddress !== "string" || serviceAddress.trim() === "") {
    throw new ApiError(400, "Service address is required");
  }

  // 2. Check if appointment time is in the future
  const appointmentDate = new Date(scheduledAt);
  if (isNaN(appointmentDate.getTime()) || appointmentDate <= new Date()) {
    throw new ApiError(400, "Scheduled time must be a valid future date and time");
  }

  // 3. Verify Customer Profile exists for this user
  const customerProfile = await prisma.customerProfile.findUnique({
    where: { userId },
  });

  if (!customerProfile) {
    throw new ApiError(404, "Customer profile not found. Please complete profile setup first.");
  }

  // 4. Verify Service exists and fetch its default price
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    throw new ApiError(404, "Selected service does not exist in the catalog");
  }

  // 5. Create Booking record
  const bookingNumber = generateBookingNumber();

  const newBooking = await prisma.booking.create({
    data: {
      bookingNumber,
      customerId: customerProfile.id,
      serviceId,
      status: "PENDING",
      problemDescription: problemDescription ? problemDescription.trim() : null,
      scheduledAt: appointmentDate,
      agreedPrice: service.defaultPrice, // Fallback to service default price for now
      serviceAddress: serviceAddress.trim(),
      latitude: latitude !== undefined ? Number(latitude) : null,
      longitude: longitude !== undefined ? Number(longitude) : null,
    },
    include: {
      service: {
        include: {
          category: true,
        },
      },
      customer: {
        include: {
          user: {
            select: {
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newBooking,
        "Booking created successfully and is pending technician assignment"
      )
    );
});