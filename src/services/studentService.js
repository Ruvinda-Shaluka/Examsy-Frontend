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
        const response = await api.post('/student/dashboard/classes/join', joinData);
        return response.data.data;
    },

    fileReport: async (reportData) => {
        const response = await api.post('/student/dashboard/classes/report', reportData);
        return response.data;
    }
};