import { photo } from '../data/properties'
import { advantages, stats, testimonial } from '../data/site'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import { Check } from '../components/ui/Icons'
import './WhyChoose.css'

const whyImage = 'photo-1582268611958-ebfd161ef9cf'

export default function WhyChoose() {
  return (
    <section className="section why" id="why">
      <div className="container why__grid">
        <Reveal className="why__copy">
          <SectionLabel>Why Horizon</SectionLabel>
          <h2 className="title-lg why__title">Why Choose Horizon</h2>
          <p className="lead why__lead">
            Most agencies sell volume. We work with a small number of clients each year so that
            every search, valuation and negotiation gets the attention it deserves.
          </p>

          <ul className="why__list">
            {advantages.map((item) => (
              <li className="why__item" key={item.title}>
                <span className="why__check" aria-hidden="true">
                  <Check width={14} height={14} />
                </span>
                <div>
                  <h3 className="why__item-title">{item.title}</h3>
                  <p className="why__item-copy">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="why__panel" delay={140}>
          <figure className="why__media media media--zoom">
            <img
              src={photo(whyImage, 1000, 1150)}
              alt="A modern residence at night with warm interior lighting and a reflecting pool"
              width="1000"
              height="1150"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <dl className="why__stats">
            {stats.map((stat) => (
              <div className="why__stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="container">
        <Reveal className="why__quote-wrap">
          <blockquote className="why__quote">
            <p>“{testimonial.quote}”</p>
            <footer>
              <span className="why__quote-name">{testimonial.name}</span>
              <span className="why__quote-detail">{testimonial.detail}</span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
