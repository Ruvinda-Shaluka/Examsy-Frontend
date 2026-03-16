import api from './api';

export const studentService = {

    getProfile: async () => {
        const response = await api.get('/students/me');
        return response.data.data; // Assumes your APIResponse puts the student in the "data" field
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/students/me', profileData);
        return response.data.data;
    },

    getEnrolledClasses: async () => {
        const response = await api.get('/student/dashboard/classes');
        return response.data.data;
    },

    unenrollClass: async (courseId) => {
        const response = await api.delete(`/student/dashboard/classes/${courseId}/unenroll`);
        return response.data;
    },

    joinClass: async (joinData) => {
        // joinData is simply { inviteLink: "https://examsy.com/join/5/CODE" }
        const response = await api.post('/student/dashboard/classes/join', joinData);
        // Return the nested DTO so your dashboard can immediately add it to the state!
        return response.data.data;
    },

    fileReport: async (reportData) => {
        const response = await api.post('/student/dashboard/classes/report', reportData);
        return response.data;
    },

    getExam: async (examId) => {
        // 🟢 SAFETY NET: Prevent bad API calls
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
};