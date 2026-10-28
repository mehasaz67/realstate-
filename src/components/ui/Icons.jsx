/* Small, dependency-free icon set (1.5px stroke, currentColor). */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const ArrowLeft = (props) => (
  <svg {...base} {...props}>
    <path d="M20 12H5" />
    <path d="m11 18-6-6 6-6" />
  </svg>
)

export const ArrowUpRight = (props) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

export const ChevronDown = (props) => (
  <svg {...base} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const Phone = (props) => (
  <svg {...base} {...props}>
    <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13 11 21 19.4 21A1.5 1.5 0 0 0 21 19.5v-2a1.4 1.4 0 0 0-1.1-1.4l-2.7-.6a1.4 1.4 0 0 0-1.4.5l-.8 1a13.6 13.6 0 0 1-5.6-5.6l1-.8a1.4 1.4 0 0 0 .5-1.4l-.6-2.7A1.4 1.4 0 0 0 6.5 3Z" />
  </svg>
)

export const Mail = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
)

export const MapPin = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const Key = (props) => (
  <svg {...base} {...props}>
    <circle cx="8" cy="8" r="4.2" />
    <path d="m11 11 8 8" />
    <path d="m16 16 2.2-2.2" />
    <path d="m19 19 1.8-1.8" />
  </svg>
)

export const Heart = ({ filled = false, ...props }) => (
  <svg {...base} {...props} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.7a4.1 4.1 0 0 1 7.5 2.9C19.5 15.4 12 20 12 20Z" />
  </svg>
)

export const Close = (props) => (
  <svg {...base} {...props}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
)

export const Check = (props) => (
  <svg {...base} {...props}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
)

export const Bed = (props) => (
  <svg {...base} {...props}>
    <path d="M3 18v-8" />
    <path d="M3 14h18v4" />
    <path d="M21 18v-4a2 2 0 0 0-2-2h-7v2" />
    <circle cx="7" cy="10.5" r="1.8" />
  </svg>
)

export const Bath = (props) => (
  <svg {...base} {...props}>
    <path d="M3 12h18" />
    <path d="M5 12v3a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3" />
    <path d="M7 12V6.5A2.5 2.5 0 0 1 9.5 4c1.3 0 2.2.9 2.4 2" />
    <path d="m8 21-1 1.5M16 21l1 1.5" />
  </svg>
)

export const Ruler = (props) => (
  <svg {...base} {...props}>
    <path d="M4 15 15 4l5 5L9 20z" />
    <path d="m8 11 2 2M11 8l2 2M14 5l2 2" />
  </svg>
)

export const Calendar = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </svg>
)

export const Search = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
)

export const Sliders = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h11M19 17h1" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

export const CheckCircle = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
)

export const Instagram = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const LinkedIn = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5V17M8 7.6v.1M12 17v-3.6a2 2 0 0 1 4 0V17" />
  </svg>
)

export const Facebook = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 8.5h2V5.7h-2.2c-2 0-3.3 1.3-3.3 3.4v1.6H9v2.8h2v6.8h3v-6.8h2.3l.4-2.8h-2.7V9.5c0-.6.2-1 1-1Z" />
  </svg>
)

export const Building = (props) => (
  <svg {...base} {...props}>
    <path d="M4 21V9l5-3v15" />
    <path d="M9 21V5l7 4v12" />
    <path d="M16 21V11l4-2v12" />
    <path d="M2.5 21h19" />
  </svg>
)

export default {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Key,
  Heart,
  Close,
  Check,
  Bed,
  Bath,
  Ruler,
  Calendar,
  Search,
  Sliders,
  CheckCircle,
  Instagram,
  LinkedIn,
  Facebook,
  Building,
}
