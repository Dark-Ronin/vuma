import { Link, useParams } from 'react-router-dom'
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from '../../config'
import { ORDER_STEPS } from '../../data/orders'
import { formatDate, formatMT } from '../../utils/helpers'
import { useStore } from '../../context/StoreContext'
import OrderStatus from '../../components/OrderStatus'
import OrderSummary from '../../components/OrderSummary'
import EmptyState from '../../components/EmptyState'
import Badge from '../../components/Badge'

export default function OrderDetails() {
  const { id } = useParams()
  const { getOrder } = useStore()
  const o = getOrder(id)

  if (!o) return <div className="container page"><EmptyState icon="🧾" title="Pedido não encontrado" text="Verifique o número do pedido." actionTo="/orders" actionLabel="Ver meus pedidos" /></div>

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === o.deliveryId)
  const payment = PAYMENT_OPTIONS.find((p) => p.id === o.paymentId)
  const a = o.address

  return (
    <div className="container page">
      <nav className="crumbs" aria-label="Localização"><Link to="/orders">Meus pedidos</Link> / <span aria-current="page">{o.id}</span></nav>
      <div className="page-head">
        <div>
          <h1>Pedido {o.id}</h1>
          <p className="muted">Realizado a {formatDate(o.date)}</p>
        </div>
        <Badge variant={o.status === 5 ? 'ok' : 'new'}>{ORDER_STEPS[o.status].label}</Badge>
      </div>

      <section className="card"><h2>Estado da entrega</h2><OrderStatus current={o.status} /></section>

      <div className="two-col">
        <div>
          <section className="card">
            <h2>Produtos</h2>
            <ul className="mini-items wide">
              {o.lines.map((l) => (
                <li key={l.id}>
                  <img src={l.image} alt="" />
                  <span><Link to={`/products/${l.id}`}>{l.name}</Link><small>{l.qty} × {formatMT(l.price)} · Vendido por <Link to={`/stores/${l.sellerId}`}>{l.seller}</Link></small></span>
                  <b>{formatMT(l.price * l.qty)}</b>
                </li>
              ))}
            </ul>
          </section>
          <div className="info-grid">
            <section className="card"><h2>Endereço</h2><p>{a.name}<br />{a.street}<br />{a.district}, {a.city}<br />{a.province} · {a.phone}</p></section>
            <section className="card"><h2>Entrega</h2><p>{delivery.name}<br />{delivery.eta}</p></section>
            <section className="card"><h2>Pagamento</h2><p>{payment.name}</p></section>
          </div>
        </div>
        <OrderSummary title="Total do pedido" originalTotal={o.originalTotal} itemsTotal={o.itemsTotal} shipping={o.shipping} />
      </div>
    </div>
  )
}
