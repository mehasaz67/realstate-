import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="section notfound page-shell">
      <div className="container notfound__inner">
        <p className="label">404</p>
        <h1 className="title-lg">This page has moved on</h1>
        <p className="lead">
          The address you followed is no longer available. Browse the current portfolio or get in
          touch and we will point you in the right direction.
        </p>
        <div className="notfound__actions">
          <Button to="/properties" arrow>
            Browse properties
          </Button>
          <Link to="/" className="link-arrow">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
