import { Router } from 'express';
import healthRoutes from './healthRoute.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use(healthRoutes);
router.use(authRoutes);
router.use(userRoutes);
// Other Routes will be added here later


export default router;