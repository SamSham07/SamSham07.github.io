import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  phase: number
  speed: number
  base: number
  layer: 0 | 1 | 2
}

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  ttl: number
  length: number
}

/**
 * Uniform starfield backdrop:
 *   - dense even scatter (no galactic band)
 *   - black stars on light theme, pale stars on dark theme
 *   - layered twinkle + occasional meteors
 */
export function StarfieldBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let nextMeteorAt = performance.now() + 600 + Math.random() * 1400

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = w * h
      const count = Math.min(2800, Math.max(700, Math.round(area / 850)))

      stars = Array.from({ length: count }, () => {
        const layerRoll = Math.random()
        const layer: 0 | 1 | 2 =
          layerRoll < 0.72 ? 0 : layerRoll < 0.94 ? 1 : 2
        const layerScale = layer === 0 ? 0.5 : layer === 1 ? 0.95 : 1.35
        const layerAlpha = layer === 0 ? 0.2 : layer === 1 ? 0.4 : 0.58

        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: (0.28 + Math.random() * 0.75) * layerScale,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * (layer === 2 ? 3.8 : 2.4),
          base: Math.min(0.88, layerAlpha + Math.random() * 0.16),
          layer,
        }
      })
    }

    const spawnMeteor = (now: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const burst = Math.random() < 0.38 ? 2 : 1

      for (let i = 0; i < burst; i++) {
        const fromTop = Math.random() > 0.35
        const startX = fromTop ? Math.random() * w * 0.85 : w + 40
        const startY = fromTop ? -40 - Math.random() * 80 : Math.random() * h * 0.55
        const angle = fromTop ? Math.PI * 0.16 + Math.random() * 0.08 : Math.PI * 0.82
        const speed = 0.5 + Math.random() * 0.4

        meteors.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed * 600,
          vy: Math.sin(angle) * speed * 600,
          life: 0,
          ttl: 1.2 + Math.random() * 0.6,
          length: 80 + Math.random() * 100,
        })
      }
      nextMeteorAt = now + 1200 + Math.random() * 2200
    }

    const starTone = (night: boolean, claude: boolean, layer: 0 | 1 | 2) => {
      if (night) {
        return layer === 2 ? '#f1f5f9' : layer === 1 ? '#cbd5e1' : '#94a3b8'
      }
      if (claude) {
        return layer === 2 ? '#2D2926' : '#524C47'
      }
      return layer === 2 ? '#0a0a0a' : '#171717'
    }

    let last = performance.now()
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      const pixel = document.documentElement.dataset.pixelMode === 'true'
      const cli = document.documentElement.dataset.cliMode === 'true'
      const night = document.documentElement.dataset.theme === 'dark'
      const claude = document.documentElement.dataset.theme === 'claude'
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      if (cli) {
        const cliNight = document.documentElement.dataset.theme === 'dark'
        for (const s of stars) {
          if (s.layer === 0 && Math.random() > 0.06) continue
          s.phase += s.speed * dt * 0.85
          const tw = Math.sin(s.phase) * 0.32 + s.base * 0.35
          ctx.globalAlpha = cliNight
            ? Math.max(0.04, Math.min(0.35, tw))
            : Math.max(0.1, Math.min(0.55, tw))
          ctx.fillStyle = cliNight
            ? s.layer === 2
              ? '#9ece6a'
              : '#565f89'
            : claude
              ? s.layer === 2
                ? '#C15F3C'
                : '#9A8F85'
              : starTone(false, false, s.layer)
          const size = cliNight ? 1 : s.layer === 2 ? 2 : 1
          ctx.fillRect(Math.round(s.x), Math.round(s.y), size, size)
        }
        ctx.globalAlpha = 1
        raf = requestAnimationFrame(draw)
        return
      }

      for (const s of stars) {
        if (!night && s.layer === 0) continue

        s.phase += s.speed * dt * 1.35
        const pulse = Math.sin(s.phase) * (s.layer === 2 ? 0.48 : s.layer === 1 ? 0.34 : 0.2)
        const tw = pulse + s.base
        const boost = night ? 1.3 : 1.1
        ctx.globalAlpha = pixel
          ? night
            ? 0.55 + s.layer * 0.08
            : 0.45 + s.layer * 0.12
          : Math.max(
              night ? 0.1 : 0.12,
              Math.min(night ? 0.95 : 0.7, tw * boost),
            )

        if (pixel) {
          ctx.fillStyle = night ? '#ffffff' : claude ? '#2D2926' : '#000000'
          const size = s.layer === 2 ? 3 : 2
          ctx.fillRect(Math.round(s.x), Math.round(s.y), size, size)
          continue
        }

        const tone = starTone(night, claude, s.layer)

        ctx.fillStyle = tone
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (now >= nextMeteorAt) spawnMeteor(now)
      meteors = meteors.filter((m) => {
        m.life += dt
        if (m.life > m.ttl) return false
        m.x += m.vx * dt
        m.y += m.vy * dt
        const a = Math.max(0, 1 - m.life / m.ttl)

        const len = m.length
        const nx = -m.vx
        const ny = -m.vy
        const mag = Math.hypot(nx, ny) || 1
        const tx = m.x + (nx / mag) * len
        const ty = m.y + (ny / mag) * len

        const grd = ctx.createLinearGradient(m.x, m.y, tx, ty)
        const stroke = pixel
          ? night
            ? '255, 255, 255'
            : claude
              ? '45, 41, 38'
              : '0, 0, 0'
          : night
            ? '203, 213, 225'
            : claude
              ? '82, 76, 71'
              : '23, 23, 23'
        grd.addColorStop(0, `rgba(${stroke}, ${a * 0.85})`)
        grd.addColorStop(1, `rgba(${stroke}, 0)`)
        ctx.strokeStyle = grd
        ctx.lineWidth = pixel ? 2 : 1.2
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        ctx.fillStyle = pixel
          ? night
            ? '#fff'
            : claude
              ? '#2D2926'
              : '#000'
          : night
            ? `rgba(226, 232, 240, ${a})`
            : claude
              ? `rgba(45, 41, 38, ${a * 0.9})`
              : `rgba(10, 10, 10, ${a * 0.9})`
        if (pixel) {
          ctx.fillRect(Math.round(m.x) - 1, Math.round(m.y) - 1, 3, 3)
        } else {
          ctx.beginPath()
          ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2)
          ctx.fill()
        }
        return true
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="starfield-canvas" aria-hidden="true" />
}
