import { Router } from "express";
import {
  getPendingKYCApplications,
  getTechnicianKYCDetails,
  updateTechnicianKYCStatus,
  getPlatformStats,
  getAllUsers,
  toggleUserStatus,
  getAllPayments,
  processPaymentRefund,
} from "../controllers/admin.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Strict security: All admin routes require JWT and ADMIN role
router.use(verifyJWT, authorizeRoles("ADMIN"));

// KYC Management Routes
router.route("/technicians/kyc/pending").get(getPendingKYCApplications);
router.route("/technicians/:id/kyc").get(getTechnicianKYCDetails);
router.route("/technicians/:id/kyc").patch(updateTechnicianKYCStatus);

// Platform Analytics & Dashboard Stats
router.route("/dashboard/stats").get(getPlatformStats);

// User Directory & Activation Controls
router.route("/users").get(getAllUsers);
router.route("/users/:id/status").patch(toggleUserStatus);

// Payments & Refund Management
router.route("/payments").get(getAllPayments);
router.route("/payments/:id/refund").post(processPaymentRefund);

export default router;