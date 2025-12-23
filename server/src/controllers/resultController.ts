import { Response, Request } from 'express';
import Result from '../models/QuizResult.js';

interface AuthRequest extends Request {
  user?: any;
  params: {
    id?: string;
  };
}

export const getResult = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await Result.find({ user: req.user?._id }).populate('user', 'username');
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getSingleResult = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await Result.findOne({ user: req.user?._id, quiz: req.params.id }).populate('user', 'username');
    if (!result) {
      res.status(404).json({ error: 'Result not found' });
      return;
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
