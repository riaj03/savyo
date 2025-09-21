import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  icon: string;
  status: "active" | "inactive";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      trim: true,
    },
    icon: {
      type: String,
      required: [true, "Please provide an icon URL"],
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

export const Category = mongoose.model<ICategory>("Category", categorySchema);
