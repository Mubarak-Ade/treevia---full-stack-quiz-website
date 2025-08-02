// Path: server/routes/authRoute.js
import express from 'express'
import { register, login, getUsers, online } from "../controllers/authController.js"
import requireAuth from '../middleware/requireAuth.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router()

// Add routes
router.post('/register', register);
router.post('/login', login);
router.get('/', requireAuth, getUsers);
router.put('/:id/online', online);
// routes.delete('/', SessionController.store);

export default router;
