import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import User from '../models/User.js';
import { AppError } from '../utils/error-handler.js';

interface AuthRequest extends Request {
    user?: any;
}

const authorizeRoles = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const userId = req.user;
    if (!userId) {
        throw new AppError(401, 'Unauthorized');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(404, 'User Not Found');
    }
    if (user.role !== 'admin') {
        throw new AppError(403, 'Access Denied');
    }
    next();
};

export default authorizeRoles;
