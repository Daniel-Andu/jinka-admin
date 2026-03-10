import api from './api';

// Hero Sliders service
// Backend expects: title, subtitle, button_text, button_link, image, is_active
export const heroSliderService = {
    // Get all hero sliders
    getAll: async (params = {}) => {
        const response = await api.get('/admin/hero-sliders', { params });
        return response;
    },

    // Get single hero slider
    getById: async (id) => {
        const response = await api.get(`/admin/hero-sliders/${id}`);
        return response;
    },

    // Create hero slider
    create: async (data) => {
        const response = await api.post('/admin/hero-sliders', data);
        return response.success ? response : { success: true, data: response };
    },

    // Update hero slider
    update: async (id, data) => {
        const response = await api.put(`/admin/hero-sliders/${id}`, data);
        return response.success ? response : { success: true, data: response };
    },

    // Delete hero slider
    delete: async (id) => {
        const response = await api.delete(`/admin/hero-sliders/${id}`);
        return response;
    },
};
