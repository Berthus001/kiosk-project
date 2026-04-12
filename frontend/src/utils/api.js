/**
 * API Configuration
 * Backend API base URL and endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    PRODUCTS: `${API_BASE_URL}/products`,
    ORDERS: `${API_BASE_URL}/orders`,
    AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
    AUTH_SIGNUP: `${API_BASE_URL}/auth/signup`,
  }
};

export default API;
