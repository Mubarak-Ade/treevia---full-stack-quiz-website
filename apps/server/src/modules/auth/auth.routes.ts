import express, { Router } from 'express';
import { zodValidator } from '../../utils/zodError.js';
import { AuthSchema, LoginSchema, SendResetTokenSchema, VerifyResetTokenSchema } from './auth.schema.js';
import AuthController from './auth.controller.js';

const router: Router = express.Router();

router.post('/register', zodValidator(AuthSchema), AuthController.register);
router.post('/login', zodValidator(LoginSchema), AuthController.login);
router.post('/refresh', AuthController.refreshController);
router.post('/logout', AuthController.logout);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/reset', zodValidator(SendResetTokenSchema), AuthController.sendResetToken)
router.post('/verify', zodValidator(VerifyResetTokenSchema), AuthController.verifyResetToken)

export default router;
