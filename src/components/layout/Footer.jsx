import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { brand, navLinks, services } from '../../data/site'
import { ArrowRight, Facebook, Instagram, LinkedIn, Phone, Mail, MapPin } from '../ui/Icons'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return

    const subject = encodeURIComponent('Newsletter signup')
    const body = encodeURIComponent(
      `Please add ${email.trim()} to the Horizon Properties new listings list.`,
    )
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              Horizon <span>Properties</span>
            </Link>
            <p className="footer__blurb">
              A boutique advisory for architecturally significant homes, private estates and
              long-term property investment.
            </p>
            <ul className="footer__social" aria-label="Social media">
              <li>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer noopener">
                  <Instagram width={18} height={18} />
                  <span className="sr-only">Horizon Properties on Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener">
                  <LinkedIn width={18} height={18} />
                  <span className="sr-only">Horizon Properties on LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer noopener">
                  <Facebook width={18} height={18} />
                  <span className="sr-only">Horizon Properties on Facebook</span>
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer__col" aria-label="Footer navigation">
            <h2 className="footer__title">Explore</h2>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Services">
            <h2 className="footer__title">Services</h2>
            <ul className="footer__list">
              {services.slice(0, 4).map((service) => (
                <li key={service.title}>
                  <Link to="/#services">{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--contact">
            <h2 className="footer__title">Contact</h2>
            <ul className="footer__list footer__list--contact">
              <li>
                <a href={brand.phoneHref}>
                  <Phone width={16} height={16} />
                  <span>{brand.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`}>
                  <Mail width={16} height={16} />
                  <span>{brand.email}</span>
                </a>
              </li>
              <li>
                <span className="footer__address">
                  <MapPin width={16} height={16} />
                  <span>{brand.address}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__newsletter">
          <div>
            <h2 className="footer__title footer__title--light">New listings, first</h2>
            <p className="footer__newsletter-copy">
              A short monthly note on homes coming to market — no more than that.
            </p>
          </div>

          <form className="footer__form" onSubmit={handleSubscribe} noValidate>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setStatus('idle')
              }}
              required
            />
            <button type="submit" className="footer__form-btn">
              Subscribe
              <ArrowRight width={16} height={16} />
            </button>
            {status === 'sent' ? (
              <p className="footer__form-note" role="status">
                Your email app has opened — send the message and we will add you to the list.
              </p>
            ) : (
              <p className="footer__form-note">
                Opening the form sends a short email to {brand.email}.
              </p>
            )}
          </form>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <p className="footer__legal">
            <span>Licensed Texas real estate brokerage</span>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${brand.email}?subject=Privacy%20request`}>Privacy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
