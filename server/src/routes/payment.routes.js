import { Router } from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Initialize Payment (Customer only)
router.route("/create-order").post(verifyJWT, authorizeRoles("CUSTOMER"), createPaymentOrder);

// Verify / Update Payment Status
router.route("/:paymentId/verify").patch(verifyJWT, verifyPayment);

export default router;