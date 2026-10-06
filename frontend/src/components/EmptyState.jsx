import Button from './Button'

export default function EmptyState({ icon = '🛍️', title, text, actionTo, actionLabel }) {
  return (
    <div className="empty">
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {actionTo && <Button to={actionTo}>{actionLabel}</Button>}
    </div>
  )
}
