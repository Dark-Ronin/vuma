export default function QuantitySelector({ value, onChange, max = 99 }) {
  return (
    <div className="qty" role="group" aria-label="Quantidade">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Diminuir quantidade">−</button>
      <span className="qty-value" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Aumentar quantidade">+</button>
    </div>
  )
}
