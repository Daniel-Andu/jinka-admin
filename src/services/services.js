import api from './api';

// Services service (city services, not to be confused with API services)
// Backend expects: title, description, icon, link, is_active
export const servicesService = {
    // Get all services
    getAll: async (params = {}) => {
        const response = await api.get('/admin/services', { params });
        return response;
    },

    // Get single service
    getById: async (id) => {
        const response = await api.get(`/admin/services/${id}`);
        return response;
    },

    // Create service
    create: async (data) => {
        const response = await api.post('/admin/services', data);
        return response;
    },

    // Update service
    update: async (id, data) => {
        const response = await api.put(`/admin/services/${id}`, data);
        return response;
    },

    // Delete service
    delete: async (id) => {
        const response = await api.delete(`/admin/services/${id}`);
        return response;
    },
};
