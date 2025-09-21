import express from "express";
import {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
} from "../controllers/storeController";
import { protect, authorize } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getStores);
router.get("/:id", getStore);

// Protected routes (Admin only)
router.post("/", protect, authorize("admin"), createStore);
router.put("/:id", protect, authorize("admin"), updateStore);
router.delete("/:id", protect, authorize("admin"), deleteStore);

export default router;
