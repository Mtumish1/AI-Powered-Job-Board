// frontend/src/services/api.ts

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';

// ========== ✅ Type Definitions ==========

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
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

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (import.meta.env.MODE === 'development') {
  axiosInstance.interceptors.request.use((config) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  });
}

// ========== 🔐 Request Interceptor ==========
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
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        logout(); // Use centralized logout
      } else if (status === 403) {
        console.warn('Access denied.');
      } else if (status === 500) {
        console.error('Server error.');
      }
    }
    return Promise.reject(error);
  }
);

// ========== 🧼 Helper to unwrap Axios response ==========
const unwrap = <T>(promise: Promise<AxiosResponse<T>>): Promise<T> =>
  promise.then((res) => res.data);

// ========== 🔐 Auth API ==========

interface AuthAPI {
  register: (data: RegisterData) => Promise<User>;
  login: (data: LoginData) => Promise<AuthResponse>;
  requestPasswordReset: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, password: string) => Promise<{ message: string }>;
  verifyEmail: (token: string) => Promise<{ message: string }>;
  resendVerification: (email: string) => Promise<{ message: string }>;
}

export const auth: AuthAPI = {
  register: (data) => unwrap(axiosInstance.post<User>('/auth/register', data)),
  login: (data) => unwrap(axiosInstance.post<AuthResponse>('/auth/login', data)),
  requestPasswordReset: (email) => unwrap(axiosInstance.post<{ message: string }>('/auth/request-reset', { email })),
  resetPassword: (token, password) =>
    unwrap(axiosInstance.post<{ message: string }>(`/auth/reset-password/${token}`, { password })),
  verifyEmail: (token) => unwrap(axiosInstance.get<{ message: string }>(`/auth/verify/${token}`)),
  resendVerification: (email) =>
    unwrap(axiosInstance.post<{ message: string }>('/auth/resend-verification', { email })),
};

// ========== 💼 Jobs API ==========

interface JobsAPI {
  create: (data: Partial<Job>) => Promise<Job>;
  update: (id: string, data: Partial<Job>) => Promise<Job>;
  delete: (id: string) => Promise<{ message: string }>;
  getAll: () => Promise<Job[]>;
  getById: (id: string) => Promise<Job>;
}

export const jobs: JobsAPI = {
  create: (data) => unwrap(axiosInstance.post<Job>('/jobs', data)),
  update: (id, data) => unwrap(axiosInstance.put<Job>(`/jobs/${id}`, data)),
  delete: (id) => unwrap(axiosInstance.delete<{ message: string }>(`/jobs/${id}`)),
  getAll: () => unwrap(axiosInstance.get<Job[]>('/jobs')),
  getById: (id) => unwrap(axiosInstance.get<Job>(`/jobs/${id}`)),
};

// ========== 👤 User API ==========

interface UserAPI {
  getProfile: () => Promise<User>;
  updateProfile: (data: Partial<User>) => Promise<User>;
}

export const users: UserAPI = {
  getProfile: () => unwrap(axiosInstance.get<User>('/users/profile')),
  updateProfile: (data) => unwrap(axiosInstance.put<User>('/users/profile', data)),
};

// ========== 🚪 Logout helper ==========

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// ========== 🧯 Error Helper ==========

export const apiErrorHandler = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return 'An unexpected error occurred';
};

// ========== 🌐 Export axios instance ==========

export default axiosInstance;
