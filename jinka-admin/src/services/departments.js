import api from './api';

// Department service
export const departmentService = {
    // Get all departments
    getAll: async (params = {}) => {
        const response = await api.get('/departments', { params });
        return response;
    },

    // Get single department
    getOne: async (id) => {
        const response = await api.get(`/departments/${id}`);
        return response;
    },

    // Create department
    create: async (data) => {
        const response = await api.post('/departments', data);
        return response;
    },

    // Update department
    update: async (id, data) => {
        const response = await api.put(`/departments/${id}`, data);
        return response;
    },

    // Delete department
    delete: async (id) => {
        const response = await api.delete(`/departments/${id}`);
        return response;
    },
};
