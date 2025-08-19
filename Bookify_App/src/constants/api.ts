export const API_BASE_URL = "http://localhost:3000";

export const ENDPOINTS = {
    AUTH: {
        SIGNUP: '/auth/signup',
        LOGIN:  '/auth/login',
        LOGOUT: '/auth/logout',
        ME:     '/auth/me',
    },
    VENUES: {
        LIST: '/venues',
        DETAILS: (id: number | string) => `/venues/${id}`,
    },
} as const;