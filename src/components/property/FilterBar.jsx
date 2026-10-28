import { ChevronDown, Close, Search } from '../ui/Icons'

const BED_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
]

const BATH_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'size', label: 'Largest first' },
  { value: 'newest', label: 'Newest built' },
]

function Select({ id, label, value, options, onChange }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="field__control">
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={`${id}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown width={15} height={15} aria-hidden="true" />
      </div>
    </div>
  )
}

export default function FilterBar({
  filters,
  locations,
  types,
  prices,
  onChange,
  onReset,
  savedOnly,
  onToggleSaved,
  savedCount,
  isFiltered,
}) {
  return (
    <div className="filters" role="search" aria-label="Filter properties">
      <div className="filters__search">
        <Search width={18} height={18} aria-hidden="true" />
        <label className="sr-only" htmlFor="property-search">
          Search properties
        </label>
        <input
          id="property-search"
          type="search"
          placeholder="Search by name, city or type"
          value={filters.q}
          onChange={(event) => onChange('q', event.target.value)}
        />
        {filters.q ? (
          <button
            type="button"
            className="filters__clear"
            onClick={() => onChange('q', '')}
            aria-label="Clear search"
          >
            <Close width={15} height={15} />
          </button>
        ) : null}
      </div>

      <div className="filters__grid">
        <Select
          id="filter-location"
          label="Location"
          value={filters.location}
          onChange={(value) => onChange('location', value)}
          options={[
            { value: 'any', label: 'All locations' },
            ...locations.map((location) => ({ value: location, label: location })),
          ]}
        />
        <Select
          id="filter-type"
          label="Property type"
          value={filters.type}
          onChange={(value) => onChange('type', value)}
          options={[
            { value: 'any', label: 'All types' },
            ...types.map((type) => ({ value: type, label: type })),
          ]}
        />
        <Select
          id="filter-price"
          label="Price"
          value={filters.price}
          onChange={(value) => onChange('price', value)}
          options={prices}
        />
        <Select
          id="filter-beds"
          label="Bedrooms"
          value={filters.beds}
          onChange={(value) => onChange('beds', value)}
          options={BED_OPTIONS}
        />
        <Select
          id="filter-baths"
          label="Bathrooms"
          value={filters.baths}
          onChange={(value) => onChange('baths', value)}
          options={BATH_OPTIONS}
        />
        <Select
          id="filter-sort"
          label="Sort by"
          value={filters.sort}
          onChange={(value) => onChange('sort', value)}
          options={SORT_OPTIONS}
        />
      </div>

      <div className="filters__foot">
        <button
          type="button"
          className={`filter-chip ${savedOnly ? 'is-active' : ''}`.trim()}
          onClick={onToggleSaved}
          aria-pressed={savedOnly}
        >
          Saved properties
          <span className="filter-chip__count">{savedCount}</span>
        </button>

        {isFiltered ? (
          <button type="button" className="filters__reset" onClick={onReset}>
            Reset filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
