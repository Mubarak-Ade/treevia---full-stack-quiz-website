import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import env from '../env.js';
import createHttpError from 'http-errors';
import { AuthUser } from '../types/express.js';

interface AuthRequest extends Request {
  user?: any;
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const header = req.header("Authorization");

  if (!header) {
    throw createHttpError(401, "No token, authorization denied")
  }

  const token = header.split(" ")[1]

  if (!token) {
    throw createHttpError(401,  "No token, authorization denied")
  }
  try {
    
    const decode = jwt.verify(token, env.SECRET!) as AuthUser;

    req.user = decode;
    next();
  } catch (error) {
    throw createHttpError(401, 'Request is not authorized');
  }
};

export default requireAuth;
