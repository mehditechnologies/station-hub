import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  const toggleTheme = (val) => {
    const isDark = val === 'dark'
    setDark(isDark)
    localStorage.setItem('theme', val)
    document.documentElement.classList.toggle('dark', isDark)
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)