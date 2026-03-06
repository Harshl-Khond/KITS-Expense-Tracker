import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
// Automatically attach session_token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("session");

  if (token) {
    if (config.method === "get") {
      config.params = config.params || {};
      config.params.session_token = token;
    } else {
      config.data = config.data || {};
      config.data.session_token = token;
    }
  }

  return config;
});

// Add response interceptor for better debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Details:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);
