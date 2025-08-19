import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {}
    return Promise.reject(err);
  }
);
