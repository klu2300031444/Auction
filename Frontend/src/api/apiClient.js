// src/api/apiClient.js
// src/api/apiClient.js
import axios from 'axios';

// Prefer relative \/api for dev proxy; allow overriding with VITE_API_BASE
const BASE = import.meta.env.VITE_API_BASE || '/api';

const apiClient = axios.create({
  baseURL: BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// This interceptor adds the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;