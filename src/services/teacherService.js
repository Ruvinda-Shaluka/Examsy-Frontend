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
    }
}