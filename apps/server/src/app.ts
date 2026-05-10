import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { uptime } from 'process';
import { fileURLToPath } from 'url';
import AdminRoutes from './admin.route.js';
import env from './env.js';
import authorizeRoles from './middleware/authorizeRoles.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import requireAuth from './middleware/requireAuth.js';
import allRoutes from "./all.route.js"

const app = express();

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    })
);

app.use(cookieParser());

app.set('trust-proxy', 1);

app.use(morgan('dev'));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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

app.use('/api', allRoutes)
app.use('/api/admin', requireAuth, authorizeRoles, AdminRoutes);


app.use(notFound)
app.use(errorHandler);

export default app;
