import axios from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 3000,
    headers: {
        "Content-Type": "applicatoin/json"
    }
});

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
