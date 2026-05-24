import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../user/user.model.js';
import UserStats from '../user/user-stats.model.js';
import { createAccessToken, createRefreshToken } from '../../utils/jwt.js';
import type { Login, Register, ResetToken, VerifyToken } from './auth.schema.js';
import Session from '../session/session.model.js';
import jwt from 'jsonwebtoken';
import env from '../../env.js';
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

const AuthService = {
    async register(userInfo: Register, meta: SessionMeta) {
        const { username, email, password } = userInfo;

        let user = await User.findOne({ email });
        if (user) {
            throw new AppError(400, 'User already exists');
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
        await UserStats.create({ user: user._id });

        const { accessToken, refreshToken } = await createSessionAndTokens(
            user._id.toString(),
            meta
        );

        await sendVerificationEmail(user.email, token);

        return {
            user: structureUser(user),
            accessToken,
            refreshToken,
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
    },

    async verifyEmail(token: string) { 
        if (!token) {
            throw new AppError(400, 'Invalid Token');
        }

        const user = await User.findOne({ emailVerificationToken: token, emailVerificationExpires: { $gt: new Date() } });

        if (!user) {
            throw new AppError(400, 'Invalid Token, or Token expired');
        }
        
        user.isVerfified = true;
        user.emailVerificationExpires = null;
        user.emailVerificationToken = null;

        await user.save();

        return true;
    },

    async getAllSession() {
        const session = await Session.find({}).lean();
        return session;
    },

    async logout(token: string) {
        const decoded = verifyRefreshToken(token);

        await Session.findByIdAndDelete(decoded.id);
    },

    async sendResetToken({email}: ResetToken) {

        const user = await User.findOne({ email });

        console.log(user);
        
        if (!user) {
            throw new AppError(400, 'invalid email');
        }

        await Session.deleteMany({ user: user._id });

        const { token, expires } = generateVerifyToken();

        user.emailVerificationToken = token;
        user.emailVerificationExpires = expires;

        await user.save();

        await resetPasswordEmail(user.email, token)

        return token;
    },

    async resendVerificationEmail(email: string) {
        const user = await User.findOne({email})

        if (!user || user.isVerfified) return false

        const { token, expires } = generateVerifyToken();

        user.emailVerificationToken = token;
        user.emailVerificationExpires = expires;

        await user.save();

        await sendVerificationEmail(user.email, token)

        return true
    },

    async verifyResetToken(payload: VerifyToken) {
        const { token, password } = payload
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
