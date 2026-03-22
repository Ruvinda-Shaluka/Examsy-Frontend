import api from './api'; // Import the base station we just made

export const authService = {

    // TASK 1: LOG IN
    login: async (identifier, password) => {
        // Send a POST request to http://localhost:8080/api/v1/auth/signin
        const response = await api.post('/auth/sign-in', {
            username: identifier, password: password
        });

        // If Spring Boot says "OK" and gives us a token, save it in the browser!
        if (response.data && response.data.data.accessToken) {
            localStorage.setItem('examsy_token', response.data.data.accessToken);
            localStorage.setItem('examsy_role', response.data.data.role);
        }

        return response.data;
    },

    loginWithGoogle: async (googleToken, requestedRole) => {
        const response = await api.post('/auth/google', {
            token: googleToken,
            role: requestedRole
        });

        const data = response.data.data;
        if (data.token) {
            localStorage.setItem('examsy_token', data.token);
            localStorage.setItem('examsy_role', data.role);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('examsy_token');
        localStorage.removeItem('examsy_role');
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
    },

    // TASK 3: REGISTER A TEACHER (Add this missing block!)
    registerTeacher: async (teacherData) => {
        const payload = {
            fullName: teacherData.fullName,
            email: teacherData.workEmail, // Maps 'workEmail' from the UI to 'email' in the DB
            username: teacherData.username,
            password: teacherData.password,
            instructorId: teacherData.instructorId,
            specialization: teacherData.specialization
        };
        const response = await api.post('/auth/signup/teacher', payload);
        return response.data;
    },

    sendPasswordResetCode: async (email) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },
    verifyResetCode: async (email, code) => {
        const response = await api.post('/auth/verify-code', { email, code });
        return response.data;
    },
    resetPassword: async (email, code, newPassword) => {
        const response = await api.post('/auth/reset-password', { email, code, newPassword });
        return response.data;
    },
};