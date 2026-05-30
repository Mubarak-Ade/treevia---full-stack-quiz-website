import { randomUUID } from 'node:crypto';

export interface ISession {
    _id: string;
    user: string;
    refreshTokenHash: string;
    userAgent: string;
    ip: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateSessionInput {
    _id?: string;
    user: string;
    refreshTokenHash?: string;
    userAgent?: string;
    ip?: string;
    expiresAt: Date;
}

export interface UpdateSessionInput {
    refreshTokenHash?: string;
    expiresAt?: Date;
}

export const createSessionEntity = (input: CreateSessionInput): ISession => {
    const now = new Date();

    return {
        _id: input._id ?? randomUUID(),
        user: input.user.toString(),
        refreshTokenHash: input.refreshTokenHash ?? '',
        userAgent: input.userAgent ?? 'unknown',
        ip: input.ip ?? 'unknown',
        expiresAt: input.expiresAt,
        createdAt: now,
        updatedAt: now,
    };
};

export const applySessionUpdate = (session: ISession, input: UpdateSessionInput): ISession => ({
    ...session,
    ...input,
    updatedAt: new Date(),
});
