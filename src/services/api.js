import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "applicatoin/json"
    },
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const blogServices = {
    getPosts: async () => {
        const response = await api.get("/posts");
        return response.data;
    },

    getAuthors: async () => {
        const response = await api.get("authors");
        return response.data;
    }
}

export default api;
