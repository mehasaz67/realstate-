import { useCallback, useEffect, useRef, useState } from 'react'
import PropertyCard from './PropertyCard'
import { ArrowLeft, ArrowRight } from '../ui/Icons'
import './PropertyCarousel.css'

/**
 * Horizontal, snap-scrolling property rail.
 * Supports buttons, keyboard arrows and pointer dragging (mouse + touch).
 */
export default function PropertyCarousel({ items, label = 'Property carousel' }) {
  const trackRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth - 2
    setEdges({ start: track.scrollLeft <= 2, end: track.scrollLeft >= max })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    updateEdges()
    track.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)

    return () => {
      track.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges, items.length])

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.pcard')
    const gap = parseFloat(getComputedStyle(track).columnGap || '24') || 24
    const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  const handlePointerDown = (event) => {
    const track = trackRef.current
    if (!track) return
    if (event.pointerType === 'mouse' && event.button !== 0) return

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
      pointerId: event.pointerId,
    }
  }

  const handlePointerMove = (event) => {
    const track = trackRef.current
    const drag = dragRef.current
    if (!track || !drag.active) return

    const delta = event.clientX - drag.startX
    drag.moved = Math.max(drag.moved, Math.abs(delta))

    if (drag.moved > 5) {
      if (!track.hasPointerCapture?.(drag.pointerId)) {
        try {
          track.setPointerCapture(drag.pointerId)
        } catch {
          /* pointer capture is best-effort */
        }
      }
      track.scrollLeft = drag.startScroll - delta
    }
  }

  const handlePointerUp = () => {
    dragRef.current.active = false
  }

  // A drag should not navigate into a property.
  const handleClickCapture = (event) => {
    if (dragRef.current.moved > 6) {
      event.preventDefault()
      event.stopPropagation()
    }
    dragRef.current.moved = 0
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    }
  }

  return (
    <div className="carousel">
      <div
        className="carousel__track"
        ref={trackRef}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClickCapture={handleClickCapture}
      >
        {items.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            className={index === 0 ? 'pcard--lead' : ''}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel__nav carousel__nav--prev"
        onClick={() => scrollByCard(-1)}
        disabled={edges.start}
        aria-label="Previous properties"
      >
        <ArrowLeft width={19} height={19} />
      </button>
      <button
        type="button"
        className="carousel__nav carousel__nav--next"
        onClick={() => scrollByCard(1)}
        disabled={edges.end}
        aria-label="Next properties"
      >
        <ArrowRight width={19} height={19} />
      </button>
    </div>
  )
}
