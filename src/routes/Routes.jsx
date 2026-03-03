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
import TeacherClassDetailPage from "../pages/teacher/TeacherClassDetailPage.jsx";
import StudentDashboard from "../pages/student/StudentDashboard.jsx";
import AcademicVault from "../pages/student/AcademicVault.jsx";
import StudentCalendar from "../pages/student/StudentCalendar.jsx";
import StudentSettings from "../pages/student/StudentSettings.jsx";
import ExamInterface from "../pages/student/ExamInterface.jsx";
import StudentClassDetailPage from "../pages/student/StudentClassDetailPage.jsx";
import MockExams from "../pages/student/MockExams.jsx";
import AdminPortalPage from "../pages/admin/AdminPortalPage.jsx";
import AdminSettings from "../pages/admin/AdminSettings.jsx";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register-student" element={<RegisterStudent/>}/>
            <Route path="/register-teacher" element={<RegisterTeacher/>}/>


            {/* --- TEACHER DASHBOARD ROUTES --- */}
            <Route element={<ProtectedRoute allowedRole="TEACHER"/>}>
                <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
                {/* Dynamic Route for Specific Class Management (Teacher) */}
                <Route path="/teacher/class/:classId" element={<TeacherClassDetailPage/>}/>
                <Route path="/teacher/calendar" element={<TeacherCalendar/>}/>
                <Route path="/teacher/settings" element={<TeacherSettings/>}/>
                <Route path="/teacher/manage-exams" element={<TeacherTeaching/>}/>
                <Route path="/teacher/ongoing-exams" element={<TeacherOngoing/>}/>
                <Route path="/teacher/live-monitor/:examId" element={<TeacherLiveMonitor/>}/>
                <Route path="/teacher/grading" element={<TeacherGrading/>}/>
            </Route>


            {/* --- STUDENT DASHBOARD ROUTES --- */}
            {/* Main grid view of joined classes */}
            <Route element={<ProtectedRoute allowedRole="STUDENT"/>}>
                <Route path="/student/dashboard" element={<StudentDashboard/>}/>
                {/* NEW: Dynamic Route for Specific Class Hub (Student) */}
                {/* This connects your StudentClassCard to the StudentClassDetailPage */}
                <Route path="/student/class/:classId" element={<StudentClassDetailPage/>}/>
                <Route path="/student/exams" element={<AcademicVault/>}/>
                <Route path="/student/calendar" element={<StudentCalendar/>}/>
                <Route path="/student/settings" element={<StudentSettings/>}/>
                {/* Full-screen Exam Mode */}
                <Route path="/student/exam/:examId" element={<ExamInterface/>}/>
                {/*Mock exam path*/}
                <Route path="/student/mock-exams" element={<MockExams/>}/>
            </Route>


            {/*Admin Routing*/}
            <Route element={<ProtectedRoute allowedRole="ADMIN"/>}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>
                <Route path="/admin/reports" element={<AdminPortalPage/>}/>
                <Route path="/admin/settings" element={<AdminSettings/>}/>
            </Route>


            {/* --- 404 handler --- */}
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRoutes;