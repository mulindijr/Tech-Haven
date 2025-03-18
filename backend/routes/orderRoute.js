import express from 'express';
import {  placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderMpesa, allOrders, userOrders, updateOrderStatus } from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment Gateway Routes
orderRouter.post('/placeorder', userAuth, placeOrder);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/razorpay', userAuth, placeOrderRazorpay);
orderRouter.post('/mpesa', userAuth, placeOrderMpesa);

// User Features
orderRouter.post('/userorders', userAuth, userOrders);

export default orderRouter;