import { useOutletContext } from 'react-router-dom'
import { CareerMatrix } from '../components/CareerMatrix'
import type { AppShellContext } from '../layouts/AppShell'

export function CareerPage() {
  const { mode } = useOutletContext<AppShellContext>()
  return <CareerMatrix mode={mode} />
}
