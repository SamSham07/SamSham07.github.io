import careerContentRaw from '../../content/career-content.txt?raw'
import { parseCareerContent, type CareerConfig } from './parseCareer'

export const career: CareerConfig = parseCareerContent(careerContentRaw)

export type { CareerConfig, CareerEntry } from './parseCareer'
