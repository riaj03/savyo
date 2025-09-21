import { Request, Response, NextFunction } from "express";
import { Store } from "../models/Store";
import { CustomError } from "../middleware/errorHandler";

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
export const getStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stores = await Store.find().populate("category", "name").sort("name");

    res.json({
      success: true,
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single store
// @route   GET /api/stores/:id
// @access  Public
export const getStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await Store.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!store) {
      throw new CustomError("Store not found", 404);
    }

    res.json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new store
// @route   POST /api/stores
// @access  Private/Admin
export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const store = await Store.create(req.body);

    res.status(201).json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update store
// @route   PUT /api/stores/:id
// @access  Private/Admin
export const updateStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let store = await Store.findById(req.params.id);

    if (!store) {
      throw new CustomError("Store not found", 404);
    }

    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete store
// @route   DELETE /api/stores/:id
// @access  Private/Admin
export const deleteStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      throw new CustomError("Store not found", 404);
    }

    await store.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
