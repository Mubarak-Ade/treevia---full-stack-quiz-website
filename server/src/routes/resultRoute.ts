import express, { Router } from 'express';
import { getResult, getSingleResult } from '../controllers/resultController.js';
import requireAuth from '../middleware/requireAuth.js';

const router: Router = express.Router();

router.get('/', requireAuth, getResult);
router.get('/:id', requireAuth, getSingleResult);

export default router;
