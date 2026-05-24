import express from "express"
import userRoutes from "./modules/admin/user/user.routes.js"
import quizRoutes from "./modules/admin/quiz/quiz.routes.js"
import categoryRoutes from "./modules/admin/category/category.routes.js"
import questionRoute from "./modules/admin/question/question.routes.js"

const router = express.Router()

router.use("/users", userRoutes)
router.use("/quizzes", quizRoutes)
router.use("/questions", questionRoute)
router.use("/categories", categoryRoutes)

export default router