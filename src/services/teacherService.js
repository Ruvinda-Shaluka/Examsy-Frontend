import api from './api';

export const teacherService = {
    getProfile: async () => {
        const response = await api.get('/teachers/me');
        return response.data.data; // Assumes your APIResponse puts the teacher in the "data" field
    },
    updateProfile: async (profileData) => {
        const response = await api.put('/teachers/me', profileData);
        return response.data.data;
    },

    // Add these inside your existing teacherService object
    getClasses: async () => {
        const response = await api.get('/teacher/dashboard/classes');
        return response.data.data;
    },

    createClass: async (classData) => {
        const response = await api.post('/teacher/dashboard/classes', classData);
        return response.data.data;
    },

    deleteClass: async (classId) => {
        const response = await api.delete(`/teacher/dashboard/classes/${classId}`);
        return response.data;
    },

    publishExam: async (examPayload) => {
        const response = await api.post('/teacher/exams/publish', examPayload);
        return response.data;
    },

    getClassStream: async (classId) => {
        const response = await api.get(`/teacher/classes/${classId}/stream`);
        return response.data.data;
    },

    postAnnouncement: async (classId, content) => {
        const response = await api.post(`/teacher/classes/${classId}/announcements`, { content });
        return response.data.data;
    },

    updateAnnouncement: async (classId, announcementId, content) => {
        const response = await api.put(`/teacher/classes/${classId}/announcements/${announcementId}`, { content });
        return response.data.data;
    },

    deleteAnnouncement: async (classId, announcementId) => {
        const response = await api.delete(`/teacher/classes/${classId}/announcements/${announcementId}`);
        return response.data;
    },

    updateClassAppearance: async (classId, appearanceData) => {
        const response = await api.put(`/teacher/classes/${classId}/appearance`, appearanceData);
        return response.data;
    },

    getClassExams: async (classId) => {
        const response = await api.get(`/teacher/exams/class/${classId}`);
        return response.data.data;
    },

    deleteExam: async (examId) => {
        const response = await api.delete(`/teacher/exams/${examId}`);
        return response.data;
    }
}