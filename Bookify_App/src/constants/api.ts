export const API_BASE_URL = "http://localhost:3000";

export const ENDPOINTS = {
    AUTH: {
        SIGNUP: '/authentication/signup',
        LOGIN:  '/authentication/login',
        LOGOUT: '/authentication/logout',
        ME:     '/authentication',
    },
    VENUES: {
        LIST: '/venues',
        DETAILS: (id: number | string) => `/venues/${id}`,
    },
} as const;