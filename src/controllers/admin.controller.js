import { prisma } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// 7.1.1 — Get Paginated Pending/Submitted KYC List (Admin Only)
export const getPendingKYCApplications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status = "SUBMITTED" } = req.query;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "VERIFIED", "REJECTED"];
  const filterStatus = validStatuses.includes(status.toUpperCase()) ? status.toUpperCase() : "SUBMITTED";

  const [technicians, totalCount] = await Promise.all([
    prisma.technicianProfile.findMany({
      where: { kycStatus: filterStatus },
      skip,
      take: limitNum,
      orderBy: { updatedAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
            isActive: true,
          },
        },
      },
    }),
    prisma.technicianProfile.count({ where: { kycStatus: filterStatus } }),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        technicians,
        pagination: {
          total: totalCount,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalCount / limitNum),
        },
      },
      "KYC applications fetched successfully"
    )
  );
});

// 7.1.2 — Get Specific Technician KYC Details (Admin Only)
export const getTechnicianKYCDetails = asyncHandler(async (req, res) => {
  const { id: technicianId } = req.params;

  const technician = await prisma.technicianProfile.findUnique({
    where: { id: technicianId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          phone: true,
          email: true,
          createdAt: true,
        },
      },
      servicesOffered: {
        include: { service: true },
      },
    },
  });

  if (!technician) {
    throw new ApiError(404, "Technician profile not found");
  }

  return res.status(200).json(
    new ApiResponse(200, technician, "Technician KYC details fetched successfully")
  );
});

// 7.1.3 — Verify or Reject Technician KYC (Admin Only)
export const updateTechnicianKYCStatus = asyncHandler(async (req, res) => {
  const { id: technicianId } = req.params;
  const { status, rejectionReason } = req.body; // status: VERIFIED, REJECTED, UNDER_REVIEW

  const validStatuses = ["VERIFIED", "REJECTED", "UNDER_REVIEW"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid KYC status. Must be VERIFIED, REJECTED, or UNDER_REVIEW");
  }

  if (status === "REJECTED" && (!rejectionReason || rejectionReason.trim() === "")) {
    throw new ApiError(400, "Rejection reason is mandatory when rejecting KYC documents");
  }

  const technician = await prisma.technicianProfile.findUnique({
    where: { id: technicianId },
  });

  if (!technician) {
    throw new ApiError(404, "Technician profile not found");
  }

  const updatedProfile = await prisma.technicianProfile.update({
    where: { id: technicianId },
    data: {
      kycStatus: status,
      rejectionReason: status === "REJECTED" ? rejectionReason.trim() : null,
    },
    include: {
      user: { select: { fullName: true, phone: true, email: true } },
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedProfile,
      `Technician KYC status successfully updated to ${status}`
    )
  );
});

// 7.1.4 — Platform-Wide Statistics & Metrics (Admin Only)
export const getPlatformStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalCustomers,
    totalTechnicians,
    pendingKycCount,
    totalBookings,
    completedBookings,
    totalRevenueData,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.customerProfile.count(),
    prisma.technicianProfile.count(),
    prisma.technicianProfile.count({ where: { kycStatus: "SUBMITTED" } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "COMPLETED" } }),
    // Aggregate revenue ONLY from successful payments
    prisma.payment.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true },
    }),
  ]);

  const totalRevenue = totalRevenueData._sum.amount ? Number(totalRevenueData._sum.amount) : 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users: {
          total: totalUsers,
          customers: totalCustomers,
          technicians: totalTechnicians,
        },
        kyc: {
          pendingVerification: pendingKycCount,
        },
        bookings: {
          total: totalBookings,
          completed: completedBookings,
        },
        revenue: {
          totalINR: totalRevenue,
        },
      },
      "Platform statistics fetched successfully"
    )
  );
});