import { site } from '../config/site'

function CredentialBlock({
  title,
  lines,
}: {
  title: string
  lines: readonly string[]
}) {
  return (
    <div className="credential-block">
      <h3 className="credential-title">{title}</h3>
      <ul>
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

export function Credentials() {
  const { credentials } = site
  return (
    <section className="card credentials-panel" aria-label="Consolidated credentials">
      <span className="coord-label">{credentials.coordLabel}</span>
      <div className="credentials-grid">
        {credentials.columns.map((column, colIdx) => (
          <div className="credentials-col" key={colIdx}>
            {column.map((block) => (
              <CredentialBlock key={block.title} title={block.title} lines={block.lines} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
