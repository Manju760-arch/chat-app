import jwt from "jsonwebtoken";

// Generate token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Verify token helper (optional)
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
