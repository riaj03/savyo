import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getCategories);
router.get("/:id", getCategory);

// Protected routes (Admin only)
router.post("/", protect, authorize("admin"), createCategory);
router.put("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;
