import { useFavorites } from '../../context/FavoritesContext'
import { Heart } from './Icons'
import './FavoriteButton.css'

export default function FavoriteButton({ id, name, className = '', size = 'md' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      type="button"
      className={`fav fav--${size} ${active ? 'is-active' : ''} ${className}`.trim()}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from saved properties` : `Save ${name} to saved properties`}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(id)
      }}
    >
      <Heart filled={active} width={size === 'lg' ? 20 : 18} height={size === 'lg' ? 20 : 18} />
    </button>
  )
}
