import axios from 'axios';

// 1. Create the base station
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
    // This is your Spring Boot address. Now you don't have to type it every time!
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. The "ID Badge" rule (Interceptor)
api.interceptors.request.use(
    (config) => {
        // Look inside the browser's local memory for a saved token
        const token = localStorage.getItem('examsy_token');

        // If we found a token, attach it to the header of our request
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;