import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme.jsx';

// Public Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterStudent from './pages/student/RegisterStudent.jsx';
import RegisterTeacher from './pages/teacher/RegisterTeacher.jsx';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx';
import TeacherCalendar from './pages/teacher/TeacherCalendar.jsx';
import TeacherSettings from './pages/teacher/TeacherSettings.jsx';
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
    return (
        <ThemeProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register-student" element={<RegisterStudent />} />
                <Route path="/register-teacher" element={<RegisterTeacher />} />

                {/* --- TEACHER DASHBOARD ROUTES --- */}
                {/* You enter http://localhost:5173/teacher/dashboard to see the home grid */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

                {/* You enter http://localhost:5173/teacher/calendar to see the exam scheduler */}
                <Route path="/teacher/calendar" element={<TeacherCalendar />} />

                {/* You enter http://localhost:5173/teacher/settings to see the profile management */}
                <Route path="/teacher/settings" element={<TeacherSettings />} />

                {/* Optional: Add a 404 handler if you haven't yet */}
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;