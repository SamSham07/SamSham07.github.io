import { site } from '../config/site'

export function ExpertiseVectors() {
  const { expertiseVectors } = site
  return (
    <section className="card expertise-vectors" aria-label="Expertise vectors">
      <div className="vectors-grid">
        <span className="coord-label">{expertiseVectors.coordLabel}</span>
        <p className="vectors-subtitle">{expertiseVectors.subtitle}</p>
        <ol className="vectors-list">
          {expertiseVectors.items.map((item, i) => (
            <li key={item}>
              <span className="vector-num">{String(i + 1).padStart(2, '0')}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="vectors-visual" aria-hidden="true">
        <img src={expertiseVectors.visual} alt="" />
      </div>
    </section>
  )
}
