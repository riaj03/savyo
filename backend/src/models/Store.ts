import mongoose, { Document, Schema } from "mongoose";

export interface IStore extends Document {
  name: string;
  description: string;
  logo: string;
  website: string;
  category: mongoose.Types.ObjectId;
  status: "active" | "inactive";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new Schema<IStore>(
  {
    name: {
      type: String,
      required: [true, "Please provide a store name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
    },
    logo: {
      type: String,
      required: [true, "Please provide a logo URL"],
    },
    website: {
      type: String,
      required: [true, "Please provide a website URL"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

export const Store = mongoose.model<IStore>("Store", storeSchema);
