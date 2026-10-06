import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, products } from '../../data/products'
import { sellers } from '../../data/sellers'
import { getReviews } from '../../data/reviews'
import { formatDate, shippingFor } from '../../utils/helpers'
import { FREE_SHIPPING_FROM } from '../../config'
import { formatMT } from '../../utils/helpers'
import { useStore } from '../../context/StoreContext'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import Rating from '../../components/Rating'
import Price from '../../components/Price'
import QuantitySelector from '../../components/QuantitySelector'
import ProductGrid from '../../components/ProductGrid'
import EmptyState from '../../components/EmptyState'
import { SellerLogo } from '../../components/SellerCard'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isWished } = useStore()
  const product = getProduct(id)
  const [img, setImg] = useState(0)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container page">
        <EmptyState icon="🧭" title="Produto não encontrado" text="Este produto pode ter sido removido." actionTo="/products" actionLabel="Ver todos os produtos" />
      </div>
    )
  }

  const p = product
  const seller = sellers.find((s) => s.id === p.sellerId)
  const sellerCount = products.filter((x) => x.sellerId === seller.id).length
  const out = p.stock < 1
  const wished = isWished(p.id)
  const reviews = getReviews(p.id)
  const related = [
    ...products.filter((x) => x.category === p.category && x.id !== p.id),
    ...products.filter((x) => x.category !== p.category && x.id !== p.id),
  ].slice(0, 4)
  const warranty = p.specifications.Garantia || '12 meses'

  const buyNow = () => {
    addToCart(p.id, qty, true)
    navigate('/checkout')
  }

  return (
    <div className="container page">
      <nav className="crumbs" aria-label="Localização">
        <Link to="/">Início</Link> / <Link to={`/products?category=${p.category}`}>{p.categoryName}</Link> / <span aria-current="page">{p.name}</span>
      </nav>

      <div className="pd">
        <div className="pd-gallery">
          <div className="pd-main"><img src={p.images[img]} alt={`${p.name} — imagem ${img + 1}`} /></div>
          <div className="pd-thumbs">
            {p.images.map((src, i) => (
              <button key={i} type="button" className={i === img ? 'on' : ''} onClick={() => setImg(i)} aria-label={`Ver imagem ${i + 1}`} aria-pressed={i === img}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="pd-info">
          <span className="pcard-cat">{p.categoryName}</span>
          <h1>{p.name}</h1>
          <Rating value={p.rating} count={p.reviews} />
          <div className="pd-price">
            <Price price={p.price} oldPrice={p.oldPrice} size="lg" />
            {p.discount > 0 && <Badge variant="deal">−{p.discount}%</Badge>}
          </div>
          <p className="pd-seller">Vendido por <Link to={`/stores/${seller.id}`}><b>{seller.name}</b></Link> · Expedido e entregue pela VUMA</p>
          <p className={`stock ${out ? 'out' : p.stock <= 5 ? 'low' : 'in'}`}>
            {out ? 'Indisponível de momento' : p.stock <= 5 ? `Últimas ${p.stock} unidades` : 'Em stock'}
          </p>

          {!out && (
            <div className="pd-buy">
              <QuantitySelector value={qty} max={p.stock} onChange={setQty} />
              <Button size="lg" onClick={() => addToCart(p.id, qty)}>Adicionar ao carrinho</Button>
              <Button size="lg" variant="accent" onClick={buyNow}>Comprar agora</Button>
            </div>
          )}
          <button type="button" className="link-btn" aria-pressed={wished} onClick={() => toggleWishlist(p.id)}>
            {wished ? '♥ Guardado nos favoritos' : '♡ Guardar nos favoritos'}
          </button>

          <ul className="pd-perks">
            <li><span aria-hidden="true">🚚</span><div><strong>Entrega</strong><small>{shippingFor(p.price, 'normal') === 0 ? 'Grátis' : formatMT(250)} · 2 a 4 dias úteis. Grátis acima de {formatMT(FREE_SHIPPING_FROM)}.</small></div></li>
            <li><span aria-hidden="true">🛡️</span><div><strong>Garantia</strong><small>{warranty} com a loja.</small></div></li>
            <li><span aria-hidden="true">↩️</span><div><strong>Devolução</strong><small>7 dias para devolver, se o produto estiver intacto.</small></div></li>
          </ul>
        </div>
      </div>

      <section className="pd-section">
        <h2>Sobre este produto</h2>
        <p className="prose">{p.description}</p>
      </section>

      <section className="pd-section">
        <h2>Especificações</h2>
        <table className="specs">
          <tbody>
            {Object.entries(p.specifications).map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
          </tbody>
        </table>
      </section>

      <section className="pd-section">
        <h2>Vendedor</h2>
        <div className="seller-box">
          <SellerLogo seller={seller} size="lg" />
          <div>
            <h3>{seller.name}</h3>
            <Rating value={seller.rating} count={seller.reviews} />
            <p className="muted">{sellerCount} produtos · {seller.city} · {seller.dispatch}</p>
          </div>
          <Button to={`/stores/${seller.id}`} variant="secondary">Visitar loja</Button>
        </div>
      </section>

      <section className="pd-section">
        <h2>Avaliações ({p.reviews})</h2>
        <div className="reviews">
          <div className="reviews-sum">
            <strong>{p.rating.toFixed(1)}</strong>
            <Rating value={p.rating} />
            <small>{p.reviews} avaliações</small>
          </div>
          <ul>
            {reviews.map((r) => (
              <li key={r.author}>
                <div className="rv-head"><strong>{r.author}</strong><small>{r.city} · {formatDate(r.date)}</small></div>
                <Rating value={r.rating} />
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pd-section">
        <h2>Produtos relacionados</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  )
}
