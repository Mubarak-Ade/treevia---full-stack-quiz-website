import "dotenv/config"
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import quizRoutes from './routes/quizRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import resultRoute from './routes/resultRoute.js';
import morgan from "morgan"
import {isHttpError} from "http-errors"

const app = express();


app.use(morgan("dev"))
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoute);
app.use('/api/categories', categoryRoute);

app.use((error: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error(error)
    let errorMessage = "An Unknown Error Occured"
    let statusCode = 500
    if(isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({error: errorMessage})
})

export default app;