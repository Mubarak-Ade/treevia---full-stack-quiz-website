import { CookieOptions, Request, Response } from 'express';
import { AuthSchema, LoginSchema } from './auth.schema.js';
import AuthService from './auth.service.js';
import { sendToken } from '../../utils/tokens.js';
import createHttpError from 'http-errors';
import env from '../../env.js';
import { zodValidator } from '../../utils/zodError.js';
import { AppError } from '../../utils/error-handler.js';
import { successResponse } from '../../utils/response.js';

const structureMeta = (req: Request) => ({
    userAgent: req.get('user-agent') ?? 'unknown',
    ip:
        typeof req.headers['x-forwarded-for'] === 'string'
            ? req.headers['x-forwarded-for']
            : (req.ip ?? 'unknown'),
});

const option: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
};

const AuthController = {
    async register(req: Request, res: Response) {
        const meta = structureMeta(req);
        const { user, accessToken, refreshToken } = await AuthService.register(req.body, meta);
        sendToken(res, accessToken, refreshToken);
        successResponse(res, 'Register Account Success', user, 201);
    },

    async login(req: Request, res: Response) {
        const meta = structureMeta(req);
        const { user, accessToken, refreshToken } = await AuthService.login(req.body, meta);
        sendToken(res, accessToken, refreshToken);
        successResponse(res, 'Login Account Success', user, 201);
    },

    async refreshController(req: Request, res: Response) {
        const token = req.cookies.refreshToken as string;
        if (!token) {
            res.clearCookie('refreshToken', option);
            res.clearCookie('accessToken', option);
            throw new AppError(401, 'No Refresh Token');
        }

        try {
            const { access, refresh } = await AuthService.refresh(token);
            sendToken(res, access, refresh);
            successResponse(res, 'Refreshed Token successfully');
        } catch (error) {
            res.clearCookie('refreshToken', option);
            res.clearCookie('accessToken', option);
            throw error;
        }
    },

    async verifyEmail(req: Request, res: Response) {
        const data = await AuthService.verifyEmail(req.query.token as string)
        successResponse(res, "Email verified", data, 200)
    },

    async logout(req: Request, res: Response) {
        const token = req.cookies.refreshToken as string | undefined;

        if (token) {
            try {
                await AuthService.logout(token);
            } catch {
                // Logout should still clear browser cookies when the server session is already gone.
            }
        }

        res.clearCookie('refreshToken', option);
        res.clearCookie('accessToken', option);
        successResponse(res, 'Logout successfully');
    },

    async sendResetToken (req: Request, res: Response) {        
        const token = await AuthService.sendResetToken(req.body)
        successResponse(res, "Verify Token Has Been Sent", token, 201)
    },

    async verifyResetToken (req: Request, res: Response) {
        const data = await AuthService.verifyResetToken(req.body)
        successResponse(res, "Password reset successfully", data, 200)
    },

    
};


export default AuthController
