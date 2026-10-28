import { featuredProperties } from '../data/properties'
import PropertyCarousel from '../components/property/PropertyCarousel'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/ui/Icons'
import './Featured.css'

export default function Featured() {
  return (
    <section className="section featured" id="featured">
      <div className="container">
        <Reveal className="featured__head">
          <div className="section-head section-head--center">
            <SectionLabel>Featured</SectionLabel>
            <h2 className="title-lg">Featured Properties</h2>
            <p className="lead featured__sub">
              A short, considered selection from our current portfolio — each residence vetted
              for architecture, setting and long-term value.
            </p>
          </div>
        </Reveal>
      </div>

      <PropertyCarousel items={featuredProperties} label="Featured properties" />

      <div className="container">
        <Reveal className="featured__foot">
          <Link to="/properties" className="link-arrow">
            View all properties
            <ArrowRight width={16} height={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
