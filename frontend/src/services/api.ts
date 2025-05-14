import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  requestPasswordReset: (email: string) => api.post('/auth/request-reset', { email }),
  resetPassword: (token: string, password: string) => 
    api.post(`/auth/reset-password/${token}`, { password }),
};

export const jobs = {
  create: (data: any) => api.post('/jobs', data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
  getAll: () => api.get('/jobs'),
  getById: (id: string) => api.get(`/jobs/${id}`),
};

export default api;