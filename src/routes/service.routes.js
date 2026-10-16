import { Router } from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
} from "../controllers/service.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Public Routes
router.route("/").get(getServices);
router.route("/:id").get(getServiceById);

// Admin-Only Routes
router.route("/").post(verifyJWT, authorizeRoles("ADMIN"), createService);
router.route("/:id").patch(verifyJWT, authorizeRoles("ADMIN"), updateService);

export default router;