import api from './api'; // Import the base station we just made

export const authService = {

    // TASK 1: LOG IN
    login: async (username, password) => {
        // Send a POST request to http://localhost:8080/api/v1/auth/signin
        const response = await api.post('/auth/signin', {
            username: username, password: password
        });

        // If Spring Boot says "OK" and gives us a token, save it in the browser!
        if (response.data && response.data.data.accessToken) {
            localStorage.setItem('examsy_token', response.data.data.accessToken);
            localStorage.setItem('examsy_role', response.data.data.role);
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
    }
};