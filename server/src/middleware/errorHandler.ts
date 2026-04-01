import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (isHttpError(err)) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ message: errorMessage});
};

export const notFound: RequestHandler = (res, __req, next) => {
    const error = createHttpError(404, `${res.originalUrl} Not Found`)
    next(error)
}