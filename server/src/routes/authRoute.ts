import express, { Router } from 'express';
import { login, logout, refreshController, register } from '../modules/auth/auth.controller.js';

const router: Router = express.Router();

// Add routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshController)
router.post('/logout', logout)

export default router;
