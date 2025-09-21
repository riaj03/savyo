import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Store } from "../models/Store";
import { Deal } from "../models/Deal";

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/savyo");

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
  },
];

const categories = [
  {
    name: "Electronics",
    description: "Electronic devices and accessories",
    icon: "https://example.com/electronics-icon.png",
  },
  {
    name: "Fashion",
    description: "Clothing, shoes, and accessories",
    icon: "https://example.com/fashion-icon.png",
  },
  {
    name: "Home & Kitchen",
    description: "Home appliances and kitchen essentials",
    icon: "https://example.com/home-icon.png",
  },
];

const stores = [
  {
    name: "Amazon",
    description: "Online shopping for electronics, books, and more",
    logo: "https://example.com/amazon-logo.png",
    website: "https://amazon.com",
    category: "", // Will be set after categories are created
  },
  {
    name: "Walmart",
    description: "Save money. Live better.",
    logo: "https://example.com/walmart-logo.png",
    website: "https://walmart.com",
    category: "", // Will be set after categories are created
  },
];

const deals = [
  {
    title: "iPhone 13 Pro - 20% Off",
    description: "Get the latest iPhone at a great discount",
    store: "", // Will be set after stores are created
    category: "", // Will be set after categories are created
    originalPrice: 999,
    discountPrice: 799,
    imageUrl: "https://example.com/iphone.jpg",
    dealUrl: "https://example.com/iphone-deal",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdBy: "", // Will be set after users are created
  },
  {
    title: "Nike Air Max - 30% Off",
    description: "Limited time offer on Nike Air Max shoes",
    store: "", // Will be set after stores are created
    category: "", // Will be set after categories are created
    originalPrice: 150,
    discountPrice: 105,
    imageUrl: "https://example.com/nike.jpg",
    dealUrl: "https://example.com/nike-deal",
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    createdBy: "", // Will be set after users are created
  },
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Store.deleteMany();
    await Deal.deleteMany();

    // Create users
    const createdUsers = await User.create(users);

    // Create categories
    const createdCategories = await Category.create(categories);

    // Update stores with category IDs
    const updatedStores = stores.map((store, index) => ({
      ...store,
      category: createdCategories[index % createdCategories.length]._id,
      createdBy: createdUsers[0]._id,
    }));

    // Create stores
    const createdStores = await Store.create(updatedStores);

    // Update deals with store, category, and user IDs
    const updatedDeals = deals.map((deal, index) => ({
      ...deal,
      store: createdStores[index % createdStores.length]._id,
      category: createdCategories[index % createdCategories.length]._id,
      createdBy: createdUsers[0]._id,
    }));

    // Create deals
    await Deal.create(updatedDeals);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Store.deleteMany();
    await Deal.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Run seeder
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
