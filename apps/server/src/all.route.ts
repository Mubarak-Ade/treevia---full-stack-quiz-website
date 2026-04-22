import { Router } from 'express';

import quizRoutes from './routes/quizRoute.js';
import resultRoute from './routes/resultRoute.js';
import sessionRoute from './routes/sessionRoutes.js';
import optionalAuth from './middleware/optionalAuth.js';
import requireAuth from './middleware/requireAuth.js';
import authRoutes from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import dashboardRoute from './routes/dashboardRoutes.js';
import userRoute from './routes/userRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', requireAuth, userRoute);
router.use('/quizzes', optionalAuth, quizRoutes);
router.use('/results', optionalAuth, resultRoute);
router.use('/sessions', requireAuth, sessionRoute);
router.use('/categories', categoryRoute);
router.use('/dashboard', requireAuth, dashboardRoute);

export default router;
