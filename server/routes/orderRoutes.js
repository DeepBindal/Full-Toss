import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { fetchUserOrders, placeOrder } from '../controllers/orderController.js';


const router = express.Router();

router.route('/place-order').post(verifyJWT, asyncHandler(placeOrder));

router.route('/fetch-orders').get(verifyJWT, asyncHandler(fetchUserOrders));

export default router;