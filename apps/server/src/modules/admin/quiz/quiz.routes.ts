import e from "express";
import { createQuiz, getAllQuiz, getSingleQuiz, deleteQuiz, updateQuiz, publishQuiz, saveDraft, archiveQuiz, recoverQuiz } from "./quiz.controller.js";
import { zodValidator } from "../../../utils/zodError.js";
import { CreateQuizSchema, UpdateQuizSchema } from "./quiz.schema.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const router = e.Router()

router.get('/', asyncHandler(getAllQuiz))
router.post('/', zodValidator(CreateQuizSchema), asyncHandler(createQuiz))
router.get('/:id', asyncHandler(getSingleQuiz))
router.patch('/:id', zodValidator(UpdateQuizSchema), asyncHandler(updateQuiz))
router.delete('/:id', asyncHandler(deleteQuiz))

router.post('/:id/publish',  asyncHandler(publishQuiz)),
router.patch('/:id/draft', asyncHandler(saveDraft))
router.patch('/:id/recover', asyncHandler(recoverQuiz))
router.delete('/:id/archive', asyncHandler(archiveQuiz))

export default router;
