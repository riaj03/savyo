import express from "express";
import {
  getDeals,
  getDeal,
  createDeal,
  updateDeal,
  deleteDeal,
} from "../controllers/dealController";
import { protect } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getDeals);
router.get("/:id", getDeal);

// Protected routes
router.post("/", protect, createDeal);
router.put("/:id", protect, updateDeal);
router.delete("/:id", protect, deleteDeal);

export default router;
