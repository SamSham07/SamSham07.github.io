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
        <span aria-hidden="true">STAMP // {stamp} UTC</span>
        <span className="status-badge" role="status">
          {mode === 'cli' ? (
            <>AGENT — {identity.status}</>
          ) : (
            <>STATUS — {identity.status}</>
          )}
        </span>
      </span>
    </div>
  )
}