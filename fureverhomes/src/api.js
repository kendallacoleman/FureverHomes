// Import Axios
import axios from "axios";

// Create an Axios instance with your backend base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // adjust if your Django API uses a different path
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // if you use cookies for authentication
});

// Optional: Add request/response interceptors
api.interceptors.request.use(
  (config) => {
    // For example, add auth token if needed
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// Default export so you can do: import api from "../api"
export default api;


const API_BASE = "http://127.0.0.1:8000"; // Django backend

export async function searchPets(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/search/?${query}`);
  if (!res.ok) throw new Error("Failed to fetch pets");
  return res.json();
}
