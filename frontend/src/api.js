import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const BASE_URL = import.meta.env.VITE_API_URL|| 'http://localhost:8000';
console.log("Using API base URL:", BASE_URL);

const api = axios.create({
  // baseURL: "http://localhost:8000", // Django backend
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: auto-refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const res = await axios.post(`${BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken,
          });

          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

          return axios(originalRequest); // retry original request
        } catch (_err) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          window.location.href = "/login"; // force login
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
