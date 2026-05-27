import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'claude'

const STORAGE_KEY = 'sam-portfolio-theme'
const THEMES: ThemeMode[] = ['light', 'dark', 'claude']

const NEXT_LABEL: Record<ThemeMode, string> = {
  light: 'DARK_MODE',
  dark: 'CLAUDE_MODE',
  claude: 'LIGHT_MODE',
}

function readInitialTheme(defaultTheme: ThemeMode): ThemeMode {
  if (typeof window === 'undefined') return defaultTheme
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && THEMES.includes(stored as ThemeMode)) return stored as ThemeMode
  return defaultTheme
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme
}

export function useThemeMode(defaultTheme: ThemeMode = 'light') {
  const [theme, setTheme] = useState<ThemeMode>(() => readInitialTheme(defaultTheme))

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const idx = THEMES.indexOf(current)
      return THEMES[(idx + 1) % THEMES.length]
    })
  }, [])

  const themeToggleLabel = NEXT_LABEL[theme]

  return { theme, cycleTheme, toggleTheme: cycleTheme, setTheme, themeToggleLabel }
}
