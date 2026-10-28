import { useState } from 'react'
import { photo } from '../data/properties'
import { aboutImages } from '../data/site'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import { ArrowRight } from '../components/ui/Icons'
import './About.css'

export default function About() {
  const [index, setIndex] = useState(0)
  const aside = aboutImages.gallery[index]

  const nextPhoto = () =>
    setIndex((current) => (current + 1) % aboutImages.gallery.length)

  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <Reveal className="about__copy">
          <SectionLabel>About Us</SectionLabel>
          <h2 className="title-lg about__title">Who We Are</h2>
          <p className="lead about__lead">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>
          <div className="about__actions">
            <Button to="/properties" arrow>
              Learn More
            </Button>
            <p className="about__note">18 years advising private buyers and sellers.</p>
          </div>
        </Reveal>

        <Reveal className="about__media" delay={120}>
          <figure className="about__main media media--zoom">
            <img
              src={photo(aboutImages.main, 1200, 980)}
              alt="A contemporary villa with a pool and palm planting, photographed at dusk"
              width="1200"
              height="980"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className="about__aside media media--zoom" key={aside}>
            <img
              src={photo(aside, 640, 900)}
              alt="Interior detail of a Horizon Properties residence"
              width="640"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <button
            type="button"
            className="about__next"
            onClick={nextPhoto}
            aria-label="Show the next photograph"
          >
            <ArrowRight width={19} height={19} />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
