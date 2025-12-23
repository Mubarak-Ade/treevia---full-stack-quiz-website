import express, { Router } from 'express';
import { getCategories, getQuizByCategory } from '../controllers/categoryController.js';

const router: Router = express.Router();

router.get('/', getCategories)
router.get('/:slug/quizzes', getQuizByCategory)

export default router;