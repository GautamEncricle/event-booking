import express from "express";
import bookingController from "../../controller/booking.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, bookingController.createBooking);
router.patch("/:id/confirm", isAuthenticated, bookingController.confirmBooking);
router.patch("/:id/cancel", isAuthenticated, bookingController.cancelBooking);
router.get("/", isAuthenticated, bookingController.getUserBookings);

export default router;
