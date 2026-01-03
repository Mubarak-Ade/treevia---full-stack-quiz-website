import express, { Router } from 'express';
import {
  getQuestions,
  getQuizzes,
  getRandomQuiz,
  submitQuiz
} from '../controllers/quizController.js';
import optionalAuth from '../middleware/optionalAuth.js';

const router: Router = express.Router();

// router.get('/:quizId', getQuizById);
router.get('/:quizId/questions', getQuestions);
router.post('/submit', optionalAuth, submitQuiz);
router.get('/random', getRandomQuiz);
// router.post('/quizzes', createQuiz);
router.get('/', getQuizzes);
// router.get('/quizzes', getQuizzes);
// router.get('/questions', getQuestions);
// router.delete('/:id', deleteQuizById);
// router.get('/:quizId/question/:questionId', getQuestionById);
// router.put('/:quizId/question/:questionId', editQuestions);
// router.delete('/question/:questionId', deleteQuestion);

export default router;
