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
  const userId = req.user.id;
  const { serviceId, problemDescription, scheduledAt, serviceAddress, latitude, longitude } = req.body;

  if (!serviceId) throw new ApiError(400, "Service ID is required");
  if (!scheduledAt) throw new ApiError(400, "Scheduled appointment time is required");
  if (!serviceAddress || serviceAddress.trim() === "") throw new ApiError(400, "Service address is required");

  const appointmentDate = new Date(scheduledAt);
  if (isNaN(appointmentDate.getTime()) || appointmentDate <= new Date()) {
    throw new ApiError(400, "Scheduled time must be a valid future date and time");
  }

  const customerProfile = await prisma.customerProfile.findUnique({ where: { userId } });
  if (!customerProfile) throw new ApiError(404, "Customer profile not found.");

  const service = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!service) throw new ApiError(404, "Selected service does not exist");

  const bookingNumber = generateBookingNumber();

  // Generate a random 4-digit start OTP for job verification
  const startOtp = Math.floor(1000 + Math.random() * 9000).toString();

  const newBooking = await prisma.booking.create({
    data: {
      bookingNumber,
      customerId: customerProfile.id,
      serviceId,
      status: "PENDING",
      problemDescription: problemDescription ? problemDescription.trim() : "",
      scheduledAt: appointmentDate,
      agreedPrice: service.defaultPrice,
      serviceAddress: serviceAddress.trim(),
      latitude: latitude !== undefined ? Number(latitude) : null,
      longitude: longitude !== undefined ? Number(longitude) : null,
      startOtp,
    },
    include: {
      service: { include: { category: true } },
      customer: { include: { user: { select: { fullName: true, email: true, phone: true } } } },
    },
  });

  return res.status(201).json(
    new ApiResponse(201, newBooking, "Booking created successfully and is pending technician assignment")
  );
});

// 5.2 — Technician Accept or Reject Booking
export const respondToBooking = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id: bookingId } = req.params;
  const { action } = req.body;

  if (!["ACCEPT", "REJECT"].includes(action)) {
    throw new ApiError(400, "Invalid action. Must be either 'ACCEPT' or 'REJECT'");
  }

  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
  if (!technicianProfile) throw new ApiError(404, "Technician profile not found");

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new ApiError(404, "Booking not found");

  if (booking.status !== "PENDING") {
    throw new ApiError(400, `Booking cannot be modified as it is currently ${booking.status}`);
  }

  if (action === "ACCEPT") {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        technicianId: technicianProfile.id,
        status: "ACCEPTED",
      },
    });
    return res.status(200).json(new ApiResponse(200, updatedBooking, "Booking accepted successfully"));
  } else {
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });
    return res.status(200).json(new ApiResponse(200, updatedBooking, "Booking rejected"));
  }
});

// 5.3 — Update Booking Status Progression
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id: bookingId } = req.params;
  const { status, otp } = req.body;

  const validStatuses = ["EN_ROUTE", "ARRIVED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(status)) throw new ApiError(400, "Invalid status progression value");

  const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
  if (!technicianProfile) throw new ApiError(404, "Technician profile not found");

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new ApiError(404, "Booking not found");

  if (booking.technicianId !== technicianProfile.id) {
    throw new ApiError(403, "You are not assigned to this booking");
  }

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

// 6.1 — Get Logged-in User Bookings (Customer / Technician History with Filters & Pagination)
export const getMyBookings = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  const { status, page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  let whereClause = {};

  if (role === "CUSTOMER") {
    const customerProfile = await prisma.customerProfile.findUnique({ where: { userId } });
    if (!customerProfile) throw new ApiError(404, "Customer profile not found");
    whereClause.customerId = customerProfile.id;
  } else if (role === "TECHNICIAN") {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!technicianProfile) throw new ApiError(404, "Technician profile not found");
    whereClause.technicianId = technicianProfile.id;
  } else if (role !== "ADMIN") {
    throw new ApiError(403, "Unauthorized role access");
  }

  if (status) {
    whereClause.status = status.toUpperCase();
  }

  const [bookings, totalCount] = await Promise.all([
    prisma.booking.findMany({
      where: whereClause,
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        bookingNumber: true,
        status: true,
        problemDescription: true,
        scheduledAt: true,
        agreedPrice: true,
        serviceAddress: true,
        createdAt: true,
        service: {
          select: {
            id: true,
            title: true,
            defaultPrice: true,
            category: { select: { name: true } },
          },
        },
        customer: {
          select: {
            user: { select: { fullName: true, phone: true } },
          },
        },
        technician: {
          select: {
            user: { select: { fullName: true, phone: true } },
            experienceYears: true,
          },
        },
      },
    }),
    prisma.booking.count({ where: whereClause }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        bookings,
        pagination: {
          total: totalCount,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalCount / limitNum),
        },
      },
      "Bookings history fetched successfully"
    )
  );
});

// 6.1 — Get Single Booking Details By ID (Strict Ownership & Authorization Check)
export const getBookingById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  const { id: bookingId } = req.params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: { include: { category: true } },
      customer: { include: { user: { select: { fullName: true, email: true, phone: true } } } },
      technician: { include: { user: { select: { fullName: true, email: true, phone: true } } } },
    },
  });

  if (!booking) throw new ApiError(404, "Booking not found");

  // Verify ownership
  if (role === "CUSTOMER") {
    const customerProfile = await prisma.customerProfile.findUnique({ where: { userId } });
    if (!customerProfile || booking.customerId !== customerProfile.id) {
      throw new ApiError(403, "Access denied: You do not own this booking");
    }
  } else if (role === "TECHNICIAN") {
    const technicianProfile = await prisma.technicianProfile.findUnique({ where: { userId } });
    if (!technicianProfile || booking.technicianId !== technicianProfile.id) {
      throw new ApiError(403, "Access denied: You are not assigned to this booking");
    }
  } else if (role !== "ADMIN") {
    throw new ApiError(403, "Unauthorized access");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking details fetched successfully"));
});