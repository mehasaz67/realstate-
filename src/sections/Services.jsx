import { photo } from '../data/properties'
import { services } from '../data/site'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import './Services.css'

const servicesImage = 'photo-1600210492486-724fe5c67fb0'

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container services__grid">
        <div className="services__aside">
          <Reveal className="services__intro">
            <SectionLabel>Services</SectionLabel>
            <h2 className="title-lg">Considered advice, end to end</h2>
            <p className="lead">
              We work across the full arc of a property decision — from the first quiet
              conversation to the day the keys change hands.
            </p>
          </Reveal>

          <Reveal className="services__media media media--zoom" delay={120}>
            <img
              src={photo(servicesImage, 900, 1100)}
              alt="A calm, light-filled living room in a Horizon Properties listing"
              width="900"
              height="1100"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
        </div>

        <ol className="services__list">
          {services.map((service, index) => (
            <Reveal as="li" className="service" key={service.title} delay={index * 60}>
              <span className="service__index">{String(index + 1).padStart(2, '0')}</span>
              <div className="service__body">
                <h3 className="service__title">{service.title}</h3>
                <p className="service__copy">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
