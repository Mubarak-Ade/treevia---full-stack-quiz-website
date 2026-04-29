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

const router = Router();

router.get('/', asyncHandler(getQuestions));
router.get('/:id', zodValidator(QuestionParamSchema), asyncHandler(getQuestion))
router.post('/', zodValidator(QuestionSchema), asyncHandler(createQuestion));
router.patch('/:id/', zodValidator(UpdateQuestionSchema), asyncHandler(updateQuestion));
router.post(
    '/:quizId/addQuestion/:questionId/',
    zodValidator(AddQuestionParamSchema),
    asyncHandler(addQuestion)
);
router.delete(
    '/:quizId/remove/:questionId',
    zodValidator(AddQuestionParamSchema),
    asyncHandler(removeQuestion)
);

export default router;
