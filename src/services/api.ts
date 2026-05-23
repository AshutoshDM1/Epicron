import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

let getAuthToken: (() => Promise<string | null>) | null = null;

export const setTokenFetcher = (fetcher: (() => Promise<string | null>) | null) => {
  getAuthToken = fetcher;
};

// Add token to all requests
api.interceptors.request.use(
  async (config) => {
    // Standard Clerk JWT Authentication via Authorization header
    if (getAuthToken) {
      const token = await getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Don't auto-reload on auth errors - let the UI handle it
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just pass the error through - components will handle it
    return Promise.reject(error);
  }
);

export default api;
