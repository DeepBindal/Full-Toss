import Order from "../models/order.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import CustomError from "../utils/CustomError.js";

export const placeOrder = async (req, res, next) => {
  const { productId, price, quantity } = req.body;

  // Validate inputs
  if (!productId || !price || !quantity) {
    throw new CustomError("All fields are required", 400);
  }

  // Fetch product
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  // Check stock availability
  if (product.stock < quantity) {
    throw new CustomError("Insufficient stock", 400);
  }

  // Create order
  const order = await Order.create({
    product: productId,
    buyer: req.user._id,
    price,
    quantity,
  });

  // Reduce product stock
  product.stock -= quantity;
  await product.save();

  // Update user orders
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.orders.push(order._id);
  await user.save();

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
};

export const fetchUserOrders = async (req, res) => {
  const orders = await Order.find({ buyer: req.user._id }).populate("product").sort({createdAt: -1});
  res.json(new ApiResponse(200, orders, "Order place successfully"));
};
