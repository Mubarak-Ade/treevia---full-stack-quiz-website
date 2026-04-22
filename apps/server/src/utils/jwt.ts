import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import env from '../env.js';

export const createAccessToken = (id: string): string => {
    return jwt.sign({ id }, env.ACCESS_SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (id: string): string => {
    return jwt.sign({ id }, env.REFRESH_SECRET, { expiresIn: '7d' });
};
