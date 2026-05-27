import { NavLink } from 'react-router-dom'
import { site } from '../config/site'
import type { ThemeMode } from '../hooks/useThemeMode'
import type { VisualMode } from '../hooks/useVisualMode'

interface HeaderProps {
  mode: VisualMode
  theme: ThemeMode
  nextModeLabel: string
  themeToggleLabel: string
  onCycleMode: () => void
  onToggleTheme: () => void
}

export function Header({
  mode,
  theme,
  nextModeLabel,
  themeToggleLabel,
  onCycleMode,
  onToggleTheme,
}: HeaderProps) {
  const { identity } = site

  return (
    <header className="site-header">
      <div>
        <h1 className="site-name">
          {mode === 'cli' ? (
            <>
              <span className="cli-prefix" aria-hidden="true">$ who.am.i → </span>
              {identity.name}{' '}
              <span className="name-zh">({identity.nameZh})</span>
            </>
          ) : (
            <>
              {identity.name}{' '}
              <span className="name-zh">({identity.nameZh})</span>
            </>
          )}
        </h1>
        <p className="site-titles">
          <span className="cli-prefix" aria-hidden="true">&gt; roles: </span>
          {identity.titles.map((t, i) => (
            <span key={t}>
              {t}
              {i < identity.titles.length - 1 && <span className="sep">|</span>}
            </span>
          ))}
        </p>
      </div>
      <div className="header-right">
        <div className="header-controls">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-pressed={theme !== 'light'}
            title={
              theme === 'light'
                ? 'Switch to dark mode (starry night)'
                : theme === 'dark'
                  ? 'Switch to Claude mode (warm palette)'
                  : 'Switch to light mode'
            }
          >
            {themeToggleLabel}
          </button>
          <button
            className="mode-toggle"
            onClick={onCycleMode}
            aria-pressed={mode !== 'blueprint'}
            title="Cycle visual mode: Blueprint → Pixel → CLI"
          >
            {nextModeLabel}
          </button>
        </div>
        <nav className="site-nav" aria-label="Portfolio sheets">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
            MAIN
          </NavLink>
          <NavLink to="/career" className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
            {mode === 'cli' ? 'CAREER_MATRIX' : 'CAREER MATRIX'}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
