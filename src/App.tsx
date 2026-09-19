import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { copy, practice, type Language } from './site'

type Modal = 'contact' | 'privacy' | number | null

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 2c0 22-8 30-30 30 22 0 30 8 30 30 0-22 8-30 30-30C40 32 32 24 32 2Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="m11 11 42 42m0-42L11 53"
        stroke="currentColor"
        strokeWidth=".65"
      />
    </svg>
  )
}

function CareDrawing({ type }: { type: number }) {
  return (
    <svg
      className="care-drawing"
      viewBox="0 0 110 90"
      fill="none"
      aria-hidden="true"
    >
      {type === 0 && (
        <>
          <path d="M25 66V38a30 30 0 0 1 60 0v28M34 66V38a21 21 0 0 1 42 0v28M43 66V38a12 12 0 0 1 24 0v28M16 74h78" />
          <path d="M55 16v61" opacity=".4" />
        </>
      )}
      {type === 1 && (
        <>
          <path d="M55 8c0 26-11 37-37 37 26 0 37 11 37 37 0-26 11-37 37-37C66 45 55 34 55 8Z" />
          <circle cx="55" cy="45" r="29" />
          <path d="M55 1v9m0 71v8M10 45h9m72 0h9" />
        </>
      )}
      {type === 2 && (
        <>
          <path d="M29 74c38-2 60-25 51-59C43 8 20 28 29 74Z" />
          <path d="m29 74 41-49M41 60l-4-24m15 11 22 1M52 47l-2-21" />
          <path d="M21 82 70 25" />
        </>
      )}
    </svg>
  )
}

