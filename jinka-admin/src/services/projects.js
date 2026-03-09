import api from './api';

// Project service
export const projectService = {
    // Get all projects
    getAll: async (params = {}) => {
        const response = await api.get('/projects', { params });
        return response;
    },

    // Get single project
    getOne: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response;
    },

    // Create project
    create: async (data) => {
        const response = await api.post('/projects', data);
        return response;
    },

    // Update project
    update: async (id, data) => {
        const response = await api.put(`/projects/${id}`, data);
        return response;
    },

    // Update project progress
    updateProgress: async (id, progress, status) => {
        const response = await api.patch(`/projects/${id}/progress`, {
            progress,
            status,
        });
        return response;
    },

    // Delete project
    delete: async (id) => {
        const response = await api.delete(`/projects/${id}`);
        return response;
    },
};
