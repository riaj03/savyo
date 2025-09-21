import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Store } from "../models/Store";
import { Category } from "../models/Category";
import { Deal } from "../models/Deal";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/savyo";

const stores = [
  {
    name: "Amazon",
    logo: "https://example.com/amazon-logo.png",
    description: "The world's largest online retailer",
    website: "https://amazon.com",
    category: "Electronics",
    createdBy: null,
  },
  {
    name: "Walmart",
    logo: "https://example.com/walmart-logo.png",
    description: "America's largest retailer",
    website: "https://walmart.com",
    category: "Fashion",
    createdBy: null,
  },
  {
    name: "Best Buy",
    logo: "https://example.com/bestbuy-logo.png",
    description: "Electronics and appliances retailer",
    website: "https://bestbuy.com",
    category: "Electronics",
    createdBy: null,
  },
  {
    name: "Target",
    logo: "https://example.com/target-logo.png",
    description: "General merchandise retailer",
    website: "https://target.com",
    category: "Home & Garden",
    createdBy: null,
  },
];

const categories = [
  {
    name: "Electronics",
    description: "Electronic devices and accessories",
    icon: "laptop",
    createdBy: null,
  },
  {
    name: "Fashion",
    description: "Clothing, shoes, and accessories",
    icon: "shirt",
    createdBy: null,
  },
  {
    name: "Home & Garden",
    description: "Home improvement and garden supplies",
    icon: "home",
    createdBy: null,
  },
  {
    name: "Travel",
    description: "Travel deals and vacation packages",
    icon: "plane",
    createdBy: null,
  },
  {
    name: "Food & Dining",
    description: "Restaurant deals and food delivery",
    icon: "utensils",
    createdBy: null,
  },
  {
    name: "Beauty",
    description: "Beauty and personal care products",
    icon: "sparkles",
    createdBy: null,
  },
];

const deals = [
  {
    title: "50% off on Electronics",
    description: "Get 50% off on all electronics at Amazon",
    store: "Amazon",
    category: "Electronics",
    originalPrice: 999.99,
    discountPrice: 499.99,
    discountPercentage: 50,
    imageUrl: "https://example.com/electronics-deal.jpg",
    dealUrl: "https://amazon.com/deals/electronics",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    title: "Summer Fashion Sale",
    description: "Up to 70% off on summer clothing",
    store: "Walmart",
    category: "Fashion",
    originalPrice: 199.99,
    discountPrice: 59.99,
    discountPercentage: 70,
    imageUrl: "https://example.com/fashion-deal.jpg",
    dealUrl: "https://walmart.com/deals/fashion",
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
  {
    title: "Home Decor Clearance",
    description: "Clearance sale on home decor items",
    store: "Target",
    category: "Home & Garden",
    originalPrice: 299.99,
    discountPrice: 149.99,
    discountPercentage: 50,
    imageUrl: "https://example.com/home-deal.jpg",
    dealUrl: "https://target.com/deals/home",
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
];

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Store.deleteMany({});
    await Category.deleteMany({});
    await Deal.deleteMany({});
    console.log("Cleared existing data");

    // Create a test user
    const testUser = await User.create({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    console.log("Created test user");

    // Create categories with user reference
    const categoriesWithRefs = categories.map((category) => ({
      ...category,
      createdBy: testUser._id,
    }));
    const createdCategories = await Category.insertMany(categoriesWithRefs);
    console.log("Created categories");

    // Create stores with references to categories and user
    const storesWithRefs = stores.map((store) => ({
      ...store,
      category: createdCategories.find(
        (c: { name: string }) => c.name === store.category
      )?._id,
      createdBy: testUser._id,
    }));

    const createdStores = await Store.insertMany(storesWithRefs);
    console.log("Created stores");

    // Create deals with references to stores and categories
    const dealsWithRefs = deals.map((deal) => ({
      ...deal,
      store: createdStores.find((s: { name: string }) => s.name === deal.store)
        ?._id,
      category: createdCategories.find(
        (c: { name: string }) => c.name === deal.category
      )?._id,
      createdBy: testUser._id,
    }));

    await Deal.insertMany(dealsWithRefs);
    console.log("Created deals");

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
