export default function SectionLabel({ children, rule = true, className = '' }) {
  return <p className={`label ${rule ? 'label--rule' : ''} ${className}`.trim()}>{children}</p>
}
