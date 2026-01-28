import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx'; // Imported your new login page
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';

function App() {
    return (
        <ThemeProvider>
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Authentication Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Registration Routes */}
                <Route path="/register-student" element={<RegisterStudent />} />
                <Route path="/register-teacher" element={<RegisterTeacher />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;