import { createHash } from 'node:crypto';
import type { Request, RequestHandler } from 'express';
import env from '../config/env.js';
import redis from '../config/redis.js';

type RateLimitValue = number | ((req: Request) => number);
type RateLimitKeyGenerator = (req: Request) => string;

interface RateLimiterOptions {
    keyPrefix?: string;
    maxRequests?: RateLimitValue;
    windowSeconds?: RateLimitValue;
    keyGenerator?: RateLimitKeyGenerator;
    skip?: (req: Request) => boolean;
}

const toClientKey = (ip?: string) => ip || 'unknown';
const hashValue = (value: string) => createHash('sha256').update(value).digest('hex');
const normalizeKeyPart = (value?: string) => hashValue(value?.trim().toLowerCase() || 'unknown');
const getIpKey = (req: Request) => toClientKey(req.ip);
const getUserOrIpKey = (req: Request) => req.user || getIpKey(req);
const getOptionValue = (value: RateLimitValue, req: Request) =>
    typeof value === 'function' ? value(req) : value;

export const rateLimiter = ({
    keyPrefix = 'rate-limit',
    maxRequests = env.RATE_LIMIT_MAX_REQUESTS,
    windowSeconds = env.RATE_LIMIT_WINDOW_SECONDS,
    keyGenerator = getIpKey,
    skip,
}: RateLimiterOptions = {}): RequestHandler => {
    return async (req, res, next) => {
        if (skip?.(req)) {
            next();
            return;
        }

        const requestLimit = getOptionValue(maxRequests, req);
        const requestWindow = getOptionValue(windowSeconds, req);
        const key = `${keyPrefix}:${keyGenerator(req)}`;

        try {
            const requests = await redis.incr(key);

            if (requests === 1) {
                await redis.expire(key, requestWindow);
            }

            const ttl = await redis.ttl(key);
            const retryAfter = Math.max(ttl, 0);
            const remaining = Math.max(requestLimit - requests, 0);

            res.setHeader('RateLimit-Limit', requestLimit.toString());
            res.setHeader('RateLimit-Remaining', remaining.toString());
            res.setHeader('RateLimit-Reset', retryAfter.toString());

            if (requests > requestLimit) {
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

export const rateLimitStrategies = {
    api: rateLimiter({
        keyPrefix: 'rate-limit:api',
        maxRequests: req => (req.user ? 500 : 100),
        windowSeconds: 60,
        keyGenerator: getUserOrIpKey,
    }),

    publicRead: rateLimiter({
        keyPrefix: 'rate-limit:public-read',
        maxRequests: 300,
        windowSeconds: 60,
    }),

    search: rateLimiter({
        keyPrefix: 'rate-limit:search',
        maxRequests: 60,
        windowSeconds: 60,
        skip: req => !req.query.searchTerm && !req.query.search && !req.query.q,
    }),

    login: rateLimiter({
        keyPrefix: 'rate-limit:auth:login',
        maxRequests: 5,
        windowSeconds: 60,
        keyGenerator: req => `${getIpKey(req)}:${normalizeKeyPart(req.body?.email)}`,
    }),

    register: rateLimiter({
        keyPrefix: 'rate-limit:auth:register',
        maxRequests: 3,
        windowSeconds: 60,
    }),

    forgotPassword: rateLimiter({
        keyPrefix: 'rate-limit:auth:forgot-password',
        maxRequests: 3,
        windowSeconds: 60 * 60,
        keyGenerator: req => normalizeKeyPart(req.body?.email),
    }),

    resetPassword: rateLimiter({
        keyPrefix: 'rate-limit:auth:reset-password',
        maxRequests: 5,
        windowSeconds: 60 * 60,
        keyGenerator: req => normalizeKeyPart(req.body?.token),
    }),

    refreshToken: rateLimiter({
        keyPrefix: 'rate-limit:auth:refresh',
        maxRequests: 60,
        windowSeconds: 60,
        keyGenerator: req => normalizeKeyPart(req.cookies?.refreshToken || getIpKey(req)),
    }),

    quizAttempt: rateLimiter({
        keyPrefix: 'rate-limit:quiz-attempt',
        maxRequests: 120,
        windowSeconds: 60,
        keyGenerator: req => `${getUserOrIpKey(req)}:${req.params.quizId || req.body?.quizId || 'unknown'}`,
    }),

    quizSubmission: rateLimiter({
        keyPrefix: 'rate-limit:quiz-submit',
        maxRequests: 5,
        windowSeconds: 60,
        keyGenerator: req => `${getUserOrIpKey(req)}:${req.params.quizId || req.body?.quizId || 'unknown'}`,
    }),

    adminWrite: rateLimiter({
        keyPrefix: 'rate-limit:admin-write',
        maxRequests: 60,
        windowSeconds: 60,
        keyGenerator: getUserOrIpKey,
    }),
};
