import { CookieOptions, RequestHandler } from 'express';
import { AuthSchema } from '../../schema/auth.schema.js';
import { zodValidator } from '../../utils/validator.js';
import AuthService from './auth.service.js';
import { sendToken } from '../../utils/tokens.js';
import createHttpError from 'http-errors';
import env from '../../env.js';
import Session from '../../models/Session.js';

export const register: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodValidator(AuthSchema, req.body, res);
        const user = await AuthService.register(data);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const data = zodValidator(AuthSchema.omit({ username: true }), req.body, res);
        const ua = req.headers['user-agent'] as string;
        const ip = req.headers['x-forwarded-for'] as string;
        const { user, accessToken, refreshToken } = await AuthService.login(data, ua, ip);
        sendToken(res, accessToken, refreshToken);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const refreshController: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const token = req.cookies.refreshToken as string;
        if (!token) {
            throw createHttpError(401, 'No Refresh Token');
        }
        const { access, refresh } = await AuthService.refresh(token);
        sendToken(res, access, refresh);
        res.status(200).json({ message: 'Refreshed Token successfully' });
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
        res.clearCookie('refreshToken', option);
        res.clearCookie('accessToken', option);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error);
    }
};
