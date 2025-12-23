import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user?.role)) {
      res.status(401).json({ error: 'Access Denied' });
      return;
    }
    next();
  };
};

export default authorizeRoles;
