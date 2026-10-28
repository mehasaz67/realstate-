import { photo } from '../data/properties'
import { heroImage } from '../data/site'
import { ChevronDown } from '../components/ui/Icons'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src={photo(heroImage, 2000, 1250, 82)}
          alt="A modern villa at blue hour, with floor-to-ceiling glazing and a lit infinity pool"
          width="2000"
          height="1250"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__inner container">
        <p className="hero__label">Luxury real estate · Est. 2006</p>
        <h1 className="hero__title" id="hero-title">
          Discover Exceptional
          <br className="hero__break" /> Homes &amp; Investments
        </h1>
        <p className="hero__sub">
          Premium properties in prime locations. Find your dream home
          <br className="hero__break" /> or the perfect investment with confidence.
        </p>
      </div>

      <a className="hero__scroll" href="#about">
        <span>Explore</span>
        <ChevronDown width={16} height={16} />
      </a>
    </section>
  )
}
