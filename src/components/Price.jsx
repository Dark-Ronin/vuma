import { formatMT } from '../utils/helpers'

export default function Price({ price, oldPrice, size = 'md' }) {
  return (
    <div className={`price price-${size}`}>
      <span className="price-now">{formatMT(price)}</span>
      {oldPrice && <s className="price-old">{formatMT(oldPrice)}</s>}
    </div>
  )
}
