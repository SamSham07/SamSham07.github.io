import { career } from '../config/career'
import type { VisualMode } from '../hooks/useVisualMode'

interface CareerMatrixProps {
  mode: VisualMode
}

export function CareerMatrix({ mode }: CareerMatrixProps) {
  const { coordLabel, subtitle, entries } = career

  return (
    <section className="career-matrix-section" aria-label="Chronological professional matrix">
      <article className="card career-matrix-panel">
        <header className="career-matrix-header">
          <span className="coord-label">{coordLabel}</span>
          <p className="career-matrix-subtitle">{subtitle}</p>
        </header>

        <ol className="career-timeline">
          {entries.map((entry) => (
            <li key={`${entry.period}-${entry.title}`} className="career-entry">
              <div className="career-entry-marker" aria-hidden="true" />
              <div className="career-entry-body card">
                <div className="career-entry-head">
                  <div className="career-entry-titles">
                    <h2 className="career-entry-title">{entry.title}</h2>
                    <p className="career-entry-org">
                      {mode === 'cli' ? (
                        <>
                          <span className="cli-prefix" aria-hidden="true">&gt; org: </span>
                          {entry.org} | {entry.location}
                        </>
                      ) : (
                        <>
                          {entry.org} | {entry.location}
                        </>
                      )}
                    </p>
                  </div>
                  <span className="career-period">{entry.period}</span>
                </div>
                <ul className="career-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </article>
    </section>
  )
}
