import { Router } from "express";
import {
  onboardTechnician,
  updateTechnicianServices,
  updateAvailability,
  submitKYC,
  getTechnicians,
  getTechnicianById,
} from "../controllers/technician.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Public Discovery Routes
router.route("/").get(getTechnicians);

// Onboarding Route (Only accessible by authenticated TECHNICIAN)
router
  .route("/onboarding")
  .post(verifyJWT, authorizeRoles("TECHNICIAN"), onboardTechnician);

// Service Mapping Route
router
  .route("/me/services")
  .put(verifyJWT, authorizeRoles("TECHNICIAN"), updateTechnicianServices);

// Availability Route
router
  .route("/me/availability")
  .patch(verifyJWT, authorizeRoles("TECHNICIAN"), updateAvailability);

// KYC Submission Route
router
  .route("/me/kyc")
  .post(verifyJWT, authorizeRoles("TECHNICIAN"), submitKYC);

// Public Single Technician Route (placed last so it doesn't collide with /onboarding or /me/*)
router.route("/:id").get(getTechnicianById);

export default router;
