import { photo } from '../data/properties'
import { team } from '../data/site'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import { ArrowUpRight, Mail, Phone } from '../components/ui/Icons'
import { Link } from 'react-router-dom'
import './Team.css'

const mailTo = (email) => `mailto:${email}`

export default function Team() {
  return (
    <section className="section team" id="team">
      <div className="container">
        <Reveal className="team__head">
          <div className="section-head section-head--center">
            <SectionLabel>Our Team</SectionLabel>
            <h2 className="title-lg">People you will actually work with</h2>
            <p className="lead team__sub">
              Four senior advisors, one point of contact, and a direct line to the person
              handling your search.
            </p>
          </div>
        </Reveal>

        <ul className="team__grid">
          {team.map((member, index) => (
            <Reveal as="li" className="member" key={member.id} delay={index * 70}>
              <div className="member__media media media--zoom">
                <img
                  src={photo(member.portrait, 700, 880)}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  width="700"
                  height="880"
                  loading="lazy"
                  decoding="async"
                />
                <div className="member__links">
                  <a href={mailTo(member.email)} aria-label={`Email ${member.name}`}>
                    <Mail width={16} height={16} />
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/[^\d+]/g, '')}`}
                    aria-label={`Call ${member.name}`}
                  >
                    <Phone width={16} height={16} />
                  </a>
                </div>
              </div>

              <div className="member__body">
                <h3 className="member__name">{member.name}</h3>
                <p className="member__role">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="team__foot" delay={120}>
          <p className="body-sm">Prefer to speak with a specific advisor?</p>
          <Link to="/contact" className="link-arrow">
            Arrange a conversation
            <ArrowUpRight width={15} height={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
