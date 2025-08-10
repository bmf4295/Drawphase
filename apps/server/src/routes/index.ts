import { Router } from 'express';
import healthRoutes from './healthRoute.js';

const router = Router();

router.use(healthRoutes);
// Other Routes will bea added here later


export default router;