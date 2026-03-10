import api from './api';

// Subscribers service
// Backend expects: email (read-only for admin, created by public)
export const subscribersService = {
    // Get all subscribers
    getAll: async (params = {}) => {
        const response = await api.get('/admin/subscribers', { params });
        return response;
    },

    // Delete subscriber
    delete: async (id) => {
        const response = await api.delete(`/admin/subscribers/${id}`);
        return response;
    },
};
