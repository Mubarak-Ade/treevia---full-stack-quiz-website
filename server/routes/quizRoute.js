// Path: server\routes\quizRoute.js
import express from 'express'
import { createQuiz, deleteQuizById, editQuestions, getAllQuiz, getQuestionById, getQuestions, getQuizById, getQuizzes, submitQuiz } from '../controllers/quizController.js'
import requireAuth from '../middleware/requireAuth.js'
import { createQuestion, deleteQuestion} from '../controllers/questionController.js'

const router = express.Router()

router.post("/quizzes", createQuiz)
router.post("/quizzes/:quizId/questions", createQuestion)
router.get("/", getAllQuiz)
router.get("/quizzes", getQuizzes)
// router.get("?categories=Math", getQuizzes)
router.get("/questions", getQuestions)
router.get("/:quizId", getQuizById)
router.delete("/:id", deleteQuizById)
router.get("/:quizId/question/:questionId", getQuestionById)
router.post("/:id/submit", submitQuiz)
router.put("/:quizId/question/:questionId", editQuestions)
router.delete("/question/:questionId", deleteQuestion)

export default router;