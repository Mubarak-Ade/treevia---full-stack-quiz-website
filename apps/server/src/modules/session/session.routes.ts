import { Router } from 'express';
import { getSessions } from './session.controller.js';

const router = Router();

router.route('/').get(getSessions);

export default router;