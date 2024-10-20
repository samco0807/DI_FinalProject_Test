// frontend/src/services/api.ts
import axios from 'axios';
import store from '../store/store';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Ajouter un intercepteur pour inclure le token dans les requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      toast.error('Your session has expired. Please reconnect.');
    }
    return Promise.reject(error);
  }
);

export default api;