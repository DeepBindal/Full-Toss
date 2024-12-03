import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { fetchProducts } from '../controllers/productController.js';

const router = express.Router();

router.route("/fetch-products/:team").get(asyncHandler(fetchProducts))

export default router;