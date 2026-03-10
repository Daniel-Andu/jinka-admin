import api from './api';

// Messages service (Contact Messages in backend)
export const messageService = {
    // Get all contact messages
    getAll: async (params = {}) => {
        const response = await api.get('/admin/contacts', { params });
        return response;
    },

    // Delete contact message
    delete: async (id) => {
        const response = await api.delete(`/admin/contacts/${id}`);
        return response;
    },
};
