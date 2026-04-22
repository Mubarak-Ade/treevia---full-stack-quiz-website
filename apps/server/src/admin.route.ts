import express from "express"
import userRoutes from "./routes/admin/userRoutes.js"
import quizRoutes from "./routes/admin/quizRoutes.js"
import categoryRoutes from "./routes/admin/categoryRoute.js"
import questionRoute from "./modules/admin/question/question.routes.js"

const router = express.Router()

router.use("/users", userRoutes)
router.use("/quizzes", quizRoutes)
router.use("/questions", questionRoute)
router.use("/categories", categoryRoutes)

export default router