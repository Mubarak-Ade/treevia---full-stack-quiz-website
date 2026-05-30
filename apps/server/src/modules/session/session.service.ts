import {
    applySessionUpdate,
    createSessionEntity,
    type CreateSessionInput,
    type ISession,
    type UpdateSessionInput,
} from './session.model.js';
import { SessionRepository } from './session.repository.js';

const sortByNewest = (sessions: ISession[]) =>
    sessions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

const isExpired = (session: ISession) => session.expiresAt.getTime() <= Date.now();

const loadActiveSessions = async (sessionIds: string[]) => {
    const sessions = await Promise.all(sessionIds.map((id) => SessionService.findById(id)));
    const expiredIds = sessionIds.filter((_, index) => !sessions[index]);

    return {
        sessions: sortByNewest(sessions.filter((session): session is ISession => Boolean(session))),
        expiredIds,
    };
};

const SessionService = {
    async create(input: CreateSessionInput): Promise<ISession> {
        return SessionRepository.save(createSessionEntity(input));
    },

    async findById(sessionId: string): Promise<ISession | null> {
        const session = await SessionRepository.findById(sessionId);

        if (!session) return null;

        if (isExpired(session)) {
            await SessionRepository.delete(session);
            return null;
        }

        return session;
    },

    async update(sessionId: string, input: UpdateSessionInput): Promise<ISession | null> {
        const session = await SessionService.findById(sessionId);

        if (!session) return null;

        return SessionRepository.save(applySessionUpdate(session, input));
    },

    async deleteById(sessionId: string): Promise<void> {
        const session = await SessionRepository.findById(sessionId);

        if (session) {
            await SessionRepository.delete(session);
            return;
        }

        await SessionRepository.deleteById(sessionId);
    },

    async findByUser(userId: string): Promise<ISession[]> {
        const ids = await SessionRepository.findIdsByUser(userId);
        const { sessions, expiredIds } = await loadActiveSessions(ids);

        await SessionRepository.removeUserSessionIds(userId, expiredIds);

        return sessions;
    },

    async findAll(): Promise<ISession[]> {
        const ids = await SessionRepository.findAllIds();
        const { sessions, expiredIds } = await loadActiveSessions(ids);

        await SessionRepository.removeAllSessionIds(expiredIds);

        return sessions;
    },

    async deleteByUser(userId: string): Promise<void> {
        const sessions = await SessionService.findByUser(userId);

        await Promise.all(sessions.map((session) => SessionRepository.delete(session)));
        await SessionRepository.deleteUserIndex(userId);
    },
};

export default SessionService;
