import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecretkey";

export const generateToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
