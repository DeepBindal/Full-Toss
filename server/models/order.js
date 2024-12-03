import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    buyer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1, // Quantity should be at least 1
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Price should be non-negative
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
