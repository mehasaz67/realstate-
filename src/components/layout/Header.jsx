import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { brand, navLinks } from '../../data/site'
import { Building, Phone } from '../ui/Icons'
import './Header.css'

const isActive = (to, pathname, hash) => {
  const [path, id] = to.split('#')
  const target = path || '/'

  if (id) return pathname === target && hash === `#${id}`
  if (target === '/') return pathname === '/' && !hash
  if (target === '/properties') return pathname.startsWith('/properties')
  return pathname === target
}

export default function Header() {
  const { pathname, hash } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = pathname !== '/' || scrolled

  return (
    <header
      className={['header', solid ? 'header--solid' : '', open ? 'is-open' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="header__inner container">
        <Link to="/" className="brand" aria-label="Horizon Properties — home">
          <span className="brand__mark">
            <Building width={20} height={20} />
          </span>
          <span className="brand__text">
            <span className="brand__name">Horizon</span>
            <span className="brand__sub">Properties</span>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`header__link ${
                    isActive(link.to, pathname, hash) ? 'is-active' : ''
                  }`.trim()}
                  aria-current={isActive(link.to, pathname, hash) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={brand.phoneHref}>
            <Phone width={16} height={16} />
            <span>{brand.phone}</span>
          </a>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-nav" id="mobile-nav">
          <nav aria-label="Mobile">
            <ul className="mobile-nav__links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="mobile-nav__link">
                    <span>{link.label}</span>
                    <span className="mobile-nav__index">
                      {String(navLinks.indexOf(link) + 1).padStart(2, '0')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-nav__foot">
            <a className="btn btn--light btn--block" href={brand.phoneHref}>
              <span className="btn__icon">
                <Phone width={17} height={17} />
              </span>
              <span>{brand.phone}</span>
            </a>
            <p className="mobile-nav__note">
              {brand.address}
              <br />
              {brand.hours}
            </p>
          </div>
        </div>
      ) : null}
    </header>
  )
}
