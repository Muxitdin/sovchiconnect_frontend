import api from "./api";
import { getCookie } from './CookiesService';

api.interceptors.request.use((req) => {
    const token = getCookie("token")
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

const service = {
    // auth
    getAuth: async () => {
        const { data } = await api.get("/auth");
        return data;
    },
    authRegister: async (userData) => {
        const { data } = await api.post("/auth/register", userData);
        return data;
    },
    authLogin: async (userData) => {
        const { data } = await api.post("/auth/login", userData);
        return data;
    },
};

export default service;
