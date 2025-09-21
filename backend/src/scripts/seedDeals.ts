import mongoose from "mongoose";
import dotenv from "dotenv";
import { Deal } from "../models/Deal";
import { Store } from "../models/Store";
import { Category } from "../models/Category";
import { User } from "../models/User";

dotenv.config();

const seedDeals = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/savyo"
    );
    console.log("Connected to MongoDB");

    // Clear existing deals
    await Deal.deleteMany({});
    console.log("Cleared existing deals");

    // Get a test user
    const user = await User.findOne({ email: "test@example.com" });
    if (!user) {
      console.log("Test user not found. Please create a test user first.");
      process.exit(1);
    }

    // Remove existing 'Electronics' category if it exists
    await Category.deleteMany({ name: "Electronics" });

    // Create test category
    const category = await Category.create({
      name: "Electronics",
      description: "Electronic devices and accessories",
      icon: "https://via.placeholder.com/150",
      createdBy: user._id,
    });
    console.log("Created test category");

    // Create test store
    const store = await Store.create({
      name: "Test Store",
      description: "A test store",
      logo: "https://via.placeholder.com/150",
      website: "https://example.com",
      category: category._id,
      createdBy: user._id,
    });
    console.log("Created test store");

    // Create test deals
    const deals = [
      {
        title: "50% Off on Smartphones",
        description: "Get amazing discounts on the latest smartphones",
        store: store._id,
        category: category._id,
        originalPrice: 999.99,
        discountPrice: 499.99,
        discountPercentage: 50,
        imageUrl: "https://via.placeholder.com/400x300",
        dealUrl: "https://example.com/deals/smartphones",
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: "active",
        createdBy: user._id,
      },
      {
        title: "30% Off on Laptops",
        description: "Premium laptops at unbeatable prices",
        store: store._id,
        category: category._id,
        originalPrice: 1499.99,
        discountPrice: 1049.99,
        discountPercentage: 30,
        imageUrl: "https://via.placeholder.com/400x300",
        dealUrl: "https://example.com/deals/laptops",
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: "active",
        createdBy: user._id,
      },
      {
        title: "20% Off on Headphones",
        description: "High-quality headphones at discounted prices",
        store: store._id,
        category: category._id,
        originalPrice: 199.99,
        discountPrice: 159.99,
        discountPercentage: 20,
        imageUrl: "https://via.placeholder.com/400x300",
        dealUrl: "https://example.com/deals/headphones",
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        status: "active",
        createdBy: user._id,
      },
    ];

    await Deal.insertMany(deals);
    console.log("Added test deals");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding deals:", error);
    process.exit(1);
  }
};

seedDeals();
