import api from '../../utils/api';

export const weddingService = {
  // Create a new wedding
  create: async (weddingData) => {
    const response = await api.post('/weddings', weddingData);
    return response.data;
  },

  // Get all weddings for the current user
  getAll: async () => {
    const response = await api.get('/weddings');
    return response.data;
  },

  // Get a single wedding by ID
  getById: async (id) => {
    const response = await api.get(`/weddings/${id}`);
    return response.data;
  },

  // Update a wedding
  update: async (id, weddingData) => {
    const response = await api.put(`/weddings/${id}`, weddingData);
    return response.data;
  },

  // Delete a wedding
  delete: async (id) => {
    const response = await api.delete(`/weddings/${id}`);
    return response.data;
  },
};