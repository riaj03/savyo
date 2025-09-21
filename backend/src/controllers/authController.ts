import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { CustomError } from "../middleware/errorHandler";

// Generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new CustomError("User already exists", 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Invalid credentials", 401);
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials", 401);
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
