import Product from "../models/product.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const fetchProducts = async (req, res) => {
    const {team} = req.params;

    const products = await Product.find({team: team});

    res.status(200).json(new ApiResponse(200, products));
}