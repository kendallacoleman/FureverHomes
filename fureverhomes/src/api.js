// src/api.js
import axios from "axios";

// Base URL for your Django backend
const djangoAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // adjust if needed
  withCredentials: true,
});

// Example: get user profile
export const getUserProfile = async (userId) => {
  const response = await djangoAPI.get(`users/${userId}/`);
  return response.data;
};

// Example: update user profile
export const updateUserProfile = async (userId, profileData) => {
  const response = await djangoAPI.put(`users/${userId}/`, profileData);
  return response.data;
};

// --- Petfinder API setup ---
const PETFINDER_API_KEY = klhaTvBAYs4QQVlyaoLD9kMj0p8Ybp98eRkQwU5jvucrkp66Mi;
const PETFINDER_SECRET = O96CAj9NEyr4NDDnbSi1R85gnepbBWzG5fAcBcaD;

// Function to fetch OAuth token from Petfinder
export const getPetfinderToken = async () => {
  const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
    grant_type: "client_credentials",
    client_id: PETFINDER_API_KEY,
    client_secret: PETFINDER_SECRET,
  });
  return response.data.access_token;
};

// Example: search for pets
export const searchPets = async (token, params = {}) => {
  const response = await axios.get("https://api.petfinder.com/v2/animals", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  return response.data.animals;
};

