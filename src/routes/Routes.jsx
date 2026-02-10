import React from 'react';
import {Route, Routes} from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterStudent from "../pages/student/RegisterStudent.jsx";
import RegisterTeacher from "../pages/teacher/RegisterTeacher.jsx";
import TeacherDashboard from "../pages/teacher/TeacherDashboard.jsx";
import TeacherCalendar from "../pages/teacher/TeacherCalendar.jsx";
import TeacherSettings from "../pages/teacher/TeacherSettings.jsx";
import TeacherTeaching from "../pages/teacher/TeacherTeaching.jsx";
import TeacherOngoing from "../pages/teacher/ongoing-exams/TeacherOngoing.jsx";
import TeacherLiveMonitor from "../pages/teacher/ongoing-exams/TeacherLiveMonitor.jsx";
import TeacherGrading from "../pages/teacher/TeacherGrading.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ClassDetailPage from "../pages/teacher/ClassDetailPage.jsx";

// --- NEW STUDENT IMPORTS ---
import StudentDashboard from "../pages/student/StudentDashboard.jsx";
import AcademicVault from "../pages/student/AcademicVault.jsx";
import StudentCalendar from "../pages/student/StudentCalendar.jsx";
import StudentSettings from "../pages/student/StudentSettings.jsx";
import ExamInterface from "../pages/student/ExamInterface.jsx";
import StudentLayout from "../layouts/StudentLayout.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/register-teacher" element={<RegisterTeacher />} />

            {/* --- TEACHER DASHBOARD ROUTES --- */}
            {/* Home grid view */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

            {/* NEW: Dynamic Route for Specific Class Management */}
            {/* This captures the ID from TeacherClassCard and opens the classroom view */}
            <Route path="/teacher/class/:classId" element={<ClassDetailPage />} />

            {/* Exam scheduler and calendar */}
            <Route path="/teacher/calendar" element={<TeacherCalendar />} />

            {/* Profile and notification management */}
            <Route path="/teacher/settings" element={<TeacherSettings />} />

            {/* NEW: Exam creation and classroom management */}
            <Route path="/teacher/manage-exams" element={<TeacherTeaching />} />

            {/*Overview of ongoing-exams examination*/}
            <Route path="/teacher/ongoing-exams" element={<TeacherOngoing />} />

            {/*To track student live*/}
            <Route path="/teacher/live-monitor/:examId" element={<TeacherLiveMonitor />} />

            {/*Grading page using gemini api*/}
            <Route path="/teacher/grading" element={<TeacherGrading />} />

            {/* --- STUDENT DASHBOARD ROUTES --- */}

            {/* Main Student Hub */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />

            {/* List of available and past exams */}
            <Route path="/student/exams" element={<AcademicVault />} />

            {/* Academic schedule */}
            <Route path="/student/calendar" element={<StudentCalendar />} />

            {/* Profile and security management */}
            <Route path="/student/settings" element={<StudentSettings />} />

            {/* Full-screen Exam Mode (Standalone Route) */}
            <Route path="/student/exam/:examId" element={<ExamInterface />} />

            {/* 404 handler (Must remain the last route) */}
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    );
};

export default AppRoutes;