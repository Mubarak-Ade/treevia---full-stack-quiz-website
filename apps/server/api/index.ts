import "dotenv/config"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { uptime } from 'process';
import { fileURLToPath } from 'url';
import AdminRoutes from '../src/admin.route.js';
import env from '../src/env.js';
import authorizeRoles from '../src/middleware/authorizeRoles.js';
import { errorHandler, notFound } from '../src/middleware/errorHandler.js';
import requireAuth from '../src/middleware/requireAuth.js';
import allRoutes from "../src/all.route.js"
import { connectDB } from '../src/config/db.js';

const app = express();


app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(cookieParser());

app.set('trust-proxy', 1);

app.use(express.json());
app.use(morgan('dev'));

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', allRoutes)
app.use('/api/admin', requireAuth, authorizeRoles, AdminRoutes);




app.get('/', (_req, res) => {
    res.status(200).json({
        message: 'Welcome to the Treevia Quiz API',
    });
});

app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: uptime(),
        timestamp: Date.now(),
    });
});

app.use(notFound)
app.use(errorHandler);

export default app;