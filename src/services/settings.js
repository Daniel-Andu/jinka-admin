import api from './api';

// Settings service
export const settingsService = {
    // Get all settings
    getAll: async () => {
        const response = await api.get('/admin/settings');
        return response;
    },

    // Update settings
    update: async (data) => {
        const response = await api.put('/admin/settings', data);
        return response;
    },
};

// Languages service
export const languageService = {
    // Get all languages
    getAll: async () => {
        const response = await api.get('/admin/languages');
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
