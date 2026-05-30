import e from "express";
import { createQuiz, getAllQuiz, getSingleQuiz, deleteQuiz, updateQuiz, publishQuiz, saveDraft, archiveQuiz, recoverQuiz } from "./quiz.controller.js";
import { zodValidator } from "../../../utils/zodError.js";
import { CreateQuizSchema, UpdateQuizSchema } from "./quiz.schema.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { rateLimitStrategies } from "../../../middleware/rateLimiter.js";

const router = e.Router()

router.get('/', asyncHandler(getAllQuiz))
router.post('/', rateLimitStrategies.adminWrite, zodValidator(CreateQuizSchema), asyncHandler(createQuiz))
router.get('/:id', asyncHandler(getSingleQuiz))
router.patch('/:id', rateLimitStrategies.adminWrite, zodValidator(UpdateQuizSchema), asyncHandler(updateQuiz))
router.delete('/:id', rateLimitStrategies.adminWrite, asyncHandler(deleteQuiz))

router.post('/:id/publish', rateLimitStrategies.adminWrite, asyncHandler(publishQuiz)),
router.patch('/:id/draft', rateLimitStrategies.adminWrite, asyncHandler(saveDraft))
router.patch('/:id/recover', rateLimitStrategies.adminWrite, asyncHandler(recoverQuiz))
router.delete('/:id/archive', rateLimitStrategies.adminWrite, asyncHandler(archiveQuiz))

export default router;
