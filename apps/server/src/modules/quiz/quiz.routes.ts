import express, { Router } from 'express';
import {
  getQuestions,
  getQuizzes,
  getRandomQuiz,
  submitQuiz
} from './quiz.controller.js';
import optionalAuth from '../../middleware/optionalAuth.js';
import { rateLimitStrategies } from '../../middleware/rateLimiter.js';

const router: Router = express.Router();

// router.get('/:quizId', getQuizById);
router.get('/:quizId/questions', rateLimitStrategies.publicRead, optionalAuth, getQuestions);
router.post('/submit', optionalAuth, rateLimitStrategies.quizSubmission, submitQuiz);
router.get('/random', rateLimitStrategies.publicRead, getRandomQuiz);
// router.post('/quizzes', createQuiz);
router.get('/', rateLimitStrategies.search, rateLimitStrategies.publicRead, getQuizzes);
// router.get('/quizzes', getQuizzes);
// router.get('/questions', getQuestions);
// router.delete('/:id', deleteQuizById);
// router.get('/:quizId/question/:questionId', getQuestionById);
// router.put('/:quizId/question/:questionId', editQuestions);
// router.delete('/question/:questionId', deleteQuestion);

export default router;
