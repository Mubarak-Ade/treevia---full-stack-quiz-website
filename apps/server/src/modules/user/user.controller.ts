import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserService from './user.service.js';
import { AppError } from '../../utils/error-handler.js';
import { successResponse } from '../../utils/response.js';

export const uploadProfilePic: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        if (!req.user) {
            throw new AppError(401, 'Unauthorized');
        }

        const userId = req.user;
        const payload = await UserService.uploadProfilePic(userId, req.file?.filename);
        successResponse(res, 'Upload picture successfully', payload);
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const getUserInfo: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const userId = req.user;

        if (!userId) {
            throw new AppError(401, 'Unauthorized');
        }

        const user = await UserService.getUserInfo(userId as string);
        successResponse(res, 'User Info Fetched Successfully', user);
    } catch (error) {
        next(error);
    }
};
