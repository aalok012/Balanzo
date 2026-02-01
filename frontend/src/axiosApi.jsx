import axios from "axios";

// In production: use api.{current-domain} (e.g. api.balanzo.tech when on balanzo.tech)
// In development: use VITE_API_URL or localhost:8000
const getBaseURL = () => {
  if (import.meta.env.PROD) {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//api.${hostname}/api/v1`;
  }
  return `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/v1`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // keep if you use auth/cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
