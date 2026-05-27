import { useCallback, useEffect, useState } from 'react'

export type VisualMode = 'blueprint' | 'pixel' | 'cli'

const STORAGE_KEY = 'sam-portfolio-visual-mode'
const LEGACY_PIXEL_KEY = 'sam-portfolio-pixel-mode'

const MODES: VisualMode[] = ['blueprint', 'pixel', 'cli']

function readInitialMode(defaultMode: VisualMode): VisualMode {
  if (typeof window === 'undefined') return defaultMode

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && MODES.includes(stored as VisualMode)) return stored as VisualMode

  const legacy = window.localStorage.getItem(LEGACY_PIXEL_KEY)
  if (legacy === '1') return 'pixel'
  if (legacy === '0') return 'blueprint'

  return defaultMode
}

function applyMode(mode: VisualMode) {
  document.documentElement.dataset.visualMode = mode
  document.documentElement.dataset.pixelMode = mode === 'pixel' ? 'true' : 'false'
  document.documentElement.dataset.cliMode = mode === 'cli' ? 'true' : 'false'
}

export function useVisualMode(defaultMode: VisualMode = 'blueprint') {
  const [mode, setMode] = useState<VisualMode>(() => readInitialMode(defaultMode))

  useEffect(() => {
    applyMode(mode)
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const cycleMode = useCallback(() => {
    setMode((current) => {
      const idx = MODES.indexOf(current)
      return MODES[(idx + 1) % MODES.length]
    })
  }, [])

  const nextModeLabel =
    mode === 'blueprint' ? 'PIXEL_MODE' : mode === 'pixel' ? 'CLI_MODE' : 'BLUEPRINT_MODE'

  return { mode, cycleMode, setMode, nextModeLabel }
}
