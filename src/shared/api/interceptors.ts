import axios from 'axios';

export const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'http://localhost:3001',
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post('/auth/refresh');
        localStorage.setItem('token', res.data.accessToken);
        return $api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
