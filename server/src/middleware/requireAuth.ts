import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';

interface AuthRequest extends Request {
  user?: any;
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).json({ error: 'Authorization token required' });
      return;
    }

    const token = authorization.split(' ')[1];

    const decode = jwt.verify(token, process.env.SECRET!) as DecodedToken;

    const user = await User.findOne(decode.userId).select('_id');

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default requireAuth;
