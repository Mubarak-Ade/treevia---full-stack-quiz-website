import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../env.js';
import { AuthUser } from '../types/express.js';


const optionalAuth: RequestHandler = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header?.startsWith("Bearer ")) {
    return next();
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.SECRET) as AuthUser;

    req.user = decoded;

    next();
  } catch {
    next();
  }
};


export default optionalAuth;
