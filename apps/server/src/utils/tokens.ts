import { Response } from 'express';
import env from '../env.js';
import crypto from "crypto"
import bcrypt from 'bcryptjs';

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


export const generateVerifyToken = () => {
    const token = crypto.randomBytes(12).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 100)

    return {token, expires}
}

export const hashValue = async (value: string) => {
    const salt = await bcrypt.genSalt()
    const output = await bcrypt.hash(value, salt)

    return output
}

export const verifyHashValue = async (value: string, hash: string) => {
    const isVerify = await bcrypt.compare(value, hash)
    return isVerify
}