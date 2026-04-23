import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../../models/User.js';
import UserStats from '../../models/UserStats.js';
import { createAccessToken, createRefreshToken } from '../../utils/jwt.js';
import type { Login, Register } from '../../schema/auth.schema.js';
import Session from '../../models/Session.js';
import jwt from 'jsonwebtoken';
import env from '../../env.js';
import { AppError } from '../../utils/error-handler.js';

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
    const session = new Session({
        user: userId,
        userAgent,
        ip,
        expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    });

    const accessToken = createAccessToken(userId);
    const refreshToken = createRefreshToken(session._id.toString());

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await session.save();

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
    const session = await Session.findById(sessionId);

    if (!session || session.expiresAt.getTime() <= Date.now()) {
        if (session) {
            await Session.findByIdAndDelete(session._id);
        }

        throw new AppError(401, INVALID_SESSION_ERROR);
    }

    return session;
};

const register = async (userInfo: Register, meta: SessionMeta) => {
    const { username, email, password } = userInfo;

    let user = await User.findOne({ email });
    if (user) {
        throw new AppError(400, 'User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = new User({
        username,
        email,
        password: passwordHash,
    });

    await user.save();
    await UserStats.create({ user: user._id });

    const { accessToken, refreshToken } = await createSessionAndTokens(user._id.toString(), meta);

    return {
        user: structureUser(user),
        accessToken,
        refreshToken,
    };
};

const login = async (userInfo: Login, meta: SessionMeta) => {
    const { email, password } = userInfo;

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(401, INVALID_CREDENTIALS_ERROR);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(400, INVALID_CREDENTIALS_ERROR);
    }

    const { accessToken, refreshToken } = await createSessionAndTokens(user._id.toString(), meta);

    return {
        user: structureUser(user),
        accessToken,
        refreshToken,
    };
};
export const refresh = async (token: string) => {
    const decoded = verifyRefreshToken(token);
    const session = await findActiveSession(decoded.id);

    const valid = await bcrypt.compare(token, session.refreshTokenHash);
    if (!valid) {
        await Session.findByIdAndDelete(session._id);
        throw new AppError(400, INVALID_SESSION_ERROR);
    }

    const newAccessToken = createAccessToken(session.user);
    const newRefreshToken = createRefreshToken(session._id.toString());

    session.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    session.expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await session.save();

    return {
        access: newAccessToken,
        refresh: newRefreshToken,
    };
};

export const getAllSession = async () => {
    const session = await Session.find({}).lean();
    return session;
};

export const logout = async (token: string) => {
    const decoded = verifyRefreshToken(token);

    await Session.findByIdAndDelete(decoded.id);
};

export default { register, login, refresh, logout, getAllSession };
