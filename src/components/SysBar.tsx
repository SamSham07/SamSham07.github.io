import { site } from '../config/site'
import { useLiveUtcStamp } from '../hooks/useLiveUtcStamp'
import type { VisualMode } from '../hooks/useVisualMode'

interface SysBarProps {
  mode: VisualMode
}

export function SysBar({ mode }: SysBarProps) {
  const stamp = useLiveUtcStamp(true)
  const { identity } = site

  return (
    <div className="sys-bar">
      <span aria-hidden="true">
        <span className="dot" />
        {identity.systemId}
      </span>
      <span className="sys-bar-right">
        <span aria-hidden="true">BUILD // PORTFOLIO.v1</span>
        <span aria-hidden="true">STAMP // {stamp}</span>
        <a
          className="status-badge"
          href="#contact"
          title="Jump to contact details"
          aria-label="Jump to contact details"
        >
          {mode === 'cli' ? (
            <>AGENT — {identity.status}</>
          ) : (
            <>STATUS — {identity.status}</>
          )}
        </a>
      </span>
    </div>
  )
}
