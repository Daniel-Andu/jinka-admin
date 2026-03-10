import api from './api';

// Announcements service
// Backend has both 'news' and 'announcements' tables
// Using 'news' for main announcements, 'announcements' table for quick notices
export const announcementService = {
    // Get all news/announcements
    getAll: async (params = {}) => {
        const response = await api.get('/admin/news', { params });
        return response;
    },

    // Get single announcement
    getOne: async (id) => {
        const response = await api.get(`/admin/news/${id}`);
        return response;
    },

    // Create announcement
    create: async (data) => {
        const response = await api.post('/admin/news', data);
        return response;
    },

    // Update announcement
    update: async (id, data) => {
        const response = await api.put(`/admin/news/${id}`, data);
        return response;
    },

    // Delete announcement
    delete: async (id) => {
        const response = await api.delete(`/admin/news/${id}`);
        return response;
    },
};
