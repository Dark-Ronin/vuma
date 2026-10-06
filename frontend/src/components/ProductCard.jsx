import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import Badge from './Badge'
import Rating from './Rating'
import Price from './Price'

export default function ProductCard({ product: p }) {
  const { addToCart, toggleWishlist, isWished } = useStore()
  const wished = isWished(p.id)
  const out = p.stock < 1

  return (
    <article className={`pcard${out ? ' is-out' : ''}`}>
      <button
        type="button"
        className={`wish${wished ? ' on' : ''}`}
        aria-pressed={wished}
        aria-label={wished ? `Remover ${p.name} dos favoritos` : `Guardar ${p.name} nos favoritos`}
        onClick={() => toggleWishlist(p.id)}
      >
        {wished ? '♥' : '♡'}
      </button>
      <div className="pcard-img">
        <img src={p.images[0]} alt={p.name} loading="lazy" />
        <div className="pcard-badges">
          {p.discount > 0 && <Badge variant="deal">−{p.discount}%</Badge>}
          {p.isNew && <Badge variant="new">Novo</Badge>}
        </div>
      </div>
      <div className="pcard-body">
        <span className="pcard-cat">{p.categoryName}</span>
        <h3 className="pcard-name">
          <Link to={`/products/${p.id}`} className="stretched">{p.name}</Link>
        </h3>
        <Rating value={p.rating} count={p.reviews} />
        <Price price={p.price} oldPrice={p.oldPrice} />
        <span className="pcard-seller">Vendido por <b>{p.seller}</b></span>
        {out ? (
          <button type="button" className="btn btn-secondary btn-md btn-block" disabled>Indisponível</button>
        ) : (
          <button type="button" className="btn btn-primary btn-md btn-block pcard-add" onClick={() => addToCart(p.id)}>
            Adicionar ao carrinho
          </button>
        )}
      </div>
    </article>
  )
}
