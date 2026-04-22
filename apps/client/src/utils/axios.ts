import axios, { AxiosInstance } from 'axios';

const client_url = import.meta.env.VITE_API_BASE_URL as string;

const api: AxiosInstance = axios.create({
    baseURL: client_url,
    withCredentials: true,
});

const byPass = new Set([
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/refresh',
]);

api.interceptors.response.use(
    response => response,
    async error => {
        const original = error.config;
        const requestUrl = typeof original?.url === 'string' ? original.url : '';
        const pathname = requestUrl.startsWith('http') ? new URL(requestUrl).pathname : requestUrl;
        const normalizedPath = pathname.startsWith('/api')
            ? pathname.replace(/^\/api/, '')
            : pathname;

        if (error.response?.status !== 401 || original?._retry || byPass.has(normalizedPath)) {
            return Promise.reject(error)
        }
        original._retry = true;
        try {
            await axios.post(`${client_url}/auth/refresh`, {}, { withCredentials: true });
            return api(original);
        } catch (err) {
            return Promise.reject(err)
        }
    }
);

export default api;
