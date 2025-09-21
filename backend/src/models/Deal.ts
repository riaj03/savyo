import mongoose, { Document, Schema } from "mongoose";

export interface IDeal extends Document {
  title: string;
  description: string;
  store: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  imageUrl: string;
  dealUrl: string;
  expiryDate: Date;
  status: "active" | "expired" | "pending" | "rejected";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const dealSchema = new Schema<IDeal>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Please provide a store"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Please provide the original price"],
      min: [0, "Price cannot be negative"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Please provide the discount price"],
      min: [0, "Price cannot be negative"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please provide the discount percentage"],
      min: [0, "Discount percentage cannot be negative"],
      max: [100, "Discount percentage cannot exceed 100"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    dealUrl: {
      type: String,
      required: [true, "Please provide a deal URL"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Please provide an expiry date"],
    },
    status: {
      type: String,
      enum: ["active", "expired", "pending", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide the creator"],
    },
  },
  {
    timestamps: true,
  }
);

// Calculate discount percentage before saving
dealSchema.pre("save", function (next) {
  if (this.isModified("originalPrice") || this.isModified("discountPrice")) {
    this.discountPercentage = Math.round(
      ((this.originalPrice - this.discountPrice) / this.originalPrice) * 100
    );
  }
  next();
});

export const Deal = mongoose.model<IDeal>("Deal", dealSchema);
