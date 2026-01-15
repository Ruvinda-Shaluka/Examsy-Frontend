import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import { ThemeProvider, useTheme } from './hooks/useTheme'

function AppContent() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
