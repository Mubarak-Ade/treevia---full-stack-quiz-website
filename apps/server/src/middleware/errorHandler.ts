import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { AppError } from '../utils/error-handler.js';
import mongoose, { Mongoose } from 'mongoose';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            type: "General Error",
            success: false,
            message: err.message,
            details: err.details,
        });
    }
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({
            type: "Mongoose Validation Error",
            success: false,
            message: err.message,
            details: err.errors,
        });
    }
    if (err instanceof mongoose.Error.CastError) {
        res.status(400).json({
            type: "Mongoose Cast Error",
            success: false,
            message: err.message,
            details: err.path,
        });
    }
    console.error(err);

    res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export const notFound: RequestHandler = (res, __req, next) => {
    const error = new AppError(404, `${res.originalUrl} Not Found`);
    next(error);
};
