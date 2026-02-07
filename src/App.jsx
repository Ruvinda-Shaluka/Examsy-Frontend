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
// NEW: Import the Teaching Page
import TeacherTeaching from './pages/teacher/TeacherTeaching.jsx';

import NotFoundPage from "./pages/NotFoundPage.jsx";
import TeacherGrading from "./pages/teacher/TeacherGrading.jsx";
import TeacherOngoing from "./pages/teacher/ongoing-exams/TeacherOngoing.jsx";
import TeacherLiveMonitor from "./pages/teacher/ongoing-exams/TeacherLiveMonitor.jsx";

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
                {/* Home grid view */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

                {/* Exam scheduler and calendar */}
                <Route path="/teacher/calendar" element={<TeacherCalendar />} />

                {/* Profile and notification management */}
                <Route path="/teacher/settings" element={<TeacherSettings />} />

                {/* NEW: Exam creation and classroom management */}
                {/* Access via: http://localhost:5173/teacher/teaching */}
                <Route path="/teacher/manage-exams" element={<TeacherTeaching />} />

                {/*Overview of ongoing-exams examination*/}
                <Route path="/teacher/ongoing-exams" element={<TeacherOngoing />} />

                {/*To track student live*/}
                <Route path="/teacher/live-monitor/:examId" element={<TeacherLiveMonitor />} />


                {/*Grading page using gemini api*/}
                <Route path="/teacher/grading" element={<TeacherGrading />} />

                {/* 404 handler (Must remain the last route) */}
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;