import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for a saved theme, otherwise check system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = window.document.documentElement
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(isDark ? 'dark' : 'light')

    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
