import express from "express"
import { getLeaderBoard, getUserStats } from "./dashboard.controller.js"
import requireAuth from "../../middleware/requireAuth.js"
import optionalAuth from "../../middleware/optionalAuth.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { rateLimitStrategies } from "../../middleware/rateLimiter.js"

const router = express.Router()

router.get("/", requireAuth, asyncHandler(getUserStats))
router.get('/board', rateLimitStrategies.search, rateLimitStrategies.publicRead, optionalAuth, getLeaderBoard)

export default router
