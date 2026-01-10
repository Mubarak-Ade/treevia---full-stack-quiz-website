import e from "express";
import { createQuiz, getAllQuiz, getSingleQuiz, deleteQuiz, updateQuiz } from "../../controllers/admin/quizControllers.js";

const router = e.Router()

router.get('/', getAllQuiz)
router.post('/', createQuiz)
router.get('/:id', getSingleQuiz)
router.delete('/:id', deleteQuiz)
router.patch('/:id', updateQuiz)

export default router;