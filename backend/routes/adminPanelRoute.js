import express from 'express';
import { getDashboardStats } from '../controllers/adminPanelController.js';

const adminRouter = express.Router();

adminRouter.post('/stats', getDashboardStats);


export default adminRouter;