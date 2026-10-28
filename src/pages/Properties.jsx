import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { locations as allLocations, properties, propertyTypes } from '../data/properties'
import { useFavorites } from '../context/FavoritesContext'
import FilterBar from '../components/property/FilterBar'
import PropertyCard from '../components/property/PropertyCard'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SectionLabel from '../components/ui/SectionLabel'
import './Properties.css'

const PRICE_OPTIONS = [
  { value: 'any', label: 'Any price', min: 0, max: Infinity },
  { value: 'under-2', label: 'Under $2M', min: 0, max: 2000000 },
  { value: '2-3.5', label: '$2M – $3.5M', min: 2000000, max: 3500000 },
  { value: '3.5-5', label: '$3.5M – $5M', min: 3500000, max: 5000000 },
  { value: '5-plus', label: '$5M and above', min: 5000000, max: Infinity },
]

const DEFAULTS = {
  q: '',
  location: 'any',
  type: 'any',
  price: 'any',
  beds: 'any',
  baths: 'any',
  sort: 'featured',
}

const sortProperties = (list, sort) => {
  const sorted = [...list]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'size':
      return sorted.sort((a, b) => b.sqft - a.sqft)
    case 'newest':
      return sorted.sort((a, b) => b.year - a.year)
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
  }
}

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const { favorites } = useFavorites()

  const filters = {
    q: params.get('q') ?? DEFAULTS.q,
    location: params.get('location') ?? DEFAULTS.location,
    type: params.get('type') ?? DEFAULTS.type,
    price: params.get('price') ?? DEFAULTS.price,
    beds: params.get('beds') ?? DEFAULTS.beds,
    baths: params.get('baths') ?? DEFAULTS.baths,
    sort: params.get('sort') ?? DEFAULTS.sort,
  }
  const savedOnly = params.get('saved') === '1'

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    const isDefault = value === '' || value === 'any' || value === DEFAULTS[key]

    if (isDefault) next.delete(key)
    else next.set(key, value)

    setParams(next, { replace: true })
  }

  const toggleSaved = () => {
    const next = new URLSearchParams(params)
    if (savedOnly) next.delete('saved')
    else next.set('saved', '1')
    setParams(next, { replace: true })
  }

  const reset = () => setParams(new URLSearchParams(), { replace: true })

  const results = useMemo(() => {
    const query = filters.q.trim().toLowerCase()
    const priceRange = PRICE_OPTIONS.find((option) => option.value === filters.price) ?? PRICE_OPTIONS[0]

    const filtered = properties.filter((property) => {
      if (savedOnly && !favorites.includes(property.id)) return false

      if (query) {
        const haystack = `${property.name} ${property.location} ${property.city} ${property.region} ${property.type}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }

      if (filters.location !== 'any' && property.location !== filters.location) return false
      if (filters.type !== 'any' && property.type !== filters.type) return false
      if (property.price < priceRange.min || property.price > priceRange.max) return false
      if (filters.beds !== 'any' && property.beds < Number(filters.beds)) return false
      if (filters.baths !== 'any' && property.baths < Number(filters.baths)) return false
      return true
    })

    return sortProperties(filtered, filters.sort)
  }, [filters, savedOnly, favorites])

  const isFiltered =
    Object.keys(DEFAULTS).some((key) => filters[key] !== DEFAULTS[key]) || savedOnly

  return (
    <>
      <section className="page-head">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Properties</span>
          </nav>

          <div className="page-head__row">
            <div className="page-head__copy">
              <SectionLabel>Portfolio</SectionLabel>
              <h1 className="title-lg">Properties</h1>
              <p className="lead">
                A working portfolio of homes, estates and penthouses across the United States.
                Filter by location, size or budget, and speak with the advisor who knows each one.
              </p>
            </div>
            <dl className="page-head__stats">
              <div>
                <dt>Residences</dt>
                <dd>{properties.length}</dd>
              </div>
              <div>
                <dt>Cities</dt>
                <dd>{new Set(properties.map((item) => item.city)).size}</dd>
              </div>
              <div>
                <dt>From</dt>
                <dd>$1.85M</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--tight properties">
        <div className="container">
          <FilterBar
            filters={filters}
            onChange={update}
            onReset={reset}
            locations={allLocations}
            types={propertyTypes}
            prices={PRICE_OPTIONS}
            savedOnly={savedOnly}
            onToggleSaved={toggleSaved}
            savedCount={favorites.length}
            isFiltered={isFiltered}
          />

          <div className="properties__bar">
            <p className="properties__count" role="status" aria-live="polite">
              {results.length} {results.length === 1 ? 'residence' : 'residences'}
              {savedOnly ? ' saved' : ''}
            </p>
            {isFiltered ? (
              <button type="button" className="link-arrow" onClick={reset}>
                Clear all
              </button>
            ) : null}
          </div>

          {results.length > 0 ? (
            <div className="property-grid">
              {results.map((property, index) => (
                <Reveal key={property.id} delay={Math.min(index, 5) * 50}>
                  <PropertyCard property={property} eager={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2 className="title-md">
                {savedOnly ? 'No saved properties yet' : 'No residences match those filters'}
              </h2>
              <p>
                {savedOnly
                  ? 'Use the heart on any property to keep it here for later.'
                  : 'Try widening the price range, choosing another location, or searching for a city.'}
              </p>
              <Button variant="outline" onClick={reset}>
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
