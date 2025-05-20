// frontend/src/services/api.ts

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

// ========== ✅ Type Definitions ==========
export interface User {
  id: string;
  name: string;
  email: string;
  // Extend this with more user fields if needed
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  // Extend this with more job fields if needed
}

export interface AuthResponse {
  token: string;
  user: User;
}

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

// ========== ⚙️ Axios Instance Setup ==========

// Base API URL from Vite environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Set request timeout (in ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Optional) Log requests during development for debugging
if (import.meta.env.MODE === 'development') {
  axiosInstance.interceptors.request.use((config) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  });
}

// ========== 🔐 Request Interceptor ==========
// Automatically attach auth token (if present) to all requests
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config as InternalAxiosRequestConfig;
  },
  (error) => Promise.reject(error)
);

// ========== ❌ Response Interceptor ==========
// Global error handling (401 redirects, etc.)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        // Token invalid or expired — force logout
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (status === 403) {
        console.warn('Access denied.');
      } else if (status === 500) {
        console.error('Server error.');
      }
    }
    return Promise.reject(error);
  }
);

// ========== 🧼 Optional Helper ==========
// Unwraps AxiosResponse and returns data directly (used for cleaner API calls)
const unwrap = <T>(promise: Promise<AxiosResponse<T>>): Promise<T> =>
  promise.then((res) => res.data);

// ========== 🔐 Auth API ==========

interface AuthAPI {
  register: (data: RegisterData) => Promise<AxiosResponse<User>>;
  login: (data: LoginData) => Promise<AxiosResponse<AuthResponse>>;
  requestPasswordReset: (email: string) => Promise<AxiosResponse<{ message: string }>>;
  resetPassword: (token: string, password: string) => Promise<AxiosResponse<{ message: string }>>;
  verifyEmail: (token: string) => Promise<AxiosResponse<{ message: string }>>;
  resendVerification: (email: string) => Promise<AxiosResponse<{ message: string }>>;
}

export const auth: AuthAPI = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
  requestPasswordReset: (email) => axiosInstance.post('/auth/request-reset', { email }),
  resetPassword: (token, password) => axiosInstance.post(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token) => axiosInstance.get(`/auth/verify/${token}`),
  resendVerification: (email) => axiosInstance.post('/auth/resend-verification', { email }),
};

// ========== 💼 Jobs API ==========

interface JobsAPI {
  create: (data: Partial<Job>) => Promise<AxiosResponse<Job>>;
  update: (id: string, data: Partial<Job>) => Promise<AxiosResponse<Job>>;
  delete: (id: string) => Promise<AxiosResponse<{ message: string }>>;
  getAll: () => Promise<AxiosResponse<Job[]>>;
  getById: (id: string) => Promise<AxiosResponse<Job>>;
}

export const jobs: JobsAPI = {
  create: (data) => axiosInstance.post('/jobs', data),
  update: (id, data) => axiosInstance.put(`/jobs/${id}`, data),
  delete: (id) => axiosInstance.delete(`/jobs/${id}`),
  getAll: () => axiosInstance.get('/jobs'),
  getById: (id) => axiosInstance.get(`/jobs/${id}`),
};

// ========== 🧯 Error Helper ==========
// Extract a safe message string from unknown or Axios errors
export const apiErrorHandler = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return 'An unexpected error occurred';
};

// Export the axios instance if needed elsewhere
export default axiosInstance;
