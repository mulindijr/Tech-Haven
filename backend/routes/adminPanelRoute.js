import express from 'express';
import { deleteOrder, getCustomers, getDashboardStats } from '../controllers/adminPanelController.js';

const adminRouter = express.Router();

adminRouter.post('/stats', getDashboardStats);
adminRouter.post('/customers', getCustomers);
adminRouter.post('/delete-order', deleteOrder);

export default adminRouter;