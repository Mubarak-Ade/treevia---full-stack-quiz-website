import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import quizRoutes from './routes/quizRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import resultRoute from './routes/resultRoute.js';
import dashboardRoute from "./routes/dashboardRoutes.js"
import AdminRoutes from "./admin.route.js"
import userRoute from "./routes/userRoute.js"
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors"
import requireAuth from "./middleware/requireAuth.js";
import authorizeRoles from "./middleware/authorizeRoles.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();


app.use(morgan("dev"))
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/api/user", requireAuth, userRoute)
app.use('/api/admin', requireAuth, authorizeRoles, AdminRoutes)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoute);
app.use('/api/categories', categoryRoute);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    console.error(err);
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (isHttpError(err)) {
        statusCode = err.status
        errorMessage = err.message
    }
    res.status(statusCode).json({message: errorMessage})
});


export default app;