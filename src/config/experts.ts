import expertContentRaw from '../../content/expert-content.txt?raw'

export interface ExpertPost {
  date: string
  tag: string
  title: string
  excerpt: string
}

export interface Expert {
  slug: string
  tab: string
  title: string
  blurb: string
  posts: ExpertPost[]
}

export interface ShowcaseConfig {
  coordLabel: string
  intro: string
  experts: Expert[]
}

function parseKv(line: string): [string, string] | null {
  const eq = line.indexOf('=')
  if (eq === -1) return null
  return [line.slice(0, eq).trim(), line.slice(eq + 1).trim()]
}

export function parseExperts(raw: string): ShowcaseConfig {
  const top: Record<string, string> = {}
  const experts: Expert[] = []
  let expert: Expert | null = null
  let post: ExpertPost | null = null
  let mode: 'top' | 'expert' | 'post' = 'top'

  for (const rawLine of raw.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#') || line.startsWith('===')) continue

    if (line === '[expert]') {
      expert = { slug: '', tab: '', title: '', blurb: '', posts: [] }
      experts.push(expert)
      post = null
      mode = 'expert'
      continue
    }

    if (line === '[post]') {
      post = { date: '', tag: '', title: '', excerpt: '' }
      expert?.posts.push(post)
      mode = 'post'
      continue
    }

    const kv = parseKv(line)
    if (!kv) continue
    const [key, value] = kv

    if (mode === 'top') top[key] = value
    else if (mode === 'expert' && expert) (expert as unknown as Record<string, string>)[key] = value
    else if (mode === 'post' && post) (post as unknown as Record<string, string>)[key] = value
  }

  return {
    coordLabel: top.coordLabel ?? '',
    intro: top.intro ?? '',
    experts,
  }
}

export const showcase: ShowcaseConfig = parseExperts(expertContentRaw)
