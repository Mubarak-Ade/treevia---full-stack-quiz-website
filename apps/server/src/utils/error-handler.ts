
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly details?: unknown;

    constructor (statusCode = 500, message: string, details?: unknown) {
        super(message)
        this.name = "AppError",
        this.statusCode = statusCode,
        this.details = details
    }
}