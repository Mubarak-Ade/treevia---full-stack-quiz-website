import express, { Router } from 'express';
import { register, login, getUsers, online } from '../controllers/authController.js';
import requireAuth from '../middleware/requireAuth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router: Router = express.Router();

// Add routes
router.post('/register', register);
router.post('/login', login);
router.get('/', requireAuth, getUsers);
router.put('/:id/online', online);

export default router;
