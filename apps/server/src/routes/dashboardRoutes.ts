import express from "express"
import { getLeaderBoard, getUserStats } from "../modules/dashboard/dashboard.controller.js"
import requireAuth from "../middleware/requireAuth.js"
import optionalAuth from "../middleware/optionalAuth.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const router = express.Router()

router.get("/", requireAuth, asyncHandler(getUserStats))
router.get('/board', optionalAuth, getLeaderBoard)

export default router
