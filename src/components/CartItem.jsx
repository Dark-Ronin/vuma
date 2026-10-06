import { Link } from 'react-router-dom'
import Price from './Price'
import QuantitySelector from './QuantitySelector'
import { formatMT } from '../utils/helpers'
import { useStore } from '../context/StoreContext'

export default function CartItem({ line }) {
  const { setQty, removeFromCart } = useStore()
  const p = line.product
  return (
    <li className="citem">
      <Link to={`/products/${p.id}`} className="citem-img">
        <img src={p.images[0]} alt={p.name} />
      </Link>
      <div className="citem-info">
        <Link to={`/products/${p.id}`} className="citem-name">{p.name}</Link>
        <span className="citem-seller">Vendido por <Link to={`/stores/${p.sellerId}`}>{p.seller}</Link></span>
        <Price price={p.price} oldPrice={p.oldPrice} size="sm" />
        {p.stock <= 5 && <span className="low">Restam {p.stock} em stock</span>}
      </div>
      <div className="citem-actions">
        <QuantitySelector value={line.qty} max={p.stock} onChange={(q) => setQty(p.id, q)} />
        <strong className="citem-sub">{formatMT(p.price * line.qty)}</strong>
        <button type="button" className="link-btn" onClick={() => removeFromCart(p.id)} aria-label={`Remover ${p.name} do carrinho`}>
          Remover
        </button>
      </div>
    </li>
  )
}
