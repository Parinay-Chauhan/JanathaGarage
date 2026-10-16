import { Router } from "express";
import {
  syncUser,
  getCurrentUser,
  updateProfile,
  updateCustomerProfile,
  updateTechnicianProfile,
} from "../controllers/user.controller.js";

import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

router.route("/sync").post(syncUser);

router.route("/me").get(verifyJWT, getCurrentUser);

router.route("/update-profile").patch(verifyJWT, updateProfile);

router
  .route("/customer-profile")
  .patch(verifyJWT, authorizeRoles("CUSTOMER"), updateCustomerProfile);

router
  .route("/technician-profile")
  .patch(verifyJWT, authorizeRoles("TECHNICIAN"), updateTechnicianProfile);

export default router;
