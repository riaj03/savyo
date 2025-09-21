import { Request, Response, NextFunction } from "express";
import { Deal } from "../models/Deal";
import { CustomError } from "../middleware/errorHandler";

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
export const getDeals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deals = await Deal.find()
      .populate("store", "name logo")
      .populate("category", "name")
      .sort("-createdAt");

    res.json({
      success: true,
      count: deals.length,
      data: deals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Public
export const getDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate("store", "name logo")
      .populate("category", "name");

    if (!deal) {
      throw new CustomError("Deal not found", 404);
    }

    res.json({
      success: true,
      data: deal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new deal
// @route   POST /api/deals
// @access  Private
export const createDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const deal = await Deal.create(req.body);

    res.status(201).json({
      success: true,
      data: deal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update deal
// @route   PUT /api/deals/:id
// @access  Private
export const updateDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let deal = await Deal.findById(req.params.id);

    if (!deal) {
      throw new CustomError("Deal not found", 404);
    }

    // Make sure user is deal owner
    if (
      deal.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      throw new CustomError("Not authorized to update this deal", 401);
    }

    deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: deal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete deal
// @route   DELETE /api/deals/:id
// @access  Private
export const deleteDeal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      throw new CustomError("Deal not found", 404);
    }

    // Make sure user is deal owner
    if (
      deal.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      throw new CustomError("Not authorized to delete this deal", 401);
    }

    await deal.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
