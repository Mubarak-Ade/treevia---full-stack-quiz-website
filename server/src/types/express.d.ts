import { RequestHandler } from "express";


declare global {
	namespace Express {
		interface Request {
			user?: string
		}
	}
}
