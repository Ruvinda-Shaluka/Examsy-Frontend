import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Accept an "allowedRole" requirement (e.g., "STUDENT" or "TEACHER")
const ProtectedRoute = ({ allowedRole }) => {
    // Read the memory bank
    const token = localStorage.getItem('examsy_token');
    const userRole = localStorage.getItem('examsy_role');

    // 1. KICK OUT: If they have no token at all, send to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. KICK OUT: If this route requires a specific role, and they don't match
    if (allowedRole && userRole !== allowedRole) {

        // Redirect them back to their own correct dashboard
        if (userRole === 'TEACHER') {
            return <Navigate to="/teacher/dashboard" replace />;
        }
        if (userRole === 'STUDENT') {
            return <Navigate to="/student/dashboard" replace />;
        }

        // Fallback just in case
        return <Navigate to="/login" replace />;
    }

    // 3. ALLOW IN: They have a token AND they have the right role!
    return <Outlet />;
};

export default ProtectedRoute;