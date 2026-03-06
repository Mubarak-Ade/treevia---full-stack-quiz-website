import express, { Router } from 'express';
import { login, register } from '../modules/auth/auth.controller.js';

const router: Router = express.Router();

// Add routes
router.post('/register', register);
router.post('/login', login);

export default router;
