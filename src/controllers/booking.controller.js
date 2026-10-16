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

// 5.2 — Technician Accept or Reject Booking
export const respondToBooking = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id: bookingId } = req.params;
  const { action } = req.body; // "ACCEPT" ya "REJECT"

  if (!["ACCEPT", "REJECT"].includes(action)) {
    throw new ApiError(400, "Invalid action. Must be either 'ACCEPT' or 'REJECT'");
  }

  // Get technician profile ID
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technicianProfile) {
    throw new ApiError(404, "Technician profile not found");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  if (booking.status !== "PENDING") {
    throw new ApiError(400, `Booking cannot be modified as it is currently ${booking.status}`);
  }

  if (action === "ACCEPT") {
    // Assign technician and update status to ACCEPTED
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        technicianId: technicianProfile.id,
        status: "ACCEPTED",
      },
    });

    return res.status(200).json(
      new ApiResponse(200, updatedBooking, "Booking accepted successfully")
    );
  } else {
    // If rejected, keep it pending or mark as cancelled (here we unassign/leave for others)
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLED", // Or keep pending depending on business logic
      },
    });

    return res.status(200).json(
      new ApiResponse(200, updatedBooking, "Booking rejected")
    );
  }
});

// 5.3 — Update Booking Status Progression (En Route -> Arrived -> In Progress -> Completed)
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id: bookingId } = req.params;
  const { status, otp } = req.body; // Target status: EN_ROUTE, ARRIVED, IN_PROGRESS, COMPLETED, CANCELLED

  const validStatuses = ["EN_ROUTE", "ARRIVED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status progression value");
  }

  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technicianProfile) {
    throw new ApiError(404, "Technician profile not found");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // Ensure only the assigned technician can update this booking
  if (booking.technicianId !== technicianProfile.id) {
    throw new ApiError(403, "You are not assigned to this booking");
  }

  // Optional: OTP validation when moving to IN_PROGRESS
  if (status === "IN_PROGRESS" && booking.startOtp) {
    if (!otp || otp !== booking.startOtp) {
      throw new ApiError(400, "Invalid or missing start OTP provided by customer");
    }
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return res.status(200).json(
    new ApiResponse(200, updatedBooking, `Booking status updated to ${status} successfully`)
  );
});