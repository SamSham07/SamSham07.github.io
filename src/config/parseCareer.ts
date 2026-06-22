export interface CareerEntry {
  title: string
  org: string
  location: string
  period: string
  duration: string
  bullets: string[]
}

export interface UniversityActivityBullet {
  text: string
  children: string[]
}

export interface UniversityActivity {
  title: string
  context: string
  bullets: UniversityActivityBullet[]
}

export interface CareerConfig {
  coordLabel: string
  subtitle: string
  entries: CareerEntry[]
  university: {
    heading: string
    activities: UniversityActivity[]
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

function parseBullets(chunk: string): string[] {
  const bullets: string[] = []

  for (const line of chunk.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    if (trimmed.startsWith('- ')) {
      bullets.push(trimmed.slice(2).trim())
    }
  }

  return bullets
}

function parseEntries(text: string): CareerEntry[] {
  const chunks = text
    .split(/^\[entry\]$/m)
    .slice(1)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  return chunks.map((chunk) => {
    const values = parseKeyValues(chunk)
    return {
      title: values.title ?? '',
      org: values.org ?? '',
      location: values.location ?? '',
      period: values.period ?? '',
      duration: values.duration ?? '',
      bullets: parseBullets(chunk),
    }
  })
}

function parseActivityBullets(chunk: string): UniversityActivityBullet[] {
  const bullets: UniversityActivityBullet[] = []

  for (const line of chunk.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    if (trimmed.startsWith('-- ')) {
      const parent = bullets.at(-1)
      if (parent) parent.children.push(trimmed.slice(3).trim())
      continue
    }

    if (trimmed.startsWith('- ')) {
      bullets.push({ text: trimmed.slice(2).trim(), children: [] })
    }
  }

  return bullets
}

function parseUniversity(text: string): CareerConfig['university'] {
  const heading = parseKeyValues(text).heading ?? ''
  const chunks = text
    .split(/^\[activity\]$/m)
    .slice(1)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  return {
    heading,
    activities: chunks.map((chunk) => {
      const values = parseKeyValues(chunk)
      return {
        title: values.title ?? '',
        context: values.context ?? '',
        bullets: parseActivityBullets(chunk),
      }
    }),
  }
}

export function parseCareerContent(raw: string): CareerConfig {
  const sections = splitSections(raw)
  const body = sections.get('CAREER_MATRIX') ?? ''
  const headerKv = parseKeyValues(body)

  const entriesBody = body
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return (
        trimmed &&
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('coordLabel=') &&
        !trimmed.startsWith('subtitle=')
      )
    })
    .join('\n')

  return {
    coordLabel: headerKv.coordLabel ?? '',
    subtitle: headerKv.subtitle ?? '',
    entries: parseEntries(entriesBody),
    university: parseUniversity(sections.get('UNIVERSITY') ?? ''),
  }
}
