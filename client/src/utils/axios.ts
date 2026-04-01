import axios, { AxiosInstance } from 'axios';

const client_url = import.meta.env.VITE_API_BASE_URL as string

const api: AxiosInstance = axios.create({
    baseURL: client_url,
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    async (error) => {
        const original = error.config;        
        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;
            try {
              await axios.post(`${client_url}/auth/refresh`, {}, {withCredentials: true})
              return api(original)
            } catch (err) {
              window.location.href = '/login'
            }
        }
        const message =
            error.response?.data?.message || error.message || 'An unexpected error occurred';
        console.error('API Error:', message);
        throw new Error(message);
    }
);

export default api;
