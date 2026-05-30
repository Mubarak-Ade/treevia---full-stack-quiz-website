import axios, { AxiosInstance } from 'axios';

const client_url = `${import.meta.env.VITE_API_BASE_URL as string}/api`;

const api: AxiosInstance = axios.create({
    baseURL: client_url,
    withCredentials: true,
});

let isRefreshing = false
let queue: Array<() => void> = []

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



api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config
        const requestUrl = typeof original?.url === "string" ? original.url : ""
        const pathname = requestUrl.startsWith("http") ? new URL(requestUrl).pathname : requestUrl
        const normalizedPath = pathname.startsWith("/api") ? pathname.replace(/^\/api/, "") : pathname

        if (error.response?.status !== 401 || original?._retry || byPass.has(normalizedPath)) {
            return Promise.reject(error)
        }

        original._retry = true

        if (isRefreshing) {
            return new Promise((resolve) => {
                queue.push(() => {
                    resolve(api(original))
                })
            })
        }

        isRefreshing = true
        
        try {
            await api.post("/auth/refresh")
            queue.forEach((resume) => resume())
            console.log(queue);
            queue = []
            return api(original)
        } catch (refreshError) {
            queue = []
            return Promise.reject(refreshError)
        } finally {
            isRefreshing = false
        }
    }
)


export default api;