function ExternalLink({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <a
      className={className}
      href={practice.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={`logo ${footer ? 'logo-footer' : ''}`}
      aria-label="Pastrana Dental — home"
    >
      <span>
        pastrana<span className="logo-dot">.</span>
      </span>
      <span className="logo-sub">D E N T A L</span>
    </a>
  )
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('pastrana-language') === 'es' ? 'es' : 'en'
    } catch {
      return 'en'
    }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<Modal>(null)
  const [comparison, setComparison] = useState(50)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const c = copy[language]
  const sections = ['philosophy', 'care', 'doctor']

  useEffect(() => {
    // On a direct link, the browser can try the anchor before React has mounted.
    let active = true
    void document.fonts.ready.then(() => {
      if (active && window.location.hash) {
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView({ behavior: 'instant' })
      }
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.title =
      language === 'en'
        ? 'Pastrana Dental | Thoughtfully personal dentistry'
        : 'Pastrana Dental | Odontología con un toque personal'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', c.heroBody)
    try {
      localStorage.setItem('pastrana-language', language)
    } catch {
      /* Browsing with storage disabled remains supported. */
    }
  }, [language, c.heroBody])

  useEffect(() => {
    const dialog = dialogRef.current
    if (modal !== null && dialog && !dialog.open) dialog.showModal()
    if (modal === null && dialog?.open) dialog.close()
    if (modal === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [modal])

  useEffect(() => {
    if (!menuOpen) return
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const closeOutside = (event: PointerEvent) => {
      if (!(event.target as HTMLElement).closest('.site-header'))
        setMenuOpen(false)
    }
    document.addEventListener('keydown', closeWithEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      document.removeEventListener('keydown', closeWithEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [menuOpen])

  function openContact() {
    setMenuOpen(false)
    setModal('contact')
  }

  function contactButton(className = 'button') {
    return practice.bookingUrl ? (
      <a
        className={className}
        href={practice.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {c.booking}
        <Arrow diagonal />
      </a>
    ) : (
      <button className={className} onClick={openContact}>
        {c.connect}
        <Arrow diagonal />
      </button>
    )
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <div id="home" className="announcement">
        <span className="status-dot" />
        <span>{c.announcement}</span>
        <ExternalLink>
          {c.announcementLink}
          <Arrow diagonal />
        </ExternalLink>
      </div>
      <header className="site-header">
        <div className="header-inner container">
          <Logo />
          <nav
            id="main-navigation"
            aria-label={
              language === 'en' ? 'Main navigation' : 'Navegación principal'
            }
            className={menuOpen ? 'main-nav is-open' : 'main-nav'}
          >
            {c.nav.map((label, index) => (
              <a
                key={sections[index]}
                href={`#${sections[index]}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <button className="mobile-contact text-link" onClick={openContact}>
              {c.connect}
              <Arrow diagonal />
            </button>
          </nav>
          <div className="header-actions">
            <div
              className="language-switch"
              role="group"
              aria-label={c.language}
            >
              <button
                lang="en"
                aria-label="English"
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <span>/</span>
              <button
                lang="es"
                aria-label="Español"
                aria-pressed={language === 'es'}
                onClick={() => setLanguage('es')}
              >
                ES
              </button>
            </div>
            {contactButton('button button-small header-contact')}
            <button
              ref={menuButtonRef}
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? c.close : c.menu}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero container" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="short-rule" />
              {c.eyebrow}
            </p>
            <h1 id="hero-heading">
              {c.heroLine1}
              <em>{c.heroLine2}</em>
            </h1>
            <p className="hero-description">{c.heroBody}</p>
            <div className="hero-cta">
              {contactButton()}
              <a className="text-link" href="#doctor">
                {c.heroLink}
                <Arrow />
              </a>
            </div>
            <a href="#philosophy" className="hero-scroll">
              <span className="scroll-arrow">↓</span>
              {c.scroll}
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <img
                src="/images/stephanie-welcome.png"
                width="2239"
                height="1618"
                fetchPriority="high"
                alt={c.photoAlt}
              />
            </div>
            <div className="personal-seal">
              <span>{c.stamp}</span>
              <Sparkle />
              <span>{c.stampBottom}</span>
            </div>
            <div className="hero-caption">
              <span>
                {c.heroCaption}
                <small>{c.heroCaptionSub}</small>
              </span>
              <Sparkle />
            </div>
            <span className="photo-side-note" aria-hidden="true">
              THE ART OF A PERSONAL SMILE
            </span>
          </div>
        </section>

        <section
          className="credentials"
          aria-label={
            language === 'en'
              ? 'Education and professional development'
              : 'Educación y desarrollo profesional'
          }
        >
          <div className="container credentials-inner">
            <p>{c.credentialIntro}</p>
            {c.credentials.map(([title, sub]) => (
              <div className="credential" key={title}>
                <span>{title}</span>
                <small>{sub}</small>
              </div>
            ))}
          </div>
        </section>

        <section
          id="philosophy"
          className="philosophy section-pad container"
          aria-labelledby="philosophy-heading"
        >
          <div className="centered-intro">
            <Sparkle className="section-sparkle" />
            <p className="eyebrow">{c.philosophyLabel}</p>
            <h2 id="philosophy-heading">
              {c.philosophyTitle}
              <em>{c.philosophyItalic}</em>
            </h2>
            <p>{c.philosophyBody}</p>
          </div>
          <div className="values">
            {c.values.map(([title, body], index) => (
              <article className="value" key={index}>
                <span className="index-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="care"
          className="care-section section-pad"
          aria-labelledby="care-heading"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{c.careLabel}</p>
                <h2 id="care-heading">
                  {c.careTitle}
                  <em>{c.careItalic}</em>
                </h2>
              </div>
              <p>{c.careBody}</p>
            </div>
            <div className="services">
              {c.services.map((service, index) => (
                <article className="service-card" key={index}>
                  <div className="service-top">
                    <span className="index-number">0{index + 1}</span>
                    <span className="circle-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <CareDrawing type={index} />
                  <h3>{service.title}</h3>
                  <span className="service-sub">{service.sub}</span>
                  <p>{service.body}</p>
                  <button
                    className="service-link"
                    onClick={() => setModal(index)}
                    aria-label={`${c.explore}: ${service.title}`}
                  >
                    {c.explore}
                    <Arrow />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="doctor"
          className="doctor-section section-pad container"
          aria-labelledby="doctor-heading"
        >
          <div className="doctor-visual">
            <div className="doctor-photo">
              <img
                src="/images/stephanie-portrait.png"
                width="2655"
                height="1902"
                loading="lazy"
                alt={c.portraitAlt}
              />
            </div>
            <span className="doctor-photo-label">STEPHANIE PASTRANA, DMD</span>
            <div className="doctor-ornament" aria-hidden="true">
              <Sparkle />
            </div>
          </div>
          <div className="doctor-copy">
            <p className="eyebrow">{c.doctorLabel}</p>
            <h2 id="doctor-heading">
              {c.doctorTitle}
              <em>{c.doctorItalic}</em>
            </h2>
            <h3>{c.doctorIntro}</h3>
            <p>{c.doctorBody}</p>
            <p>{c.doctorEducation}</p>
            <span className="signature">{c.signature}</span>
            <ExternalLink className="text-link">
              {c.doctorLink}
              <Arrow diagonal />
            </ExternalLink>
          </div>
        </section>

        <section
          className="smile-section section-pad"
          aria-labelledby="smile-heading"
        >
          <div className="container smile-inner">
            <div className="smile-copy">
              <p className="eyebrow">{c.galleryLabel}</p>
              <h2 id="smile-heading">
                {c.galleryTitle}
                <em>{c.galleryItalic}</em>
              </h2>
              <p>{c.galleryBody}</p>
              <ExternalLink className="text-link">
                {practice.instagramHandle}
                <Arrow diagonal />
              </ExternalLink>
            </div>
            <div className="smile-demo">
              <div
                className="comparison"
                style={{ '--position': `${comparison}%` } as CSSProperties}
              >
                <div
                  className="smile-image smile-after"
                  role="img"
                  aria-label={c.after}
                />
                <div className="smile-before-layer">
                  <div
                    className="smile-image smile-before"
                    role="img"
                    aria-label={c.before}
                  />
                </div>
                <span className="comparison-label label-before">
                  {c.before}
                </span>
                <span className="comparison-label label-after">{c.after}</span>
                <div className="comparison-divider">
                  <span>
                    ‹<span />›
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={comparison}
                  onChange={(event) =>
                    setComparison(Number(event.target.value))
                  }
                  aria-label={c.slider}
                  aria-valuetext={`${c.before}: ${comparison}%, ${c.after}: ${100 - comparison}%`}
                />
              </div>
              <p className="fine-print">{c.galleryNote}</p>
            </div>
          </div>
        </section>

        <section className="quote-section container">
          <Sparkle className="section-sparkle" />
          <blockquote>“{c.quote}”</blockquote>
          <p className="eyebrow">{c.quoteAuthor}</p>
        </section>

        <section
          className="faq-section section-pad container"
          aria-labelledby="faq-heading"
        >
          <div>
            <p className="eyebrow">{c.faqLabel}</p>
            <h2 id="faq-heading">
              {c.faqTitle}
              <em>{c.faqItalic}</em>
            </h2>
          </div>
          <div className="faq-list">
            {c.faqs.map(([question, answer], index) => (
              <details key={index}>
                <summary>
                  {question}
                  <span className="faq-plus" aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="connect" className="contact-section">
          <div className="contact-orbit orbit-one" aria-hidden="true" />
          <div className="contact-orbit orbit-two" aria-hidden="true" />
          <div className="container contact-inner">
            <Sparkle className="section-sparkle" />
            <p className="eyebrow">{c.contactLabel}</p>
            <h2>
              {c.contactTitle}
              <em>{c.contactItalic}</em>
            </h2>
            <p className="contact-body">{c.contactBody}</p>
            <ExternalLink className="button button-light">
              {c.contactCta}
              <Arrow diagonal />
            </ExternalLink>
            <p className="contact-note">
              <span className="status-dot" />
              {c.contactNote}
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer container">
        <div className="footer-main">
          <div>
            <Logo footer />
            <p>{c.footerTag}</p>
          </div>
          <div className="footer-nav">
            <p className="eyebrow">{c.footerExplore}</p>
            {c.nav.map((label, index) => (
              <a key={index} href={`#${sections[index]}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-social">
            <p className="eyebrow">{c.footerFollow}</p>
            <ExternalLink>
              {practice.instagramHandle}
              <Arrow diagonal />
            </ExternalLink>
            <span>{c.contactNote}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {practice.name}. {c.rights}
          </p>
          <button onClick={() => setModal('privacy')}>{c.privacy}</button>
          <a href="#home">
            {c.backToTop}
            <span>↑</span>
          </a>
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        onCancel={() => setModal(null)}
        onClose={() => setModal(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setModal(null)
        }}
        aria-labelledby="dialog-heading"
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            autoFocus
            aria-label={c.close}
            onClick={() => setModal(null)}
          >
            <span />
            <span />
          </button>
          {modal === 'privacy' ? (
            <>
              <p className="eyebrow">PASTRANA DENTAL</p>
              <h2 id="dialog-heading">{c.privacyTitle}</h2>
              <p>{c.privacyBody}</p>
            </>
          ) : typeof modal === 'number' ? (
            <>
              <CareDrawing type={modal} />
              <p className="eyebrow">{c.careLabel}</p>
              <h2 id="dialog-heading">{c.services[modal].title}</h2>
              <p>{c.services[modal].detail}</p>
              <button className="button" onClick={() => setModal('contact')}>
                {c.serviceCta}
                <Arrow />
              </button>
            </>
          ) : (
            <>
              <Sparkle className="section-sparkle" />
              <p className="eyebrow">{c.dialogEyebrow}</p>
              <h2 id="dialog-heading">
                {c.dialogTitle}
                <em>{c.dialogItalic}</em>
              </h2>
              <p>{c.dialogBody}</p>
              <ExternalLink className="button">
                {c.contactCta}
                <Arrow diagonal />
              </ExternalLink>
              <p className="fine-print">{c.dialogNote}</p>
            </>
          )}
        </div>
      </dialog>
    </>
  )
}
