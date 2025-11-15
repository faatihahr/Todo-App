import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from '../hooks/useTheme'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="rounded-full"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}

export default ThemeToggle
