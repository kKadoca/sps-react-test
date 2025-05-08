import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (!token) window.location.href = '/login';
  
  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});

export default api;