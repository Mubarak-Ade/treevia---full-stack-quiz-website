import { Router } from 'express';
import {
    addQuestion,
    createQuestion,
    getQuestion,
    getQuestions,
    removeQuestion,
    updateQuestion,
} from './question.controller.js';
import {
    AddQuestionParamSchema,
    QuestionParamSchema,
    QuestionSchema,
    UpdateQuestionSchema,
} from './question.validate.js';
import { zodValidator } from '../../../utils/zodError.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { rateLimitStrategies } from '../../../middleware/rateLimiter.js';

const router = Router();

router.get('/', asyncHandler(getQuestions));
router.get('/:id', zodValidator(QuestionParamSchema), asyncHandler(getQuestion))
router.post('/', rateLimitStrategies.adminWrite, zodValidator(QuestionSchema), asyncHandler(createQuestion));
router.patch('/:id/', rateLimitStrategies.adminWrite, zodValidator(UpdateQuestionSchema), asyncHandler(updateQuestion));
router.post(
    '/:quizId/addQuestion/:questionId/',
    rateLimitStrategies.adminWrite,
    zodValidator(AddQuestionParamSchema),
    asyncHandler(addQuestion)
);
router.delete(
    '/:quizId/remove/:questionId',
    rateLimitStrategies.adminWrite,
    zodValidator(AddQuestionParamSchema),
    asyncHandler(removeQuestion)
);

export default router;
