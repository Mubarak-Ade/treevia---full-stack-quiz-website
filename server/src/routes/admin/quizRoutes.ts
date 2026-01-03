import e from "express";
import { createQuiz, getAllQuiz, getSingleQuiz } from "../../controllers/admin/quizControllers.js";

const router = e.Router()

router.get('/', getAllQuiz)
router.post('/', createQuiz)
router.get('/:id', getSingleQuiz)

export default router;