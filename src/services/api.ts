import axios from 'axios';
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    android: "https://flood-report-app.onrender.com",
    ios: "https://flood-report-app.onrender.com",
    default: "https://flood-report-app.onrender.com",
});

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let authToken: string | null = null;

export const setAuthToken = (token: string) => {
    authToken = token;
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const auth = {
    login: async (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        // OAuth2PasswordRequestForm sends data as form-data
        const response = await api.post('/auth/login', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
};

export const reports = {
    getAll: async () => {
        const response = await api.get('/reports/');
        return response.data;
    },
    create: async (reportData) => {
        const response = await api.post('/reports/', reportData);
        return response.data;
    },
};

export default api;
