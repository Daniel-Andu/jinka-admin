import api from './api';

// Documents service
// NOTE: Backend has documents table but endpoints need to be added to adminRoutes.js
export const documentService = {
    // Get all documents
    getAll: async (params = {}) => {
        const response = await api.get('/admin/documents', { params });
        return response;
    },

    // Get single document
    getOne: async (id) => {
        const response = await api.get(`/admin/documents/${id}`);
        return response;
    },

    // Create document
    create: async (data) => {
        const response = await api.post('/admin/documents', data);
        return response;
    },

    // Update document
    update: async (id, data) => {
        const response = await api.put(`/admin/documents/${id}`, data);
        return response;
    },

    // Delete document
    delete: async (id) => {
        const response = await api.delete(`/admin/documents/${id}`);
        return response;
    },

    // Get document categories
    getCategories: async () => {
        const response = await api.get('/admin/documents/categories');
        return response;
    },

    // Create document category
    createCategory: async (data) => {
        const response = await api.post('/admin/documents/categories', data);
        return response;
    },
};
