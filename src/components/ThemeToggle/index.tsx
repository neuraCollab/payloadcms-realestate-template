'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import { Button } from '@/components/ui/button'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
