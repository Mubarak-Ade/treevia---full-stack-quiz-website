import { CookieOptions, Request, RequestHandler } from 'express';
import { AuthSchema, LoginSchema } from '../../schema/auth.schema.js';
import AuthService from './auth.service.js';
import { sendToken } from '../../utils/tokens.js';
import createHttpError from 'http-errors';
import env from '../../env.js';
import { zodValidator } from '../../utils/zodError.js';
import { AppError } from '../../utils/error-handler.js';
import { successResponse } from '../../utils/response.js';

const structureMeta = (req: Request) => ({
    userAgent: req.get('user-agent') ?? 'unknown',
    ip: typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for']
        : req.ip ?? 'unknown',
});

export const register: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const meta = structureMeta(req);
        const { user, accessToken, refreshToken } = await AuthService.register(req.body, meta);
        sendToken(res, accessToken, refreshToken);
        successResponse(res, "Register Account Success", user, 201)
    } catch (error) {
        next(error);
    }
};


export const login: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const meta = structureMeta(req);
        const { user, accessToken, refreshToken } = await AuthService.login(req.body, meta);
        sendToken(res, accessToken, refreshToken);
        successResponse(res, "Login Account Success", user, 201)
    } catch (error) {
        next(error);
    }
};

export const refreshController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token = req.cookies.refreshToken as string;
        if (!token) {
            throw new AppError(401, 'No Refresh Token');
        }
        const { access, refresh } = await AuthService.refresh(token);
        sendToken(res, access, refresh);
        successResponse(res, "Refreshed Token successfully")
    } catch (error) {
        next(error);
    }
};

const option: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
};

export const logout: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token = req.cookies.refreshToken as string | undefined;

        if (token) {
            await AuthService.logout(token);
        }

        res.clearCookie('refreshToken', option);
        res.clearCookie('accessToken', option);
        successResponse(res, "Logout successfully")
    } catch (error) {
        next(error);
    }
};
