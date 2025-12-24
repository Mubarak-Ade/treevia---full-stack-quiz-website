import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../env.js';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}


interface DecodedToken extends JwtPayload {
  userId: string;
}

const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");

  if (!header?.startsWith("Bearer ")) {
    return next();
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.SECRET) as JwtPayload & {
      id: string;
      email: string;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch {
    next();
  }
};


export default optionalAuth;
