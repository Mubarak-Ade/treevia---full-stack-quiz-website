import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import User, { IUser } from '../user/user.model.js';
import UserStats from '../user/user-stats.model.js';
import { createAccessToken, createRefreshToken } from '../../utils/jwt.js';
import type { Login, Register, ResetToken, VerifyToken } from './auth.schema.js';
import SessionService from '../session/session.service.js';
import jwt from 'jsonwebtoken';
import env from '../../config/env.js';
import { AppError } from '../../utils/error-handler.js';
import { generateVerifyToken, hashValue } from '../../utils/tokens.js';
import { resetPasswordEmail, sendVerificationEmail } from '../../utils/email.js';

interface SessionMeta {
    userAgent: string;
    ip: string;
}

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const INVALID_CREDENTIALS_ERROR = 'Invalid email or password';
const INVALID_SESSION_ERROR = 'Session expired or invalid';

const structureUser = (user: IUser) => ({
    id: user._id,
    profile: user.profilePic,
    username: user.username,
    email: user.email,
    role: user.role,
});

const createSessionAndTokens = async (userId: string, { userAgent, ip }: SessionMeta) => {
    const sessionId = randomUUID();
    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(sessionId);

    const session = await SessionService.create({
        _id: sessionId,
        user: userId,
        refreshTokenHash: await bcrypt.hash(refreshToken, 10),
        userAgent,
        ip,
        expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    });

    return { session, accessToken, refreshToken };
};

const verifyRefreshToken = (token: string): { id: string } => {
    try {
        return jwt.verify(token, env.REFRESH_SECRET) as { id: string };
    } catch {
        throw new AppError(401, INVALID_SESSION_ERROR);
    }
};

const findActiveSession = async (sessionId: string) => {
    const session = await SessionService.findById(sessionId);

    if (!session || session.expiresAt.getTime() <= Date.now()) {
        if (session) {
            await SessionService.deleteById(session._id);
        }

        throw new AppError(401, INVALID_SESSION_ERROR);
    }

    return session;
};

const AuthService = {
    async register(userInfo: Register, meta: SessionMeta) {
        const { username, email, password } = userInfo;

        let user = await User.findOne({ email });
        if (user) {
            if (user.isVerified) {
                throw new AppError(400, 'User already exists');
            }
            await this.resendVerificationEmail(email);
            throw new AppError(403, 'User already exists but email not verified. A new verification email has been sent.');
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const { token, expires } = generateVerifyToken();

        user = new User({
            username,
            email,
            password: passwordHash,
            emailVerificationToken: token,
            emailVerificationExpires: expires,
        });

        await user.save();
        await UserStats.create({ user: user._id })

        await sendVerificationEmail(user.email, token);

        return {
            user: structureUser(user),
        };
    },

    async login(userInfo: Login, meta: SessionMeta) {
        const { email, password } = userInfo;

        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError(401, INVALID_CREDENTIALS_ERROR);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError(400, INVALID_CREDENTIALS_ERROR);
        }

        if (!user.isVerified) {
            await this.resendVerificationEmail(email);
            throw new AppError(400, 'Email not verified. Please verify your email before logging in.', "EMAIL_NOT_VERIFIED");
        }

        const { accessToken, refreshToken } = await createSessionAndTokens(
            user._id.toString(),
            meta
        );

        return {
            user: structureUser(user),
            accessToken,
            refreshToken,
        };
    },
    async refresh(token: string) {
        const decoded = verifyRefreshToken(token);
        const session = await findActiveSession(decoded.id);

        const valid = await bcrypt.compare(token, session.refreshTokenHash);
        if (!valid) {
            await SessionService.deleteById(session._id);
            throw new AppError(400, INVALID_SESSION_ERROR);
        }

        const newAccessToken = createAccessToken(session.user);
        const newRefreshToken = createRefreshToken(session._id.toString());

        await SessionService.update(session._id, {
            refreshTokenHash: await bcrypt.hash(newRefreshToken, 10),
            expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
        });

        return {
            access: newAccessToken,
            refresh: newRefreshToken,
        };
    },

    async verifyEmail(token: string) {
        if (!token) {
            throw new AppError(400, 'Invalid Token');
        }

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() },
        });

        if (!user) {
            throw new AppError(400, 'Invalid Token, or Token expired');
        }

        user.isVerified = true;
        user.emailVerificationExpires = null;
        user.emailVerificationToken = null;

        await user.save();

        return true;
    },

    async getAllSession() {
        const session = await SessionService.findAll();
        return session;
    },

    async logout(token: string) {
        const decoded = verifyRefreshToken(token);

        await SessionService.deleteById(decoded.id);
    },

    async sendResetToken({ email }: ResetToken) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError(400, 'invalid email');
        }

        await SessionService.deleteByUser(user._id.toString());

        const { token, expires } = generateVerifyToken();

        user.emailVerificationToken = token;
        user.emailVerificationExpires = expires;

        await user.save();
        await resetPasswordEmail(user.email, token);

        return true;
    },

    async resendVerificationEmail(email: string) {
        const user = await User.findOne({ email });

        if (!user || user.isVerified) return false;

        const { token, expires } = generateVerifyToken();

        user.emailVerificationToken = token;
        user.emailVerificationExpires = expires;

        await user.save();

        await sendVerificationEmail(user.email, token);

        return true;
    },

    async verifyResetToken(payload: VerifyToken) {
        const { token, password } = payload;
        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: new Date() },
        });

        if (!user) {
            throw new AppError(400, 'Invalid Token, or Token expired');
        }

        const newPassword = await hashValue(password);

        user.password = newPassword;

        user.emailVerificationExpires = null;
        user.emailVerificationToken = null;

        await user.save();

        return true;
    },
};

export default AuthService;
