import { Router } from "express";
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Public Routes
router.route("/").get(getCategories);
router.route("/:slug").get(getCategoryBySlug);

// Admin-Only Routes (Role check for ADMIN)
router.route("/").post(verifyJWT, authorizeRoles("ADMIN"), createCategory);
router.route("/:id").patch(verifyJWT, authorizeRoles("ADMIN"), updateCategory);

export default router;