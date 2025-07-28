import express from "express";
import eventController from "../../controller/event.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { isAdmin } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", eventController.getAllEvents);
router.post("/", isAuthenticated, isAdmin, eventController.createEvent);

export default router;
