import api from './api';

// File upload service
export const uploadService = {
    // Upload file
    upload: async (file, folder = 'general') => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await api.post('/admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },

    // Upload multiple files
    uploadMultiple: async (files, folder = 'general') => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });
        formData.append('folder', folder);

        const response = await api.post('/admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    },
};
