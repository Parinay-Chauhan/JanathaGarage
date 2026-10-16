import { Router } from "express";
import {
  createBooking,
  respondToBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Create Booking Route (Accessible only by CUSTOMER)
router.route("/").post(verifyJWT, authorizeRoles("CUSTOMER"), createBooking);

// Technician Action Routes
router
  .route("/:id/respond")
  .patch(verifyJWT, authorizeRoles("TECHNICIAN"), respondToBooking);
router
  .route("/:id/status")
  .patch(verifyJWT, authorizeRoles("TECHNICIAN"), updateBookingStatus);

export default router;
