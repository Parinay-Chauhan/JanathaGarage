import { Router } from "express";
import {
  onboardTechnician,
  updateTechnicianServices,
} from "../controllers/technician.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Onboarding Route (Only accessible by authenticated TECHNICIAN)
router
  .route("/onboarding")
  .post(verifyJWT, authorizeRoles("TECHNICIAN"), onboardTechnician);

// Service Mapping Route
router
  .route("/me/services")
  .put(verifyJWT, authorizeRoles("TECHNICIAN"), updateTechnicianServices);

export default router;
