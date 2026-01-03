import express from "express"
import { getLeaderBoard, getUserStats } from "../controllers/dashboardController.js"
import requireAuth from "../middleware/requireAuth.js"
import optionalAuth from "../middleware/optionalAuth.js"

const router = express.Router()

router.get("/", requireAuth, getUserStats)
router.get('/board', optionalAuth, getLeaderBoard)

export default router