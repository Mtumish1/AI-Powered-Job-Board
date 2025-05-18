import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config as InternalAxiosRequestConfig;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: unknown) => {
    if (error instanceof Error && (error as any).response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface AuthAPI {
  register: (data: any) => Promise<AxiosResponse<any>>;
  login: (data: any) => Promise<AxiosResponse<any>>;
  requestPasswordReset: (email: string) => Promise<AxiosResponse<any>>;
  resetPassword: (token: string, password: string) => Promise<AxiosResponse<any>>;
}

interface JobsAPI {
  create: (data: any) => Promise<AxiosResponse<any>>;
  update: (id: string, data: any) => Promise<AxiosResponse<any>>;
  delete: (id: string) => Promise<AxiosResponse<any>>;
  getAll: () => Promise<AxiosResponse<any>>;
  getById: (id: string) => Promise<AxiosResponse<any>>;
}

export const auth: AuthAPI = {
  register: (data: any) => axiosInstance.post('/auth/register', data),
  login: (data: any) => axiosInstance.post('/auth/login', data),
  requestPasswordReset: (email: string) => axiosInstance.post('/auth/request-reset', { email }),
  resetPassword: (token: string, password: string) =>
    axiosInstance.post(`/auth/reset-password/${token}`, { password }),
};

export const jobs: JobsAPI = {
  create: (data: any) => axiosInstance.post('/jobs', data),
  update: (id: string, data: any) => axiosInstance.put(`/jobs/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/jobs/${id}`),
  getAll: () => axiosInstance.get('/jobs'),
  getById: (id: string) => axiosInstance.get(`/jobs/${id}`),
};

export default axiosInstance;
