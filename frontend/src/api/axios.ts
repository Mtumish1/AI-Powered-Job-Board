import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Match backend server
  withCredentials: true, // if backend sends cookies (optional)
});

export default axiosInstance;
