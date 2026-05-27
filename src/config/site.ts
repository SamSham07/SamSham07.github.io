import siteContentRaw from '../../content/site-content.txt?raw'
import { parseSiteContent, type SiteConfig } from './parseContent'

export const site: SiteConfig = parseSiteContent(siteContentRaw)

export type { SiteConfig }
