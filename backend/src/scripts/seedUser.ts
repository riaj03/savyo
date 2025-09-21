import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

dotenv.config();

const seedUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/savyo"
    );
    console.log("Connected to MongoDB");

    // Clear existing test user
    await User.deleteMany({ email: "test@example.com" });
    console.log("Cleared existing test user");

    // Create test user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "user",
    });

    console.log("Created test user:", user.email);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding user:", error);
    process.exit(1);
  }
};

seedUser();
