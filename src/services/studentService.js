import api from './api';
import { getCachedData, setCachedData, appCache } from './cacheManager';

export const studentService = {

    getProfile: async (forceRefresh = false) => {
        const cached = getCachedData('studentProfile');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/students/me');
        setCachedData('studentProfile', response.data.data);
        return response.data.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/students/me', profileData);
        setCachedData('studentProfile', response.data.data);
        return response.data.data;
    },

    getEnrolledClasses: async (forceRefresh = false) => {
        const cached = getCachedData('studentClasses');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/student/dashboard/classes');
        setCachedData('studentClasses', response.data.data);
        return response.data.data;
    },

    unenrollClass: async (courseId) => {
        const response = await api.delete(`/student/dashboard/classes/${courseId}/unenroll`);
        appCache.studentClasses.data = null; // Invalidate cache
        return response.data;
    },

    joinClass: async (joinData) => {
        const response = await api.post('/student/dashboard/classes/join', joinData);
        appCache.studentClasses.data = null; // Invalidate cache
        return response.data.data;
    },

    fileReport: async (reportData) => {
        const response = await api.post('/student/dashboard/classes/report', reportData);
        return response.data;
    },

    getExam: async (examId) => {
        if (!examId || examId === 'undefined' || examId === 'null') {
            throw new Error("Invalid Exam ID passed to service");
        }
        const response = await api.get(`/student/exams/${examId}`);
        return response.data.data;
    },

    submitExam: async (examId, payload) => {
        if (!examId || examId === 'undefined' || examId === 'null') {
            throw new Error("Invalid Exam ID passed to service");
        }
        const response = await api.post(`/student/exams/${examId}/submit`, payload);
        return response.data.data;
    },

    getVaultExams: async (classId) => {
        try {
            if (!classId) throw new Error("Class ID is required");
            const response = await api.get(`/student/exams/vault/${classId}`);
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch vault exams from backend", error);
            throw error;
        }
    },

    getClassPeople: async (classId) => {
        const response = await api.get(`/student/dashboard/classes/${classId}/people`);
        return response.data.data;
    },

    getCalendarExams: async () => {
        const response = await api.get('/student/dashboard/calendar/exams');
        return response.data.data;
    },

    logProctoringEvent: async (examId, eventType, durationSeconds) => {
        const response = await api.post(`/student/exams/${examId}/log-event`, {
            eventType,
            durationSeconds
        });
        return response.data.data;
    },

    generateMockExam: async (config) => {
        const response = await api.post('/mock-exams/generate', config);
        return response.data.data;
    },

    getStudentAnalytics: async (forceRefresh = false) => {
        const cached = getCachedData('studentAnalytics');
        if (!forceRefresh && cached) return cached;

        const response = await api.get('/student/exams/analytics');
        setCachedData('studentAnalytics', response.data.data);
        return response.data.data;
    },
};