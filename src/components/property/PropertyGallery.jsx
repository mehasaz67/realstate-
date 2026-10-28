import { useCallback, useEffect, useRef, useState } from 'react'
import { photo } from '../../data/properties'
import FavoriteButton from '../ui/FavoriteButton'
import { ArrowLeft, ArrowRight, Close } from '../ui/Icons'
import './PropertyGallery.css'

export default function PropertyGallery({ property }) {
  const { images, name, id } = property
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const closeRef = useRef(null)
  const lastTrigger = useRef(null)

  const next = useCallback(
    () => setActive((current) => (current + 1) % images.length),
    [images.length],
  )
  const prev = useCallback(
    () => setActive((current) => (current - 1 + images.length) % images.length),
    [images.length],
  )

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lastTrigger.current?.focus()
    }
  }, [open, next, prev])

  const openViewer = (event) => {
    lastTrigger.current = event.currentTarget
    setOpen(true)
  }

  return (
    <div className="gallery">
      <figure className="gallery__main">
        <button
          type="button"
          className="gallery__open"
          onClick={openViewer}
          aria-label={`Open the full-screen gallery — ${name}, ${images.length} photographs`}
        >
          <img
            key={images[active]}
            className="gallery__img"
            src={photo(images[active], 1800, 1100)}
            alt={`${name} — photograph ${active + 1} of ${images.length}`}
            width="1800"
            height="1100"
            fetchpriority="high"
            decoding="async"
          />
        </button>

        <FavoriteButton id={id} name={name} size="lg" className="gallery__fav" />

        <button type="button" className="gallery__view" onClick={openViewer}>
          View all photos
          <span className="gallery__count">{images.length}</span>
        </button>
      </figure>

      <ul className="gallery__thumbs">
        {images.map((image, index) => (
          <li key={image}>
            <button
              type="button"
              className={`gallery__thumb ${index === active ? 'is-active' : ''}`.trim()}
              onClick={() => setActive(index)}
              aria-label={`Show photograph ${index + 1} of ${images.length}`}
              aria-pressed={index === active}
            >
              <img src={photo(image, 320, 240)} alt="" width="320" height="240" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} photo gallery`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="lightbox__bar">
            <p className="lightbox__count">
              {active + 1} <span>/ {images.length}</span>
            </p>
            <button
              type="button"
              className="lightbox__close"
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
            >
              <Close width={20} height={20} />
            </button>
          </div>

          <div className="lightbox__stage">
            <button type="button" className="lightbox__nav" onClick={prev} aria-label="Previous photograph">
              <ArrowLeft width={20} height={20} />
            </button>

            <img
              key={`viewer-${images[active]}`}
              src={photo(images[active], 1800, 1200, 86)}
              alt={`${name} — photograph ${active + 1} of ${images.length}`}
              width="1800"
              height="1200"
            />

            <button type="button" className="lightbox__nav" onClick={next} aria-label="Next photograph">
              <ArrowRight width={20} height={20} />
            </button>
          </div>

          <p className="lightbox__hint">Use ← → to browse · Esc to close</p>
        </div>
      ) : null}
    </div>
  )
}
