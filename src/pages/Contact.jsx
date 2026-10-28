import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { brand, team } from '../data/site'
import { agentById, getProperty, photo } from '../data/properties'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import { CheckCircle, Mail, MapPin, Phone } from '../components/ui/Icons'
import './Contact.css'

const INTERESTS = [
  'Buying a home',
  'Selling a property',
  'Property investment',
  'Relocation services',
  'General enquiry',
]

export default function Contact() {
  const [params] = useSearchParams()
  const propertyId = params.get('property')
  const property = propertyId ? getProperty(propertyId) : null
  const intent = params.get('intent') === 'viewing' ? 'viewing' : 'inquiry'
  const agent = agentById(property ? property.agentId : team[0].id)

  const initialForm = {
    name: '',
    email: '',
    phone: '',
    interest: INTERESTS[0],
    message: property
      ? intent === 'viewing'
        ? `I would like to arrange a viewing of ${property.name} (${property.location}). My preferred times are: `
        : `I am interested in ${property.name} (${property.location}). Could you send me more details?`
      : '',
  }

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setSent(false)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.email.trim()) next.email = 'Please add an email address so we can reply.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'That email address looks incomplete.'
    if (form.message.trim().length < 10)
      next.message = 'A sentence or two about what you need helps us prepare.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const subject =
      property && intent === 'viewing'
        ? `Viewing request — ${property.name}`
        : property
          ? `Enquiry — ${property.name}`
          : `Website enquiry — ${form.interest}`

    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      `Interest: ${form.interest}`,
      property ? `Property: ${property.name} — ${property.location}` : null,
      '',
      form.message.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `mailto:${agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const resetForm = () => {
    setForm(initialForm)
    setErrors({})
    setSent(false)
  }

  return (
    <>
      <section className="page-head page-head--compact">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact</span>
          </nav>

          <div className="page-head__copy">
            <SectionLabel>Contact</SectionLabel>
            <h1 className="title-lg">Let’s talk property</h1>
            <p className="lead">
              Tell us what you are looking for and one senior advisor will reply personally —
              usually the same working day.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tight contact">
        <div className="container contact__grid">
          <Reveal className="contact__form-wrap">
            {property ? (
              <div className="context-banner">
                <div>
                  <p className="context-banner__label">
                    {intent === 'viewing' ? 'Scheduling a viewing' : 'Property enquiry'}
                  </p>
                  <p className="context-banner__name">
                    {property.name}
                    <span>{property.location}</span>
                  </p>
                </div>
                <Link to={`/properties/${property.id}`} className="context-banner__link">
                  View property
                </Link>
              </div>
            ) : null}

            {sent ? (
              <div className="contact-form contact-form--sent" role="status">
                <span className="contact-form__icon">
                  <CheckCircle width={26} height={26} />
                </span>
                <h2 className="title-md">Your message is ready to send</h2>
                <p>
                  We opened your email app with the details addressed to {agent.name} (
                  {agent.email}). Send it whenever you are ready — nothing is shared with anyone
                  else.
                </p>
                <div className="contact-form__sent-actions">
                  <Button variant="outline" onClick={resetForm}>
                    Write another message
                  </Button>
                  <a className="link-arrow" href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}>
                    Or call {agent.phone}
                  </a>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="title-md">Send an enquiry</h2>

                <div className="contact-form__row">
                  <div className="cf-field">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      required
                    />
                    {errors.name ? (
                      <p className="cf-error" id="name-error">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="cf-field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(event) => update('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email ? (
                      <p className="cf-error" id="email-error">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="cf-field">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => update('phone', event.target.value)}
                    />
                  </div>

                  <div className="cf-field">
                    <label htmlFor="interest">I am interested in</label>
                    <select
                      id="interest"
                      name="interest"
                      value={form.interest}
                      onChange={(event) => update('interest', event.target.value)}
                    >
                      {INTERESTS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="cf-field">
                  <label htmlFor="message">How can we help?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={(event) => update('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message ? (
                    <p className="cf-error" id="message-error">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="contact-form__actions">
                  <Button type="submit" arrow>
                    Send message
                  </Button>
                  <p className="contact-form__note">
                    Sending opens your email app with the message prepared for {agent.email}.
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal className="contact__aside" delay={120}>
            <div className="contact-card">
              <p className="contact-card__eyebrow">{property ? 'Property advisor' : 'Your contact'}</p>
              <div className="contact-card__person">
                <img
                  src={photo(agent.portrait, 220, 220)}
                  alt={`Portrait of ${agent.name}`}
                  width="220"
                  height="220"
                  loading="lazy"
                />
                <div>
                  <p className="contact-card__name">{agent.name}</p>
                  <p className="contact-card__role">{agent.role}</p>
                </div>
              </div>

              <ul className="contact-card__list">
                <li>
                  <a href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}>
                    <Phone width={16} height={16} />
                    <span>{agent.phone}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${agent.email}`}>
                    <Mail width={16} height={16} />
                    <span>{agent.email}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="office">
              <h2 className="office__title">Austin studio</h2>
              <ul className="office__list">
                <li>
                  <MapPin width={16} height={16} />
                  <span>{brand.address}</span>
                </li>
                <li>
                  <Phone width={16} height={16} />
                  <a href={brand.phoneHref}>{brand.phone}</a>
                </li>
                <li>
                  <Mail width={16} height={16} />
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </li>
              </ul>
              <p className="office__hours">{brand.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
