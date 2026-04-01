import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../env.js';

interface AuthUser {
    id: string;
}

const optionalAuth: RequestHandler = (req, res, next) => {
    const token = req.cookies.accessToken as string;

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, env.ACCESS_SECRET) as AuthUser;

        req.user = decoded.id;

        next();
    } catch {
        next();
    }
};

export default optionalAuth;
