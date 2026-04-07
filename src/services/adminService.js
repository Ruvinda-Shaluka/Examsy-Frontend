import api from './api';
import { getCachedData, setCachedData } from './cacheManager';

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
        const response = await api.post(`/admin/reports/${reportId}/reply-student?message=${encodeURIComponent(message)}`);
        return response.data;
    },

    getProfile: async (forceRefresh = false) => {
        const cached = getCachedData('adminProfile');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/admins/me');
        setCachedData('adminProfile', response.data.data);
        return response.data.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/admins/me', profileData);
        setCachedData('adminProfile', response.data.data);
        return response.data.data;
    },

    getDashboardMetrics: async (forceRefresh = false) => {
        const cached = getCachedData('adminMetrics');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/admin/dashboard/metrics');
        setCachedData('adminMetrics', response.data.data);
        return response.data.data;
    }
};