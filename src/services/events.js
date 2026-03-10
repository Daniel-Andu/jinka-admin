import api from './api';

// Events service
// NOTE: Backend doesn't have events table - needs to be added
export const eventService = {
    // Get all events
    getAll: async (params = {}) => {
        const response = await api.get('/admin/events', { params });
        return response;
    },

    // Get single event
    getOne: async (id) => {
        const response = await api.get(`/admin/events/${id}`);
        return response;
    },

    // Create event
    create: async (data) => {
        const response = await api.post('/admin/events', data);
        return response;
    },

    // Update event
    update: async (id, data) => {
        const response = await api.put(`/admin/events/${id}`, data);
        return response;
    },

    // Delete event
    delete: async (id) => {
        const response = await api.delete(`/admin/events/${id}`);
        return response;
    },

    // Get events by date range
    getByDateRange: async (startDate, endDate) => {
        const response = await api.get('/admin/events/range', {
            params: { startDate, endDate },
        });
        return response;
    },
};
