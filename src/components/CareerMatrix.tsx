import { career } from '../config/career'
import type { VisualMode } from '../hooks/useVisualMode'

interface CareerMatrixProps {
  mode: VisualMode
}

export function CareerMatrix({ mode }: CareerMatrixProps) {
  const { coordLabel, subtitle, entries, university } = career

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
                  <div className="career-period-group">
                    {entry.duration && <span className="career-duration">{entry.duration}</span>}
                    <span className="career-period">{entry.period}</span>
                  </div>
                </div>
                <ul className="career-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          {university.activities.length > 0 && (
            <li className="career-entry university-entry">
              <div className="career-entry-marker" aria-hidden="true" />
              <div className="career-entry-body card university-entry-body">
                <div className="career-entry-head university-entry-head">
                  <h2 className="career-entry-title university-heading">{university.heading}</h2>
                </div>
                <div className="university-activities">
                  {university.activities.map((activity) => (
                    <article key={activity.title} className="university-activity">
                      <h3 className="university-activity-title">
                        {activity.title}
                        {activity.context && (
                          <span className="university-activity-context"> {activity.context}</span>
                        )}
                      </h3>
                      <ul className="university-bullets">
                        {activity.bullets.map((bullet) => (
                          <li key={bullet.text}>
                            <span>{bullet.text}</span>
                            {bullet.children.length > 0 && (
                              <ul>
                                {bullet.children.map((child) => (
                                  <li key={child}>{child}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </li>
          )}
        </ol>
      </article>
    </section>
  )
}
