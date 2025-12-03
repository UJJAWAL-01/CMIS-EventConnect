import axios from 'axios';

// Where we persist the JWT in the browser
const AUTH_TOKEN_KEY = 'auth_token';

export const getToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || null;
  } catch (_) {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (_) {}
};

export const clearToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (_) {}
};

// Axios instance pointing to Vite proxy target (/api -> http://localhost:5050)
export const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

// Attach Authorization header when token exists
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic 401 handler: clear token (optionally redirect)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
      // Optionally: window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// Convenience helpers for common auth flows
export async function login({ username, password }) {
  const { data } = await api.post('/auth/login', { username, password });
  if (data?.token) setToken(data.token);
  return data;
}

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export function logout() {
  clearToken();
}

// Example usage in components:
// import { api, login, setToken, getToken } from '@/lib/api'
// const res = await api.get('/students');
