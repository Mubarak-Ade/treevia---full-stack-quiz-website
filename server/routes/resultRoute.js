// Path: server/routes/resultRoute.js
import express from 'express'
import { getResult, getSingleResult} from '../controllers/resultController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

router.get("/", requireAuth, getResult)
router.get("/:id", getSingleResult)

export default router;