import express, { Router } from 'express';
import {
  createQuiz,
  deleteQuizById,
  editQuestions,
  getAllQuiz,
  getQuestionById,
  getQuestions,
  getQuizById,
  getQuizzes,
  submitQuiz,
} from '../controllers/quizController.js';
import requireAuth from '../middleware/requireAuth.js';
import { createQuestion, deleteQuestion } from '../controllers/questionController.js';
import optionalAuth from '../middleware/optionalAuth.js';

const router: Router = express.Router();

router.get('/:quizId', getQuizById);
router.get('/:quizId/questions', getQuestions);
router.post('/quizzes', createQuiz);
router.get('/', getAllQuiz);
router.get('/quizzes', getQuizzes);
router.get('/questions', getQuestions);
router.delete('/:id', deleteQuizById);
router.get('/:quizId/question/:questionId', getQuestionById);
router.post('/submit', optionalAuth, submitQuiz);
router.put('/:quizId/question/:questionId', editQuestions);
router.delete('/question/:questionId', deleteQuestion);

export default router;
