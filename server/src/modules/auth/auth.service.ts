import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import UserStats from '../../models/UserStats.js';
import { createAccessToken, createRefreshToken } from '../../utils/jwt.js';
import type { Register } from '../../schema/auth.schema.js';
import Session from '../../models/Session.js';
import jwt from 'jsonwebtoken';
import env from '../../env.js';

const register = async (userInfo: Register) => {
    const { username, email, password } = userInfo;

    if (!username || !email || !password) {
        throw createHttpError(400, 'Missing fields');
    }

    let user = await User.findOne({ email });
    if (user) {
        throw createHttpError(400, 'User already exists');
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

    return {
        id: user._id,
        profile: user.profilePic,
        username: user.username,
        email: user.email,
        role: user.role,
    };
};

const login = async (userInfo: Omit<Register, 'name'>, userAgent: string, ip: string) => {
    const { email, password } = userInfo;

    if (!email || !password) {
        throw createHttpError(400, 'Missing fields');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(400, 'User doesnt exists');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw createHttpError(400, 'Invalid credentials');
    }

    const session = new Session({
        user: user._id,
        userAgent,
        ip,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 100,
    });

    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(session._id.toString());

    session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await session.save();
    return {
        user: {
            id: user._id,
            profile: user.profilePic,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};
export const refresh = async (token: string) => {
    const decoded = jwt.verify(token, env.REFRESH_SECRET) as { id: string };

    const session = await Session.findById(decoded?.id);

    if (!session) {
        throw createHttpError(400, 'Sessions Expired');
    }

    const valid = await bcrypt.compare(token, session.refreshTokenHash);
    if (!valid) {
        throw createHttpError(400, 'Sessions Expired');
    }

    const newAccessToken = createAccessToken(session.user);
    const newRefreshToken = createRefreshToken(session._id.toString());

    session.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await session.save();

    return {
        access: newAccessToken,
        refresh: newRefreshToken,
    };
};

export default { register, login, refresh };
