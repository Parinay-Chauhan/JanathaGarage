import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 6.3.1 — Initialize Payment for a Booking (Customer)
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { bookingId, method = "ONLINE" } = req.body;

  const customerProfile = await prisma.customerProfile.findUnique({
    where: { userId },
  });

  if (!customerProfile) throw new ApiError(404, "Customer profile not found");

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payment: true },
  });

  if (!booking) throw new ApiError(404, "Booking not found");

  if (booking.customerId !== customerProfile.id) {
    throw new ApiError(403, "Access denied: You do not own this booking");
  }

  // Check if payment already exists
  if (booking.payment && booking.payment.status === "SUCCESS") {
    throw new ApiError(400, "Payment for this booking has already been completed successfully");
  }

  // If payment record already exists but is pending, return it; otherwise create new
  let payment = booking.payment;
  if (!payment) {
    payment = await prisma.payment.create({
      data: {
        bookingId,
        amount: booking.agreedPrice || 0.0,
        method: method.toUpperCase(),
        status: "PENDING",
      },
    });
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        paymentId: payment.id,
        amount: payment.amount,
        currency: "INR",
        status: payment.status,
      },
      "Payment order initialized successfully"
    )
  );
});

// 6.3.2 — Verify & Update Payment Status (Webhook or Success Callback)
export const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const { transactionId, status } = req.body; // status: SUCCESS, FAILED

  if (!["SUCCESS", "FAILED"].includes(status)) {
    throw new ApiError(400, "Invalid payment status provided");
  }

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) throw new ApiError(404, "Payment record not found");

  const updatedPayment = await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: status.toUpperCase(),
      transactionId: transactionId ? transactionId.trim() : payment.transactionId,
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedPayment,
      `Payment status updated to ${status} successfully`
    )
  );
});