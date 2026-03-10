import api from './api';

// Report service
// NOTE: These endpoints need to be added to the backend
export const reportService = {
    // Get dashboard statistics
    getStatistics: async (period = 'month') => {
        const response = await api.get('/admin/reports/statistics', {
            params: { period },
        });
        return response;
    },

    // Get department performance (system-calculated)
    getDepartmentPerformance: async () => {
        const response = await api.get('/admin/reports/department-performance');
        return response;
    },

    // Get recent activities
    getActivities: async (limit = 10) => {
        const response = await api.get('/admin/reports/activities', {
            params: { limit },
        });
        return response;
    },

    // Export report
    exportReport: async (type, format = 'pdf') => {
        const response = await api.get(`/admin/reports/export/${type}`, {
            params: { format },
            responseType: 'blob',
        });
        return response;
    },
};
