import mongoose from "mongoose";
import { IPL_TEAMS } from "../constants/index.js";

// Define the schema for products
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // Remove extra spaces
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true, // Remove extra spaces
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"], // Ensure price is non-negative
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm.test(v); // Simple URL validation
        },
        message: "Please provide a valid URL for the image",
      },
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"], // Ensure stock is non-negative
      default: 0, // Default value for stock
    },
    team: {
      type: String,
      required: true,
      enum: IPL_TEAMS,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const Product = mongoose.model("Product", productSchema);

export default Product;
