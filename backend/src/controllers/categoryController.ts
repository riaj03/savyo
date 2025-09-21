import { Request, Response, NextFunction } from "express";
import { Category } from "../models/Category";
import { CustomError } from "../middleware/errorHandler";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find().sort("name");

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw new CustomError("Category not found", 404);
    }

    await category.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
