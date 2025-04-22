import express from 'express';
import { deleteCustomer, deleteOrder, getCustomers, getDashboardStats, getRecentOrders, getSalesChartData, getTopProducts } from '../controllers/adminPanelController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

adminRouter.post('/stats', adminAuth, getDashboardStats);
adminRouter.post('/customers', adminAuth, getCustomers);
adminRouter.post('/delete-order', adminAuth, deleteOrder);
adminRouter.post('/recent-orders', adminAuth, getRecentOrders);
adminRouter.post('/top-products', adminAuth, getTopProducts);
adminRouter.post('/sales-chart', adminAuth, getSalesChartData);
adminRouter.post('/delete-customer', adminAuth, deleteCustomer);

export default adminRouter;