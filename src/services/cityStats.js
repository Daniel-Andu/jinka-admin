import api from './api';

// City Stats service
// Backend expects: stat_key, value, icon, order_number, is_active
export const cityStatsService = {
    // Get all city stats
    getAll: async (params = {}) => {
        const response = await api.get('/admin/city-stats', { params });
        return response;
    },

    // Get single city stat
    getById: async (id) => {
        const response = await api.get(`/admin/city-stats/${id}`);
        return response;
    },

    // Create city stat
    create: async (data) => {
        const response = await api.post('/admin/city-stats', data);
        return response;
    },

    // Update city stat
    update: async (id, data) => {
        const response = await api.put(`/admin/city-stats/${id}`, data);
        return response;
    },

    // Delete city stat
    delete: async (id) => {
        const response = await api.delete(`/admin/city-stats/${id}`);
        return response;
    },
};
