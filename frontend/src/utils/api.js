/**
 * API Configuration
 * Backend API base URL and endpoints
 */
// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
// });
const API_BASE_URL = import.meta.env.VITE_API_URL;
// console.log(API_BASE_URL);
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    PRODUCTS: `${API_BASE_URL}/products`,
    ORDERS: `${API_BASE_URL}/orders`,
    AUTH_LOGIN: `${API_BASE_URL}/users/login`,
    AUTH_SIGNUP: `${API_BASE_URL}/users/signup`,
  }
};

// console.log(API);

export default API;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;
