import { site } from '../config/site'
import { asset } from '../config/parseContent'

function phoneTelHref(display: string): string {
  const digits = display.replace(/[^\d+]/g, '')
  return `tel:${digits}`
}

export function Footer() {
  const { footer, contact } = site
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`
  const phoneHref = contact.phone ? phoneTelHref(contact.phone) : ''

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-coord">{footer.coordLabel}</span>
        <div className="footer-grid">
          <div className="footer-main">
            <h2 className="footer-headline">{footer.headline}</h2>
            <p className="footer-body">{footer.body}</p>
            <div className="contact-actions">
              <a className="contact-btn" href={mailto}>
                <span className="contact-label-default">{footer.ctaLabel}</span>
                <span className="contact-label-cli">
                  <span className="cli-prefix" aria-hidden="true">$ MAIL_TO : </span>
                  {contact.email}
                  <span className="cli-cursor" aria-hidden="true">█</span>
                </span>
              </a>
              {contact.phone ? (
                <a className="contact-btn contact-btn--phone" href={phoneHref}>
                  <span className="contact-label-default">{contact.phone}</span>
                  <span className="contact-label-cli">
                    <span className="cli-prefix" aria-hidden="true">$ TEL : </span>
                    {contact.phone}
                    <span className="cli-cursor" aria-hidden="true">█</span>
                  </span>
                </a>
              ) : null}
            </div>
            <p className="footer-meta">{footer.ack}</p>
          </div>
          <div className="footer-glyphs" aria-hidden="true">
            <img className="footer-glyph-img footer-glyph-img--green" src={asset('/assets/footer-green.png')} alt="" />
            <img className="footer-glyph-img footer-glyph-img--telescope" src={asset('/assets/footer-telescope.png')} alt="" />
            <img className="footer-glyph-img footer-glyph-img--coding" src={asset('/assets/footer-coding.png')} alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}
