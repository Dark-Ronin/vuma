import { Link } from 'react-router-dom'

export default function CategoryCard({ category: c }) {
  return (
    <Link to={`/products?category=${c.id}`} className="ccard" style={{ '--hue': c.hue }}>
      <span className="ccard-icon" aria-hidden="true">{c.icon}</span>
      <span className="ccard-name">{c.name}</span>
    </Link>
  )
}
