import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Items API
export const itemsAPI = {
  getAll: () => apiClient.get('/items/available'),

  getById: (id) => apiClient.get(`/items/${id}`),

  // FIXED: correct endpoint + params
  create: (data) =>
    apiClient.post(`/items/report`, data),

  update: (id, data) =>
    apiClient.put(`/items/${id}`, null, {
      params: {
        name: data.name,
        description: data.description,
        location: data.location,
      },
    }),

  delete: (id) => apiClient.delete(`/items/${id}`),

  search: (query) =>
    apiClient.get(`/items/search`, { params: { query } }),
};

// Claims API
export const claimsAPI = {
  getAll: () => apiClient.get('/claims/all'),

  create: (data) =>
  apiClient.post('/claims/submit', data),

  update: (id, data) =>
    apiClient.put(`/claims/${id}`, null, {
      params: {
        proofDescription: data.proofDescription,
      },
    }),

  delete: (id) => apiClient.delete(`/claims/${id}`),

  review: (id, status, moderatorId, reviewNotes) =>
    apiClient.post(`/claims/${id}/review`, null, {
      params: {
        moderatorId: moderatorId,
        status: status,
        reviewNotes: reviewNotes || '',
      },
    }),

  getByItem: (itemId) => apiClient.get(`/claims/item/${itemId}`),
};

// Users API
export const usersAPI = {
  getAll: () => apiClient.get('/users'),

  getById: (id) => apiClient.get(`/users/${id}`),

  create: (data) =>
    apiClient.post('/users/create', null, {
      params: {
        name: data.name,
        email: data.email,
        userType: data.userType,
      },
    }),

  update: (id, data) =>
    apiClient.put(`/users/${id}`, null, {
      params: {
        name: data.name,
        email: data.email,
        userType: data.userType,
      },
    }),

  delete: (id) => apiClient.delete(`/users/${id}`),
};

export default apiClient;
