import express, { Router } from 'express';
import {login, logout, refreshController, register } from '../modules/auth/auth.controller.js';
import { zodValidator } from '../utils/zodError.js';
import { AuthSchema, LoginSchema } from '../schema/auth.schema.js';

const router: Router = express.Router();

router.post('/register', zodValidator(AuthSchema), register);
router.post('/login', zodValidator(LoginSchema), login);
router.post('/refresh', refreshController);
router.post('/logout', logout);

export default router;
