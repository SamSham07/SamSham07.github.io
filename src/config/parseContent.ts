export interface SiteConfig {
  identity: {
    name: string
    nameZh: string
    titles: string[]
    status: string
    location: string
    systemId: string
  }
  contact: {
    email: string
    phone: string
    subject: string
    linkedin: string
  }
  hero: {
    coordLabel: string
    headline: string
    body: string
  }
  portraits: string[]
  credentials: {
    coordLabel: string
    columns: { title: string; lines: string[] }[][]
  }
  expertiseVectors: {
    coordLabel: string
    subtitle: string
    visual: string
    items: string[]
  }
  roles: {
    coordLabel: string
    items: {
      id: string
      cls: string
      title: string
      desc: string
      tags: string[]
      img: string
      align: 'left' | 'right'
    }[]
  }
  footer: {
    coordLabel: string
    headline: string
    body: string
    ctaLabel: string
    ack: string
  }
}

function splitSections(raw: string): Map<string, string> {
  const sections = new Map<string, string>()
  const pattern = /^===\s*(.+?)\s*===$/gm
  const matches = [...raw.matchAll(pattern)]

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i]
    const name = match[1].trim().toUpperCase()
    const start = match.index! + match[0].length
    const end = i + 1 < matches.length ? matches[i + 1].index! : raw.length
    sections.set(name, raw.slice(start, end).trim())
  }

  return sections
}

function parseKeyValues(text: string): Record<string, string> {
  const values: Record<string, string> = {}

  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    values[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }

  return values
}

function splitList(value: string): string[] {
  return value
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
}

// Rewrite leading-slash asset paths so they resolve under Vite's `base`
// (e.g. '/assets/x.png' -> '/MyProfile/assets/x.png' on GitHub Pages).
export function asset(path: string): string {
  if (!path) return path
  if (/^(?:https?:)?\/\//i.test(path)) return path
  if (path.startsWith('/')) {
    const base = import.meta.env.BASE_URL // always ends with '/'
    return base + path.slice(1)
  }
  return path
}

function parseLineList(text: string): string[] {
  const items: string[] = []

  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    if (trimmed.startsWith('- ')) {
      items.push(trimmed.slice(2).trim())
      continue
    }
    if (trimmed.includes('=') || trimmed.startsWith('[')) continue
    items.push(trimmed)
  }

  return items
}

function parseCredentials(text: string): SiteConfig['credentials'] {
  const coordLabel = parseKeyValues(text).coordLabel ?? ''
  const body = text
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('coordLabel=')
    })
    .join('\n')
    .trim()

  const columns: { title: string; lines: string[] }[][] = []
  const columnChunks = body.split(/^\[column\]$/m).map((chunk) => chunk.trim()).filter(Boolean)

  for (const chunk of columnChunks) {
    const blocks: { title: string; lines: string[] }[] = []
    let currentTitle = ''
    let currentLines: string[] = []

    for (const line of chunk.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed) continue

      if (trimmed === trimmed.toUpperCase() && !trimmed.includes('=') && !trimmed.startsWith('[')) {
        if (currentTitle) {
          blocks.push({ title: currentTitle, lines: currentLines })
        }
        currentTitle = trimmed
        currentLines = []
        continue
      }

      if (currentTitle) currentLines.push(trimmed)
    }

    if (currentTitle) {
      blocks.push({ title: currentTitle, lines: currentLines })
    }

    columns.push(blocks)
  }

  return { coordLabel, columns }
}

function parseRoles(text: string): SiteConfig['roles'] {
  const coordLabel = parseKeyValues(text).coordLabel ?? ''
  const roleChunks = text
    .split(/^\[role\]$/m)
    .slice(1)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  const items: SiteConfig['roles']['items'] = roleChunks.map((chunk) => {
    const values = parseKeyValues(chunk)
    const align: 'left' | 'right' = values.align === 'right' ? 'right' : 'left'

    return {
      id: values.id ?? '',
      cls: values.cls ?? '',
      title: values.title ?? '',
      desc: values.desc ?? '',
      tags: splitList(values.tags ?? ''),
      img: asset(values.img ?? ''),
      align,
    }
  })

  return { coordLabel, items }
}

export function parseSiteContent(raw: string): SiteConfig {
  const sections = splitSections(raw)

  const identityKv = parseKeyValues(sections.get('IDENTITY') ?? '')
  const contactKv = parseKeyValues(sections.get('CONTACT') ?? '')
  const heroKv = parseKeyValues(sections.get('HERO') ?? '')
  const expertiseKv = parseKeyValues(sections.get('EXPERTISE') ?? '')
  const footerKv = parseKeyValues(sections.get('FOOTER') ?? '')

  return {
    identity: {
      name: identityKv.name ?? '',
      nameZh: identityKv.nameZh ?? '',
      titles: splitList(identityKv.titles ?? ''),
      status: identityKv.status ?? '',
      location: identityKv.location ?? '',
      systemId: identityKv.systemId ?? '',
    },
    contact: {
      email: contactKv.email ?? '',
      phone: contactKv.phone ?? '',
      subject: contactKv.subject ?? '',
      linkedin: contactKv.linkedin ?? '',
    },
    hero: {
      coordLabel: heroKv.coordLabel ?? '',
      headline: heroKv.headline ?? '',
      body: heroKv.body ?? '',
    },
    portraits: parseLineList(sections.get('PORTRAITS') ?? '').map(asset),
    credentials: parseCredentials(sections.get('CREDENTIALS') ?? ''),
    expertiseVectors: {
      coordLabel: expertiseKv.coordLabel ?? '',
      subtitle: expertiseKv.subtitle ?? '',
      visual: asset(expertiseKv.visual ?? ''),
      items: parseLineList(sections.get('EXPERTISE') ?? ''),
    },
    roles: parseRoles(sections.get('ROLES') ?? ''),
    footer: {
      coordLabel: footerKv.coordLabel ?? '',
      headline: footerKv.headline ?? '',
      body: footerKv.body ?? '',
      ctaLabel: footerKv.ctaLabel ?? '',
      ack: footerKv.ack ?? '',
    },
  }
}
