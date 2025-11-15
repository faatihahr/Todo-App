import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const useTheme = () => useContext(ThemeContext)
