import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

interface AuthRequest extends Request {
	user?: any;
}

const authorizeRoles = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
    if (!req.user) {
        throw createHttpError(401, "Unauthorized")
    }
	if (req.user.role !== "admin") {
        throw createHttpError(403, "Access Denied");
	}
	next();
};

export default authorizeRoles;
