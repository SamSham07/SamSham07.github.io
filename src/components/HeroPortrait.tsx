import { site } from '../config/site'
import { usePortraitCycle } from '../hooks/usePortraitCycle'

export function HeroPortrait() {
  const { src, index, phase } = usePortraitCycle(site.portraits, 5000)

  return (
    <aside className="card hero-portrait-frame">
      <div className="portrait-coords">
        <span>X — 03.27</span>
        <span>Y — 11.04</span>
      </div>
      <div className="portrait-inner">
        <span className="portrait-corner tl" />
        <span className="portrait-corner tr" />
        <span className="portrait-corner bl" />
        <span className="portrait-corner br" />
        <img
          key={src}
          className={`portrait-img ${phase === 'fading' ? 'fading' : 'visible'}`}
          src={src}
          alt="Portrait of Ir. Ts. Sam Sham"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="portrait-caption">
        <span>SUBJ // SAM_SHAM</span>
        <span className="portrait-dots" aria-hidden="true">
          {site.portraits.map((_, i) => (
            <span key={i} className={i === index ? 'active' : ''} />
          ))}
        </span>
      </div>
    </aside>
  )
}
