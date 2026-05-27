import { site } from '../config/site'
import { Credentials } from './Credentials'
import { HeroPortrait } from './HeroPortrait'

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-headline">
      <HeroPortrait />
      <div className="hero-content">
        <article className="card hero-statement">
          <span className="coord-label">{site.hero.coordLabel}</span>
          <h2 id="hero-headline" className="hero-headline">
            {site.hero.headline}
          </h2>
          <p className="hero-body">{site.hero.body}</p>
        </article>
        <Credentials />
      </div>
    </section>
  )
}
