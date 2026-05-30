import redis from '../../config/redis.js';
import type { ISession } from './session.model.js';

interface StoredSession extends Omit<ISession, 'expiresAt' | 'createdAt' | 'updatedAt'> {
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

const SESSION_PREFIX = 'session';
const USER_SESSION_PREFIX = 'user:sessions';
const ALL_SESSIONS_KEY = 'sessions';

const sessionKey = (sessionId: string) => `${SESSION_PREFIX}:${sessionId}`;
const userSessionsKey = (userId: string) => `${USER_SESSION_PREFIX}:${userId}`;

const ttlSeconds = (expiresAt: Date) =>
    Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));

const serialize = (session: ISession): string =>
    JSON.stringify({
        ...session,
        expiresAt: session.expiresAt.toISOString(),
        createdAt: session.createdAt.toISOString(),
        updatedAt: session.updatedAt.toISOString(),
    });

const deserialize = (payload: string | null): ISession | null => {
    if (!payload) return null;

    const session = JSON.parse(payload) as StoredSession;

    return {
        ...session,
        expiresAt: new Date(session.expiresAt),
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
    };
};

const removeSetMembers = async (key: string, members: string[]) => {
    if (members.length) await redis.sRem(key, members);
};

export const SessionRepository = {
    async save(session: ISession): Promise<ISession> {
        await Promise.all([
            redis.setEx(sessionKey(session._id), ttlSeconds(session.expiresAt), serialize(session)),
            redis.sAdd(userSessionsKey(session.user), session._id),
            redis.sAdd(ALL_SESSIONS_KEY, session._id),
        ]);

        return session;
    },

    async findById(sessionId: string): Promise<ISession | null> {
        return deserialize(await redis.get(sessionKey(sessionId)));
    },

    async delete(session: ISession): Promise<void> {
        await Promise.all([
            redis.del(sessionKey(session._id)),
            redis.sRem(userSessionsKey(session.user), session._id),
            redis.sRem(ALL_SESSIONS_KEY, session._id),
        ]);
    },

    async deleteById(sessionId: string): Promise<void> {
        await Promise.all([redis.del(sessionKey(sessionId)), redis.sRem(ALL_SESSIONS_KEY, sessionId)]);
    },

    findIdsByUser(userId: string): Promise<string[]> {
        return redis.sMembers(userSessionsKey(userId.toString()));
    },

    findAllIds(): Promise<string[]> {
        return redis.sMembers(ALL_SESSIONS_KEY);
    },

    removeUserSessionIds(userId: string, sessionIds: string[]): Promise<void> {
        return removeSetMembers(userSessionsKey(userId.toString()), sessionIds);
    },

    removeAllSessionIds(sessionIds: string[]): Promise<void> {
        return removeSetMembers(ALL_SESSIONS_KEY, sessionIds);
    },

    deleteUserIndex(userId: string): Promise<number> {
        return redis.del(userSessionsKey(userId.toString()));
    },
};
