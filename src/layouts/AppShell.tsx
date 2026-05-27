import { Outlet } from 'react-router-dom'
import { BlueprintGrid } from '../components/BlueprintGrid'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { StarfieldBackground } from '../components/StarfieldBackground'
import { SysBar } from '../components/SysBar'
import { useThemeMode } from '../hooks/useThemeMode'
import { useVisualMode, type VisualMode } from '../hooks/useVisualMode'

export interface AppShellContext {
  mode: VisualMode
}

export function AppShell() {
  const { mode, cycleMode, nextModeLabel } = useVisualMode('blueprint')
  const { theme, toggleTheme, themeToggleLabel } = useThemeMode('light')

  return (
    <div className="app-shell">
      <StarfieldBackground />
      <BlueprintGrid />
      <div className="cli-backdrop" aria-hidden="true" />
      <div className="app-content">
        <SysBar mode={mode} />
        <Header
          mode={mode}
          theme={theme}
          nextModeLabel={nextModeLabel}
          themeToggleLabel={themeToggleLabel}
          onCycleMode={cycleMode}
          onToggleTheme={toggleTheme}
        />
        <main>
          <Outlet context={{ mode } satisfies AppShellContext} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
