import { Router } from 'express';

import quizRoutes from './modules/quiz/quiz.routes.js';
import attemptRoute from './modules/attempt/attempt.routes.js';
import sessionRoute from './modules/session/session.routes.js';
import optionalAuth from './middleware/optionalAuth.js';
import requireAuth from './middleware/requireAuth.js';
import authRoutes from './modules/auth/auth.routes.js';
import categoryRoute from './modules/category/category.routes.js';
import dashboardRoute from './modules/dashboard/dashboard.routes.js';
import userRoute from './modules/user/user.routes.js';
import authorizeRoles from './middleware/authorizeRoles.js';
import AdminRoutes from "./admin.route.js"

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', requireAuth, userRoute);
router.use('/quizzes', optionalAuth, quizRoutes);
router.use('/attempts', optionalAuth, attemptRoute);
router.use('/sessions', requireAuth, sessionRoute);
router.use('/categories', categoryRoute);
router.use('/dashboard', requireAuth, dashboardRoute);
router.use('/admin', requireAuth, authorizeRoles, AdminRoutes);

export default router;
