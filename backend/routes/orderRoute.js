import express from 'express';
import {  placeOrder, placeOrderStripe, placeOrderMpesa, allOrders, userOrders, updateOrderStatus, verifyStripePayment } from '../controllers/orderController.js';
import userAuth from '../middleware/userAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Payment Gateway Routes
orderRouter.post('/placeorder', userAuth, placeOrder);
orderRouter.post('/stripe', userAuth, placeOrderStripe);
orderRouter.post('/mpesa', userAuth, placeOrderMpesa);

// User Features
orderRouter.post('/userorders', userAuth, userOrders);

// Verify Payment
orderRouter.post('/verifystripe', userAuth, verifyStripePayment);

export default orderRouter;