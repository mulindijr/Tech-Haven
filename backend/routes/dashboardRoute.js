import express from 'express';
import { getDashboardStats } from '../controllers/dashboardStatsController.js';

const dashboardRouter = express.Router();

dashboardRouter.post('/stats', getDashboardStats);

export default dashboardRouter;