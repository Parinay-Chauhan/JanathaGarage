import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 6.2.1 — Add Review for a Completed Booking (Customer Only)
export const createReview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { bookingId } = req.params;
  const { rating, comment } = req.body;

  // Validation
  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be an integer between 1 and 5");
  }

  const customerProfile = await prisma.customerProfile.findUnique({
    where: { userId },
  });

  if (!customerProfile) {
    throw new ApiError(404, "Customer profile not found");
  }

  // Find booking
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  // Check ownership
  if (booking.customerId !== customerProfile.id) {
    throw new ApiError(403, "You can only review your own bookings");
  }

  // Ensure booking status is COMPLETED
  if (booking.status !== "COMPLETED") {
    throw new ApiError(400, "Review can only be submitted for COMPLETED bookings");
  }

  if (!booking.technicianId) {
    throw new ApiError(400, "No technician was assigned to this booking");
  }

  // Check if review already exists for this booking
  const existingReview = await prisma.review.findUnique({
    where: { bookingId },
  });

  if (existingReview) {
    throw new ApiError(400, "A review has already been submitted for this booking");
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      rating,
      comment: comment ? comment.trim() : null,
      bookingId,
      customerId: customerProfile.id,
      technicianId: booking.technicianId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, review, "Review submitted successfully"));
});

// 6.2.2 — Get All Reviews for a Technician
export const getTechnicianReviews = asyncHandler(async (req, res) => {
  const { technicianId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const technicianExists = await prisma.technicianProfile.findUnique({
    where: { id: technicianId },
  });

  if (!technicianExists) {
    throw new ApiError(404, "Technician not found");
  }

  const [reviews, totalCount, aggregateStats] = await Promise.all([
    prisma.review.findMany({
      where: { technicianId },
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        customer: {
          select: {
            user: { select: { fullName: true } },
          },
        },
      },
    }),
    prisma.review.count({ where: { technicianId } }),
    prisma.review.aggregate({
      where: { technicianId },
      _avg: { rating: true },
    }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        reviews,
        averageRating: aggregateStats._avg.rating ? Number(aggregateStats._avg.rating.toFixed(1)) : 0,
        pagination: {
          total: totalCount,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalCount / limitNum),
        },
      },
      "Technician reviews fetched successfully"
    )
  );
});