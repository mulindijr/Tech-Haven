import express from 'express';
import { deleteOrder, getCustomers, getDashboardStats, getRecentOrders, getSalesChartData, getTopProducts } from '../controllers/adminPanelController.js';

const adminRouter = express.Router();

adminRouter.post('/stats', getDashboardStats);
adminRouter.post('/customers', getCustomers);
adminRouter.post('/delete-order', deleteOrder);
adminRouter.post('/recent-orders', getRecentOrders);
adminRouter.post('/top-products', getTopProducts);
adminRouter.post('/sales-chart', getSalesChartData);

export default adminRouter;