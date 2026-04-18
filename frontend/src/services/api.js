import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Items API
export const itemsAPI = {
  getAll: () => apiClient.get('/items'),
  getById: (id) => apiClient.get(`/items/${id}`),
  create: (data) => apiClient.post('/items', data),
  update: (id, data) => apiClient.put(`/items/${id}`, data),
  delete: (id) => apiClient.delete(`/items/${id}`),
  search: (query) => apiClient.get(`/items/search`, { params: { q: query } }),
};

// Claims API
export const claimsAPI = {
  getAll: () => apiClient.get('/claims'),
  getById: (id) => apiClient.get(`/claims/${id}`),
  create: (data) => apiClient.post('/claims', data),
  update: (id, data) => apiClient.put(`/claims/${id}`, data),
  delete: (id) => apiClient.delete(`/claims/${id}`),
  approveClaim: (id) => apiClient.put(`/claims/${id}/approve`),
  rejectClaim: (id) => apiClient.put(`/claims/${id}/reject`),
};

// Users API
export const usersAPI = {
  getAll: () => apiClient.get('/users'),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (data) => apiClient.post('/users', data),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
  getProfile: () => apiClient.get('/users/profile'),
};

export default apiClient;
