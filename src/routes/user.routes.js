import { Router } from "express";
import { 
  syncUser, 
  getCurrentUser, 
  updateProfile 
} from "../controllers/user.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Public route (Clerk/Firebase login ke baad user ko sync karne ke liye)
router.route("/sync").post(syncUser);

// Protected routes (Inke liye JWT token dena zaroori hoga)
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateProfile);

export default router;