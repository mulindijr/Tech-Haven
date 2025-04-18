import express from 'express';
import { getCustomers, getDashboardStats } from '../controllers/adminPanelController.js';

const adminRouter = express.Router();

adminRouter.post('/stats', getDashboardStats);
adminRouter.post('/customers', getCustomers);

export default adminRouter;