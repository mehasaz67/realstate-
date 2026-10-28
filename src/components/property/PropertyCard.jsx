import { Link } from 'react-router-dom'
import { photo } from '../../data/properties'
import FavoriteButton from '../ui/FavoriteButton'
import { ArrowRight, MapPin } from '../ui/Icons'
import './PropertyCard.css'

/**
 * Reusable property card used by the featured carousel, the results grid and
 * the "similar properties" rail on detail pages.
 */
export default function PropertyCard({ property, eager = false, className = '' }) {
  const { id, name, location, priceLabel, type, beds, baths, sqft, images } = property

  return (
    <article className={`pcard ${className}`.trim()}>
      <div className="pcard__media media media--zoom">
        <img
          src={photo(images[0], 900, 1120)}
          alt={`${name} in ${location}`}
          width="900"
          height="1120"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="pcard__type">{type}</span>
        <FavoriteButton id={id} name={name} className="pcard__fav" />
      </div>

      <div className="pcard__body">
        <h3 className="pcard__name">
          <Link to={`/properties/${id}`} className="pcard__link">
            {name}
          </Link>
        </h3>

        <p className="pcard__loc">
          <MapPin width={14} height={14} />
          <span>{location}</span>
        </p>

        <dl className="pcard__meta">
          <div>
            <dt>Beds</dt>
            <dd>{beds}</dd>
          </div>
          <div>
            <dt>Baths</dt>
            <dd>{baths}</dd>
          </div>
          <div>
            <dt>Sq ft</dt>
            <dd>{sqft.toLocaleString('en-US')}</dd>
          </div>
        </dl>

        <div className="pcard__foot">
          <span className="pcard__price">{priceLabel}</span>
          <span className="pcard__cta" aria-hidden="true">
            View
            <ArrowRight width={15} height={15} />
          </span>
        </div>
      </div>
    </article>
  )
}
