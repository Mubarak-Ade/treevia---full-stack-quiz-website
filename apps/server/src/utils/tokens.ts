import { Response } from 'express';
import env from '../env.js';

const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000;
const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const sendToken = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: ACCESS_TOKEN_MAX_AGE_MS,
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: REFRESH_TOKEN_MAX_AGE_MS,
    });
};
