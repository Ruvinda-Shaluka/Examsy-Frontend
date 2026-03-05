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

    // Add this to your existing studentService object
    getEnrolledClasses: async () => {
        const response = await api.get('/student/dashboard/classes');
        return response.data.data;
    },

    unenrollClass: async (courseId) => {
        const response = await api.delete(`/student/dashboard/classes/${courseId}/unenroll`);
        return response.data;
    }
};