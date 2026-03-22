import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 1. Grab the query parameters from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const role = params.get('role');
        const error = params.get('error');

        // 2. If the backend sent an error (e.g., user not found), send them to login
        if (error) {
            navigate('/login');
            return;
        }

        // 3. If we got the token and role, save them and redirect!
        if (token && role) {
            // Save to localStorage just like a normal login
            localStorage.setItem('examsy_token', token);
            localStorage.setItem('examsy_role', role);

            // Force a hard redirect so React state and API headers reset
            if (role === 'ADMIN') {
                window.location.href = '/admin/dashboard';
            } else if (role === 'TEACHER') {
                window.location.href = '/teacher/dashboard';
            } else {
                window.location.href = '/student/dashboard';
            }
        } else {
            // Fallback if the URL was missing the token
            navigate('/login');
        }
    }, [location, navigate]);

    // Display a simple loading screen while it processes the URL
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-examsy-bg transition-colors duration-500">
            <div className="w-12 h-12 border-4 border-examsy-primary/20 border-t-examsy-primary rounded-full animate-spin mb-4"></div>
            <h2 className="text-2xl font-black text-examsy-text tracking-tight">Authenticating...</h2>
            <p className="text-sm font-bold text-examsy-muted mt-2">Securing your session.</p>
        </div>
    );
};

export default OAuth2RedirectHandler;