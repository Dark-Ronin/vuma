import { Link } from 'react-router-dom'
import { products } from '../data/products'
import Rating from './Rating'

export function SellerLogo({ seller, size = 'md' }) {
  return (
    <span className={`slogo slogo-${size}`} style={{ '--hue': seller.hue }} aria-hidden="true">{seller.initials}</span>
  )
}

export default function SellerCard({ seller: s }) {
  const count = products.filter((p) => p.sellerId === s.id).length
  return (
    <article className="scard" style={{ '--hue': s.hue }}>
      <div className="scard-banner" />
      <SellerLogo seller={s} />
      <h3><Link to={`/stores/${s.id}`} className="stretched">{s.name}</Link></h3>
      <Rating value={s.rating} count={s.reviews} />
      <p className="scard-meta">{count} produtos · {s.city}</p>
    </article>
  )
}
