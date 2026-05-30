import express, { Router } from 'express';
import { getCategories, getQuizByCategory } from './category.controller.js';
import { rateLimitStrategies } from '../../middleware/rateLimiter.js';

const router: Router = express.Router();

router.get('/', rateLimitStrategies.search, rateLimitStrategies.publicRead, getCategories)
router.get<{ slug: string }>('/:slug/quizzes', rateLimitStrategies.publicRead, getQuizByCategory)

export default router;
