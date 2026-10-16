import { Router } from "express";
import { onboardTechnician } from "../controllers/technicain.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Onboarding Route (Only accessible by authenticated TECHNICIAN)
router.route("/onboarding").post(verifyJWT, authorizeRoles("TECHNICIAN"), onboardTechnician);

export default router;