import api from './api';

export const studentService = {
    getProfile: async () => {
        const response = await api.get('/students/me');
        return response.data.data; // Assumes your APIResponse puts the student in the "data" field
    },
    updateProfile: async (profileData) => {
        const response = await api.put('/students/me', profileData);
        return response.data.data;
    }
};