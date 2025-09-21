import express from "express";
import authRoutes from "./auth";
import dealRoutes from "./deals";
import storeRoutes from "./stores";
import categoryRoutes from "./categories";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/deals", dealRoutes);
router.use("/stores", storeRoutes);
router.use("/categories", categoryRoutes);

export default router;
