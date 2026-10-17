import { Router } from "express";
import {
  createReview,
  getTechnicianReviews,
} from "../controllers/review.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Post Review for a Booking (Customer only)
router.route("/bookings/:bookingId/review").post(verifyJWT, authorizeRoles("CUSTOMER"), createReview);

// Get Reviews of a Technician (Public / Authenticated)
router.route("/technicians/:technicianId/reviews").get(getTechnicianReviews);

export default router;