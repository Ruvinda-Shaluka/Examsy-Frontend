import { Routes, Route } from 'react-router-dom';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import { ThemeProvider } from './hooks/useTheme.jsx';
import LandingPage from './pages/LandingPage.jsx';

function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register-student" element={<RegisterStudent />} />
                <Route path="/register-teacher" element={<RegisterTeacher />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;