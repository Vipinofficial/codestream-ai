import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------------------------------- */
/* TOKEN HELPERS                      */
/* ---------------------------------- */
const getToken = () => localStorage.getItem("cs_token");
const removeToken = () => localStorage.removeItem("cs_token");

/* ---------------------------------- */
/* REQUEST INTERCEPTOR (Attach Token) */
/* ---------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------------------------- */
/* RESPONSE INTERCEPTOR (Global Errors) */
/* ---------------------------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();

      // Optional: redirect to login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;