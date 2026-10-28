import { Link, useParams } from 'react-router-dom'
import { agentById, getProperty, photo, similarProperties } from '../data/properties'
import { useFavorites } from '../context/FavoritesContext'
import PropertyGallery from '../components/property/PropertyGallery'
import PropertyCard from '../components/property/PropertyCard'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import { Bath, Bed, Calendar, Check, Heart, MapPin, Ruler } from '../components/ui/Icons'
import './PropertyDetail.css'

export default function PropertyDetail() {
  const { id } = useParams()
  const property = getProperty(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!property) {
    return (
      <section className="page-shell section detail-missing">
        <div className="container">
          <SectionLabel>Not found</SectionLabel>
          <h1 className="title-lg">We could not find that residence</h1>
          <p className="lead">
            It may have been withdrawn from the portfolio. Browse the current listings to see what
            is available now.
          </p>
          <Button to="/properties" arrow>
            View all properties
          </Button>
        </div>
      </section>
    )
  }

  const agent = agentById(property.agentId)
  const similar = similarProperties(property, 3)
  const saved = isFavorite(property.id)
  const contactHref = (intent) => `/contact?property=${property.id}&intent=${intent}`

  return (
    <article className="detail">
      <div className="container detail__top">
        <nav className="breadcrumb breadcrumb--dark" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/properties">Properties</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{property.name}</span>
        </nav>

        <PropertyGallery property={property} />
      </div>

      <div className="container detail__grid">
        <div className="detail__main">
          <header className="detail__head">
            <div className="detail__title-wrap">
              <p className="detail__loc">
                <MapPin width={15} height={15} />
                <span>{property.location}</span>
              </p>
              <h1 className="title-lg">{property.name}</h1>
              <p className="detail__tagline">{property.tagline}</p>
            </div>

            <div className="detail__price-box">
              <p className="detail__price">{property.priceLabel}</p>
              <p className="detail__price-note">Guide price</p>
            </div>
          </header>

          <ul className="specs">
            <li>
              <span className="specs__icon">
                <Bed width={19} height={19} />
              </span>
              <div>
                <p className="specs__label">Bedrooms</p>
                <p className="specs__value">{property.beds}</p>
              </div>
            </li>
            <li>
              <span className="specs__icon">
                <Bath width={19} height={19} />
              </span>
              <div>
                <p className="specs__label">Bathrooms</p>
                <p className="specs__value">{property.baths}</p>
              </div>
            </li>
            <li>
              <span className="specs__icon">
                <Ruler width={19} height={19} />
              </span>
              <div>
                <p className="specs__label">Interior</p>
                <p className="specs__value">{property.sqft.toLocaleString('en-US')} sq ft</p>
              </div>
            </li>
            <li>
              <span className="specs__icon">
                <Calendar width={19} height={19} />
              </span>
              <div>
                <p className="specs__label">Built</p>
                <p className="specs__value">{property.year}</p>
              </div>
            </li>
          </ul>

          <section className="detail__section">
            <h2 className="title-md">About this residence</h2>
            <p className="detail__body">{property.description}</p>
          </section>

          <section className="detail__section detail__two">
            <div>
              <h2 className="title-md">Key features</h2>
              <ul className="feature-list">
                {property.features.map((feature) => (
                  <li key={feature}>
                    <Check width={15} height={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="title-md">Amenities</h2>
              <ul className="chip-list">
                {property.amenities.map((amenity) => (
                  <li className="chip" key={amenity}>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="detail__section">
            <dl className="facts">
              <div>
                <dt>Property type</dt>
                <dd>{property.type}</dd>
              </div>
              <div>
                <dt>Lot</dt>
                <dd>{property.lot}</dd>
              </div>
              <div>
                <dt>Price per sq ft</dt>
                <dd>${Math.round(property.price / property.sqft).toLocaleString('en-US')}</dd>
              </div>
            </dl>
          </section>
        </div>

        <aside className="detail__aside" aria-label="Property advisor">
          <div className="agent-card">
            <p className="agent-card__eyebrow">Your advisor</p>

            <div className="agent-card__person">
              <img
                className="agent-card__photo"
                src={photo(agent.portrait, 200, 200)}
                alt={`Portrait of ${agent.name}`}
                width="200"
                height="200"
                loading="lazy"
              />
              <div>
                <p className="agent-card__name">{agent.name}</p>
                <p className="agent-card__role">{agent.role}</p>
                <a
                  className="agent-card__phone"
                  href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}
                >
                  {agent.phone}
                </a>
              </div>
            </div>

            <div className="agent-card__actions">
              <Button to={contactHref('inquiry')} arrow block>
                Contact agent
              </Button>
              <Button
                to={contactHref('viewing')}
                variant="outline"
                block
                icon={<Calendar width={16} height={16} />}
              >
                Schedule a viewing
              </Button>
            </div>

            <div className="agent-card__foot">
              <button
                type="button"
                className={`save-btn ${saved ? 'is-active' : ''}`.trim()}
                aria-pressed={saved}
                onClick={() => toggleFavorite(property.id)}
              >
                <Heart filled={saved} width={17} height={17} />
                {saved ? 'Saved' : 'Save this property'}
              </button>
              <a className="agent-card__link" href={`mailto:${agent.email}`}>
                Email
              </a>
            </div>
          </div>

          <p className="detail__disclaimer">
            Viewings are arranged privately, seven days a week. Reference {property.id.slice(0, 8)}.
          </p>
        </aside>
      </div>

      <section className="section detail__similar">
        <div className="container">
          <Reveal className="detail__similar-head">
            <SectionLabel>You may also like</SectionLabel>
            <h2 className="title-lg">Similar properties</h2>
          </Reveal>

          <div className="property-grid">
            {similar.map((item) => (
              <Reveal key={item.id}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mobile-cta">
        <div className="mobile-cta__price">
          <span>{property.priceLabel}</span>
          <small>{property.type}</small>
        </div>
        <div className="mobile-cta__actions">
          <Button to={contactHref('viewing')} variant="outline" size="sm">
            Viewing
          </Button>
          <Button to={contactHref('inquiry')} size="sm">
            Contact
          </Button>
        </div>
      </div>
    </article>
  )
}
