import express from "express"
import userRoutes from "./routes/admin/userRoutes.js"
import quizRoutes from "./routes/admin/quizRoutes.js"
import categoryRoutes from "./routes/admin/categoryRoute.js"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/quiz", quizRoutes)
router.use("/category", categoryRoutes)

export default router