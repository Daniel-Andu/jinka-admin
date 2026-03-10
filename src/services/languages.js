import api from './api';

// Languages service
// Backend expects: code, name, is_default, is_active
export const languagesService = {
    // Get all languages
    getAll: async (params = {}) => {
        const response = await api.get('/admin/languages', { params });
        return response;
    },

    // Create language
    create: async (data) => {
        const response = await api.post('/admin/languages', data);
        return response;
    },

    // Update language
    update: async (id, data) => {
        const response = await api.put(`/admin/languages/${id}`, data);
        return response;
    },

    // Delete language
    delete: async (id) => {
        const response = await api.delete(`/admin/languages/${id}`);
        return response;
    },
};
