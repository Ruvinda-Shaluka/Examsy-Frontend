import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import RegisterStudent from './pages/RegisterStudent'
import RegisterTeacher from './pages/RegisterTeacher'
import { ThemeProvider, useTheme } from './hooks/useTheme.jsx'

function AppContent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <nav className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Examsy</Link>
        <div className="theme-switcher">
          <button onClick={() => toggleTheme('light')} disabled={theme === 'light'}>
            Light
          </button>
          <button onClick={() => toggleTheme('dark')} disabled={theme === 'dark'}>
            Dark
          </button>
          <button onClick={() => toggleTheme('system')} disabled={theme === 'system'}>
            System
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        <Route path="/register-teacher" element={<RegisterTeacher />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
