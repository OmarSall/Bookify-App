import axios, { AxiosError } from 'axios';

// Allows React layer (AuthProvider) to register a callback for any 401 response.
let on401Handler: (() => void) | null = null;

/** Register a global 401 handler (e.g., logout + redirect). Pass null to unregister. */
export function register401Handler(handler: (() => void) | null) {
  on401Handler = handler;
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
  headers: { Accept: 'application/json' },
});

// === Global response interceptor ===
http.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    const status = err.response?.status;
    if (status === 401 && on401Handler) {
      try {
        on401Handler(); // delegate to React layer
      } catch {
        // no-op: handler errors should not break the interceptor chain
      }
    }
    return Promise.reject(err);
  }
);
