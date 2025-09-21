import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { CustomError } from "./errorHandler";

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// @desc    Protect routes
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      throw new CustomError("Not authorized to access this route", 401);
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { id: string };

      // Get user from token
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        throw new CustomError("User not found", 404);
      }

      // Set user in request
      req.user = user;
      next();
    } catch (error) {
      throw new CustomError("Not authorized to access this route", 401);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authorize roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(
        `User role ${req.user.role} is not authorized to access this route`,
        403
      );
    }
    next();
  };
};
