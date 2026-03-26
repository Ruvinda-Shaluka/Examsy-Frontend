import api from './api';

export const adminService = {
    getReports: async () => {
        const response = await api.get('/admin/reports');
        return response.data.data;
    },

    terminateClass: async (reportId) => {
        const response = await api.delete(`/admin/reports/${reportId}/terminate-class`);
        return response.data;
    },

    terminateTeacher: async (reportId) => {
        const response = await api.delete(`/admin/reports/${reportId}/terminate-teacher`);
        return response.data;
    },

    dismissReport: async (reportId) => {
        const response = await api.put(`/admin/reports/${reportId}/dismiss`);
        return response.data;
    },

    warnTeacher: async (reportId) => {
        const response = await api.post(`/admin/reports/${reportId}/warn-teacher`);
        return response.data;
    },

    replyToStudent: async (reportId, message) => {
        // Send the message as a query parameter
        const response = await api.post(`/admin/reports/${reportId}/reply-student?message=${encodeURIComponent(message)}`);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/admins/me');
        return response.data.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/admins/me', profileData);
        return response.data.data;
    },

    getDashboardMetrics: async () => {
        const response = await api.get('/admin/dashboard/metrics');
        return response.data.data;
    }
};