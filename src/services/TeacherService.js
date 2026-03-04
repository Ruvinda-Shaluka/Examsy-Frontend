import api from './api';

export const teacherService = {
    getProfile: async () => {
        const response = await api.get('/teachers/me');
        return response.data.data; // Assumes your APIResponse puts the teacher in the "data" field
    },
    updateProfile: async (profileData) => {
        const response = await api.put('/teachers/me', profileData);
        return response.data.data;
    }
}