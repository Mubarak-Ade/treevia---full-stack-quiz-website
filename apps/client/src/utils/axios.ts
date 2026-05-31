import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const client_url = `${import.meta.env.VITE_API_BASE_URL as string}/api`;

const api: AxiosInstance = axios.create({
    baseURL: client_url,
    withCredentials: true,
});

type ApiErrorResponse = {
    message?: unknown;
    error?: unknown;
    details?: unknown;
};

type RetryableAxiosConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

let isRefreshing = false;
let queue: Array<{
    resolve: () => void;
    reject: (error: unknown) => void;
}> = [];

const byPass = new Set([
    '/auth/login',
    '/auth/register',
    '/auth/reset',
    '/auth/verify',
    '/auth/verify-email',
    '/auth/refresh',
    '/auth/logout',
    '/user/me'
]);

const getValidationMessage = (details: unknown) => {
    if (!details || typeof details !== 'object') return null;

    const firstError = Object.values(details).find(
        (value): value is { message?: unknown } =>
            Boolean(value) && typeof value === 'object' && 'message' in value
    );

    return typeof firstError?.message === 'string' ? firstError.message : null;
};

export const getApiErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const data = error.response?.data;

        if (typeof data?.message === 'string' && data.message.trim()) {
            return data.message;
        }

        if (typeof data?.error === 'string' && data.error.trim()) {
            return data.error;
        }

        const validationMessage = getValidationMessage(data?.details);
        if (validationMessage) return validationMessage;

        if (error.message) return error.message;
    }

    return error instanceof Error && error.message ? error.message : fallback;
};

const normalizeApiError = (error: AxiosError<ApiErrorResponse>) => {
    error.message = getApiErrorMessage(error);
    return error;
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!axios.isAxiosError<ApiErrorResponse>(error)) {
            return Promise.reject(error);
        }

        const original = error.config as RetryableAxiosConfig | undefined;
        if (!original) {
            return Promise.reject(normalizeApiError(error));
        }

        const requestUrl = typeof original?.url === "string" ? original.url : "";
        const pathname = requestUrl.startsWith("http") ? new URL(requestUrl).pathname : requestUrl;
        const normalizedPath = pathname.startsWith("/api") ? pathname.replace(/^\/api/, "") : pathname;

        if (error.response?.status !== 401 || original?._retry || byPass.has(normalizedPath)) {
            return Promise.reject(normalizeApiError(error));
        }

        original._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push({
                    resolve: () => {
                        resolve(api(original));
                    },
                    reject,
                });
            });
        }

        isRefreshing = true;
        
        try {
            await api.post("/auth/refresh");
            queue.forEach(({ resolve }) => resolve());
            queue = [];
            return api(original);
        } catch (refreshError) {
            const normalizedError = axios.isAxiosError<ApiErrorResponse>(refreshError)
                ? normalizeApiError(refreshError)
                : refreshError;

            queue.forEach(({ reject }) => reject(normalizedError));
            queue = [];
            return Promise.reject(normalizedError);
        } finally {
            isRefreshing = false;
        }
    }
);


export default api;
