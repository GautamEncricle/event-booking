import * as authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import HTTP_STATUS from "../constants/HttpStatus.js";
import AppError from "../utils/AppError.js";

const signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body);

  if (!user) {
    throw new AppError("Failed to create user", HTTP_STATUS.BAD_REQUEST);
  }

  res.status(HTTP_STATUS.CREATED).json({ message: "User registered", user });
});

const login = catchAsync(async (req, res) => {
  const token = await authService.login(req.body);

  if (!token) {
    throw new AppError("Invalid credentials", HTTP_STATUS.UNAUTHORIZED);
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(HTTP_STATUS.OK).json({ message: "Login successful" });
});

const authController = {
  signup,
  login,
};

export default authController;
