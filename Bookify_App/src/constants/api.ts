export const API_BASE_URL = "http://localhost:3000";

export const ENDPOINTS = {
    AUTH: {
        SIGNUP: '/authentication/sign-up',
        LOGIN:  '/authentication/log-in',
        LOGOUT: '/authentication/log-out',
        ME:     '/authentication',
    },
    VENUES: {
        LIST: '/venues',
        DETAILS: (id: number | string) => `/venues/${id}`,
    },
} as const;