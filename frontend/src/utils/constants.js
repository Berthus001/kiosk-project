// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: '/health',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  }
};

// Application constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Kiosk';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData'
};
