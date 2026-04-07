import api from './api';
import { getCachedData, setCachedData, appCache } from './cacheManager';

export const teacherService = {

    getProfile: async (forceRefresh = false) => {
        const cached = getCachedData('teacherProfile');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/teachers/me');
        setCachedData('teacherProfile', response.data.data);
        return response.data.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/teachers/me', profileData);
        setCachedData('teacherProfile', response.data.data);
        return response.data.data;
    },

    getClasses: async (forceRefresh = false) => {
        const cached = getCachedData('teacherClasses');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/teacher/dashboard/classes');
        setCachedData('teacherClasses', response.data.data);
        return response.data.data;
    },

    createClass: async (classData) => {
        const response = await api.post('/teacher/dashboard/classes', classData);
        appCache.teacherClasses.data = null; // Invalidate cache
        return response.data.data;
    },

    deleteClass: async (classId) => {
        const response = await api.delete(`/teacher/dashboard/classes/${classId}`);
        appCache.teacherClasses.data = null; // Invalidate cache
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
    },

    updateExamTiming: async (examId, timingData) => {
        const response = await api.put(`/teacher/exams/${examId}/timing`, timingData);
        return response.data;
    },

    rotateClassCodes: async () => {
        const response = await api.post('/teacher/dashboard/rotate-codes');
        return response.data;
    },

    getClassPeople: async (classId) => {
        const response = await api.get(`/teacher/classes/${classId}/people`);
        return response.data.data;
    },

    removeStudent: async (classId, studentId) => {
        const response = await api.delete(`/teacher/classes/${classId}/students/${studentId}`);
        return response.data;
    },

    inviteStudent: async (classId, email) => {
        const response = await api.post(`/teacher/classes/${classId}/invite`, { email });
        return response.data;
    },

    getCalendarExams: async () => {
        const response = await api.get('/teacher/dashboard/calendar/exams');
        return response.data.data;
    },

    getPendingRequests: async (classId) => {
        const response = await api.get(`/teacher/classes/${classId}/requests`);
        return response.data.data;
    },

    approveRequest: async (requestId) => {
        const response = await api.post(`/teacher/classes/requests/${requestId}/approve`);
        return response.data;
    },

    rejectRequest: async (requestId) => {
        const response = await api.post(`/teacher/classes/requests/${requestId}/reject`);
        return response.data;
    },

    getOngoingExams: async () => {
        const response = await api.get('/teacher/exams/ongoing');
        return response.data.data;
    },

    getLiveMonitorData: async (examId) => {
        const response = await api.get(`/teacher/exams/${examId}/monitor`);
        return response.data.data;
    },

    broadcastToExam: async (examId, message) => {
        const response = await api.post(`/teacher/exams/${examId}/broadcast`, { message });
        return response.data;
    },

    warnStudent: async (examId, studentId, message) => {
        const response = await api.post(`/teacher/exams/${examId}/warn/${studentId}`, { message });
        return response.data;
    },

    autoGradeSubmission: async (examId, submissionId) => {
        const response = await api.post(`/teacher/exams/${examId}/grade/${submissionId}/auto`);
        return response.data;
    },

    getPendingGradings: async () => {
        const response = await api.get(`/teacher/exams/pending-gradings`);
        return response.data;
    },

    approveAndReleaseGrade: async (examId, submissionId, score, aiScore, comments) => {
        const response = await api.post(`/teacher/exams/${examId}/grade/${submissionId}/approve?score=${score}`, {
            aiScore: aiScore,
            comments: comments
        });
        return response.data;
    },

    triggerUpcomingReminders: async () => {
        const response = await api.post('/teacher/exams/trigger-reminders');
        return response.data;
    },

    getExamAnalytics: async (examId) => {
        const response = await api.get(`/teacher/exams/${examId}/analytics`);
        return response.data.data;
    },
};