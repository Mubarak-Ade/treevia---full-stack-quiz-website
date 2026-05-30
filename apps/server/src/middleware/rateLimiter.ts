import type { RequestHandler } from 'express';
import env from '../config/env.js';
import redis from '../config/redis.js';

interface RateLimiterOptions {
    keyPrefix?: string;
    maxRequests?: number;
    windowSeconds?: number;
}

const toClientKey = (ip?: string) => ip || 'unknown';

export const rateLimiter = ({
    keyPrefix = 'rate-limit',
    maxRequests = env.RATE_LIMIT_MAX_REQUESTS,
    windowSeconds = env.RATE_LIMIT_WINDOW_SECONDS,
}: RateLimiterOptions = {}): RequestHandler => {
    return async (req, res, next) => {
        const key = `${keyPrefix}:${toClientKey(req.ip)}`;

        try {
            const requests = await redis.incr(key);

            if (requests === 1) {
                await redis.expire(key, windowSeconds);
            }

            const ttl = await redis.ttl(key);
            const retryAfter = Math.max(ttl, 0);
            const remaining = Math.max(maxRequests - requests, 0);

            res.setHeader('RateLimit-Limit', maxRequests.toString());
            res.setHeader('RateLimit-Remaining', remaining.toString());
            res.setHeader('RateLimit-Reset', retryAfter.toString());

            if (requests > maxRequests) {
                res.setHeader('Retry-After', retryAfter.toString());
                res.status(429).json({
                    message: 'Too many requests, please try again later.',
                });
                return;
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
