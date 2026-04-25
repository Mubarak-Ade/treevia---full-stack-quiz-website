import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/authRoute.js';
import quizRoutes from '../src/routes/quizRoute.js';
import categoryRoute from '../src/routes/categoryRoute.js';
import resultRoute from '../src/routes/resultRoute.js';
import dashboardRoute from "../src/routes/dashboardRoutes.js"
import AdminRoutes from "../src/admin.route.js"
import userRoute from "../src/routes/userRoute.js"
import morgan from "morgan"
import createHttpError, {isHttpError} from "http-errors"
import requireAuth from "../src/middleware/requireAuth.js";
import authorizeRoles from "../src/middleware/authorizeRoles.js";
import path from "path";
import { fileURLToPath } from "url";
import { uptime } from "process";
import { connectDB } from "../src/config/db.js";

const app = express();


app.use(morgan("dev"))
app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(503).json({ 
            error: 'Database connection failed',
            message: 'Service temporarily unavailable'
        });
    }
});

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

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the Treevia Quiz Server API",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: uptime(),
    timestamp: Date.now(),
  });
});

export default app;