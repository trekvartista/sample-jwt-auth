import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
    withCredentials: true, // to attach cookies to every request
    baseURL: API_URL,
});

api.interceptors.response.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export default api;