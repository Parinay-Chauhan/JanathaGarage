/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new service booking (Customer only)
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - scheduledAt
 *               - serviceAddress
 *             properties:
 *               serviceId:
 *                 type: string
 *                 example: "uuid-service-id"
 *               problemDescription:
 *                 type: string
 *                 example: "Ceiling fan is making noise"
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-10-18T10:30:00+05:30"
 *               serviceAddress:
 *                 type: string
 *                 example: "House #123, Street Name, City"
 *               latitude:
 *                 type: number
 *                 example: 28.6139
 *               longitude:
 *                 type: number
 *                 example: 77.2090
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request / missing fields
 *       401:
 *         description: Unauthorized
 */

import { Router } from "express";
import {
  createBooking,
  respondToBooking,
  updateBookingStatus,
  getMyBookings,
  getBookingById,
  getAvailableJobs,
} from "../controllers/booking.controller.js";
import { verifyJWT, authorizeRoles } from "../middleware/Auth.middleware.js";

const router = Router();

// 1. Static Routes (Hamesha dynamic routes se upar hone chahiye)
router
  .route("/available-jobs")
  .get(verifyJWT, authorizeRoles("TECHNICIAN"), getAvailableJobs);

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
