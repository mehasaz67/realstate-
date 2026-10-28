import { Link } from 'react-router-dom'
import { ArrowRight } from './Icons'

/**
 * Shared button. Renders a router Link, an anchor, or a <button> depending on
 * the props it receives, so CTAs stay a single, consistent component.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'dark',
  size,
  block = false,
  arrow = false,
  className = '',
  type = 'button',
  icon,
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'sm' ? 'btn--sm' : '',
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {icon ? <span className="btn__icon">{icon}</span> : null}
      <span>{children}</span>
      {arrow ? (
        <span className="btn__icon btn__icon--arrow">
          <ArrowRight width={17} height={17} />
        </span>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
