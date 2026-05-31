import express, { Router } from 'express';
import { zodValidator } from '../../utils/zodError.js';
import { AuthSchema, LoginSchema, SendResetTokenSchema, VerifyResetTokenSchema } from './auth.schema.js';
import AuthController from './auth.controller.js';
import { rateLimitStrategies } from '../../middleware/rateLimiter.js';

const router: Router = express.Router();

router.post('/register', rateLimitStrategies.register, zodValidator(AuthSchema), AuthController.register);
router.post('/login', rateLimitStrategies.login, zodValidator(LoginSchema), AuthController.login);
router.post('/refresh', rateLimitStrategies.refreshToken, AuthController.refreshController);
router.post('/logout', AuthController.logout);
router.post('/resend-verification', rateLimitStrategies.forgotPassword, zodValidator(SendResetTokenSchema), AuthController.resendVerificationEmail);
router.get('/verify-email', AuthController.verifyEmail);
router.post(
    '/reset',
    rateLimitStrategies.forgotPassword,
    zodValidator(SendResetTokenSchema),
    AuthController.sendResetToken
)
router.post(
    '/verify',
    rateLimitStrategies.resetPassword,
    zodValidator(VerifyResetTokenSchema),
    AuthController.verifyResetToken
)

export default router;
