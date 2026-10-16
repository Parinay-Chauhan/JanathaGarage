import { Router } from "express";
import { createBooking } from "../controllers/booking.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// Create Booking Route (Accessible only by CUSTOMER)
router.route("/").post(verifyJWT, authorizeRoles("CUSTOMER"), createBooking);

export default router;