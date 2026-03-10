import api from './api';

// Project service
// NOTE: Backend has projects table but endpoints need to be added to adminRoutes.js
export const projectService = {
    // Get all projects
    getAll: async (params = {}) => {
        const response = await api.get('/admin/projects', { params });
        return response;
    },

    // Get single project
    getOne: async (id) => {
        const response = await api.get(`/admin/projects/${id}`);
        return response;
    },

    // Create project
    create: async (data) => {
        const response = await api.post('/admin/projects', data);
        return response;
    },

    // Update project
    update: async (id, data) => {
        const response = await api.put(`/admin/projects/${id}`, data);
        return response;
    },

    // Update project progress
    updateProgress: async (id, progress, status) => {
        const response = await api.patch(`/admin/projects/${id}/progress`, {
            progress,
            status,
        });
        return response;
    },

    // Delete project
    delete: async (id) => {
        const response = await api.delete(`/admin/projects/${id}`);
        return response;
    },
};
