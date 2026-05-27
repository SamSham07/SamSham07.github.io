import { site } from '../config/site'

function parseRoleDesc(raw: string) {
  const text = raw.replace(/\\n/g, '\n')
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  const hasBullets = lines.some((line) => line.startsWith('- '))

  if (!hasBullets) {
    return { mode: 'prose' as const, text }
  }

  const bullets: string[] = []
  const prose: string[] = []

  for (const line of lines) {
    if (line.startsWith('- ')) {
      bullets.push(line.slice(2).trim())
    } else {
      prose.push(line)
    }
  }

  return { mode: 'mixed' as const, prose, bullets }
}

function RoleDescription({ desc }: { desc: string }) {
  const parsed = parseRoleDesc(desc)

  if (parsed.mode === 'prose') {
    return <p className="role-desc">{parsed.text}</p>
  }

  return (
    <div className="role-desc-block">
      {parsed.prose.map((line) => (
        <p key={line} className="role-desc">{line}</p>
      ))}
      {parsed.bullets.length > 0 && (
        <ul className="role-desc-bullets">
          {parsed.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function RoleCards() {  const { roles } = site
  return (
    <section className="role-cards-section" aria-label="Specialized expertise domains">
      <header className="role-cards-header">
        <span className="coord-label">{roles.coordLabel}</span>
      </header>
      <div className="role-cards">
        {roles.items.map((role) => (
          <article key={role.id} className={`card role-card align-${role.align}`}>
            <div className="role-visual" aria-hidden="true">
              <img src={role.img} alt="" />
            </div>
            <div className="role-copy">
              <div className="role-copy-inner">
                <div className="role-meta">
                  <span className="id">{role.id}</span>
                  <span>{role.cls}</span>
                </div>
                <h3 className="role-title">{role.title}</h3>
                <RoleDescription desc={role.desc} />
                <div className="role-tags">
                  {role.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
