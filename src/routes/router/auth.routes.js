import express from "express";
import authController from "../../controller/auth.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import {
  registerSchema,
  loginSchema,
} from "../../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", validate(registerSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);

export default router;
