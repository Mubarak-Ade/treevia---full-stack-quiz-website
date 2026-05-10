import express, { Router } from 'express';
import requireAuth from '../middleware/requireAuth.js';
import optionalAuth from '../middleware/optionalAuth.js';
import { getAttempt, getSingleAttempt, startQuiz, submitQuiz } from '../modules/attempt/attempt.controller.js';
import { AttemptParams, AttemptSchema } from '../modules/attempt/attempt.validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { zodValidator } from '../utils/zodError.js';

const router: Router = express.Router();

router.get('/', requireAuth, getAttempt);
router.get('/:id', requireAuth, getSingleAttempt);
router.post('/:quizId/start', optionalAuth, zodValidator(AttemptParams), asyncHandler(startQuiz))
router.post('/:quizId/submit', optionalAuth, zodValidator(AttemptSchema), asyncHandler(submitQuiz))

export default router;
