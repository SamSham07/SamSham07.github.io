import { useEffect, useState } from 'react'

export function usePortraitCycle(portraits: readonly string[], intervalMs = 5000) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'visible' | 'fading'>('visible')

  useEffect(() => {
    if (portraits.length <= 1) return
    const fadeMs = 400

    const tick = window.setInterval(() => {
      setPhase('fading')
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % portraits.length)
        setPhase('visible')
      }, fadeMs)
    }, intervalMs)

    return () => window.clearInterval(tick)
  }, [portraits.length, intervalMs])

  return { src: portraits[index], index, phase }
}
