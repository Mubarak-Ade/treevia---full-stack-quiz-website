import { RequestHandler } from 'express';
import SessionService from './session.service.js';

export const getSessions: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const session = req.user ? await SessionService.findByUser(req.user) : [];
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
};
