import express from "express"
import userRoutes from "./routes/admin/userRoutes.js"
import quizRoutes from "./routes/admin/quizRoutes.js"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/quiz", quizRoutes)

export default router