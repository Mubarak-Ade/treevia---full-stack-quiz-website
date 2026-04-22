import { RequestHandler } from 'express';
import Session from '../../models/Session.js';

export const getSessions: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const session = await Session.find({user: req.user}).sort({ createdAt: -1 }).lean();
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
};
