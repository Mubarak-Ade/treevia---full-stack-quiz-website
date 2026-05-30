import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../modules/user/user.model.js';
import env from '../config/env.js';
import createHttpError from 'http-errors';
import { AppError } from '../utils/error-handler.js';
// import { AuthUser } from '../types/express.js';

interface AuthUser {
    id: string
}

export const isTokenPayload = (payload: JwtPayload) => {
    return typeof (payload as AuthUser).id === 'string';
};

const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.accessToken;
    if (!token) {
        throw new AppError(401, 'Unauthrorized');
    }
    try {
        const decode = jwt.verify(token, env.ACCESS_SECRET!) as AuthUser;
        if (!isTokenPayload(decode)) {
            throw new AppError(400, 'Malformed token');
        }
        req.user = decode.id;

        next();
    } catch (error) {
        throw new AppError(401, 'Request is not authorized');
    }
};

export default requireAuth;
