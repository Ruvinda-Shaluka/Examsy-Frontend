import { Routes, Route, Link } from 'react-router-dom';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import { ThemeProvider } from './hooks/useTheme.jsx';
import ToggleButton from './components/ToggleButton.jsx';
import LandingPage from './pages/LandingPage.jsx';
import TextPressure from './components/TextPressure.jsx';

function AppContent() {
  return (
    <div className="bg-examsy-bg min-h-screen">
      <nav className="p-4 bg-examsy-surface text-examsy-text flex justify-between items-center shadow-md">
          <div style={{ position: 'relative', height: '48px', width: '150px' }}>
              <TextPressure
                  text="Examsy !"
                  flex
                  alpha={false}
                  stroke={false}
                  width
                  weight={false}
                  italic
                  textColor="#465ed2"
                  strokeColor="#5227FF"
                  minFontSize={28}
              />
          </div>
        <div className="flex items-center">
          <Link to="/register-student" className="mr-6 font-semibold hover:text-examsy-primary transition-colors">Student</Link>
          <Link to="/register-teacher" className="mr-6 font-semibold hover:text-examsy-primary transition-colors">Teacher</Link>
          <ToggleButton />
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App;
