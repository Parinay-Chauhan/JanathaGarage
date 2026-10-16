import { Router } from "express";
import {
  createBooking,
  respondToBooking,
  updateBookingStatus,
  getMyBookings,
  getBookingById,
} from "../controllers/booking.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// 1. Static Routes (Hamesha dynamic routes se upar hone chahiye)
router
  .route("/my-bookings")
  .get(
    verifyJWT,
    authorizeRoles("CUSTOMER", "TECHNICIAN", "ADMIN"),
    getMyBookings
  );

// 2. Create Booking Route (Accessible only by CUSTOMER)
router.route("/").post(verifyJWT, authorizeRoles("CUSTOMER"), createBooking);

// 3. Technician Operational & Action Routes
router
  .route("/:id/respond")
  .patch(verifyJWT, authorizeRoles("TECHNICIAN"), respondToBooking);
router
  .route("/:id/status")
  .patch(verifyJWT, authorizeRoles("TECHNICIAN"), updateBookingStatus);

// 4. Dynamic Single Booking Route (Sabse last mein)
router
  .route("/:id")
  .get(
    verifyJWT,
    authorizeRoles("CUSTOMER", "TECHNICIAN", "ADMIN"),
    getBookingById
  );

export default router;
