export default function Rating({ value, count }) {
  const label = `Avaliação ${value.toFixed(1)} de 5${count != null ? `, ${count} avaliações` : ''}`
  return (
    <span className="rating" role="img" aria-label={label}>
      <span className="stars" style={{ '--pct': `${(value / 5) * 100}%` }} aria-hidden="true">★★★★★</span>
      <span className="rating-num" aria-hidden="true">{value.toFixed(1)}</span>
      {count != null && <span className="rating-count" aria-hidden="true">({count})</span>}
    </span>
  )
}
