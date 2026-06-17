import { Navigate, useParams } from 'react-router-dom'
import { showcase } from '../config/experts'

export function ShowcasePage() {
  const { slug } = useParams()
  const active = showcase.experts.find((e) => e.slug === slug)

  if (!active) {
    return <Navigate to={`/expert/${showcase.experts[0].slug}`} replace />
  }

  return (
    <section className="folder-sheet" aria-label={active.title}>
      <div className="sheet-meta">
        <h2 className="sheet-title">{active.title}</h2>
        {active.blurb && <p className="sheet-blurb">{active.blurb}</p>}
      </div>

      <div className="post-feed">
        {active.posts.length === 0 ? (
          <p className="post-empty">NO ENTRIES YET</p>
        ) : (
          active.posts.map((p) => (
            <article key={p.title} className="post">
              <div className="post-meta">
                <span className="post-date">{p.date}</span>
                <span className="post-tag">{p.tag}</span>
              </div>
              <h3 className="post-title">{p.title}</h3>
              <p className="post-excerpt">{p.excerpt}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
