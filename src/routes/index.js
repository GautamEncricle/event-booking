import express from "express";
import userRouter from "./router/auth.routes.js";
import bookingRouter from "./router/booking.routes.js";
import eventRouter from "./router/event.routes.js";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/booking", bookingRouter);
router.use("/events", eventRouter);

export default router;
