import api from './api'; // Import the base station we just made

export const authService = {

    // TASK 1: LOG IN
    login: async (username, password) => {
        // Send a POST request to http://localhost:8080/api/v1/auth/signin
        const response = await api.post('/auth/signin', {
            username: username,
            password: password
        });

        // If Spring Boot says "OK" and gives us a token, save it in the browser!
        if (response.data && response.data.data.accessToken) {
            localStorage.setItem('examsy_token', response.data.data.accessToken);
        }

        return response.data;
    },

    // TASK 2: REGISTER A STUDENT
    registerStudent: async (studentData) => {
        // Package the data exactly how Spring Boot's StudentRegisterDTO expects it
        const payload = {
            fullName: studentData.fullName,
            email: studentData.email,
            username: studentData.username,
            password: studentData.password,
            studentIdentificationNumber: studentData.indexNumber,
            dateOfBirth: studentData.dateOfBirth,
            gender: studentData.gender,
            grade: studentData.grade
        };

        // Send it to the backend
        const response = await api.post('/auth/signup/student', payload);
        return response.data;
    }
};