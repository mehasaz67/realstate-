import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import { Key } from '../components/ui/Icons'
import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <Reveal className="cta-band__icon" aria-hidden="true">
          <Key width={26} height={26} />
        </Reveal>

        <Reveal className="cta-band__copy" delay={70}>
          <h2 className="title-md" id="cta-title">
            Ready to Find Your Perfect Property?
          </h2>
          <p>Let our experts guide you to the right home or investment.</p>
        </Reveal>

        <Reveal className="cta-band__action" delay={140}>
          <Button to="/contact" arrow>
            Get in Touch
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
