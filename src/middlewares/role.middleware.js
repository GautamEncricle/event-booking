import AppError from "../utils/AppError.js";
import HTTP_STATUS from "../constants/HttpStatus.js";

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new AppError("Admin access required", HTTP_STATUS.FORBIDDEN);
  }
  next();
};
