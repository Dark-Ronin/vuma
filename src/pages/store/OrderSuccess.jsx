import { useParams } from 'react-router-dom'
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS } from '../../config'
import { formatDate, formatMT } from '../../utils/helpers'
import { useStore } from '../../context/StoreContext'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'

export default function OrderSuccess() {
  const { id } = useParams()
  const { getOrder } = useStore()
  const o = getOrder(id)

  if (!o) return <div className="container page"><EmptyState icon="🧾" title="Pedido não encontrado" actionTo="/orders" actionLabel="Ver meus pedidos" /></div>

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === o.deliveryId)
  const payment = PAYMENT_OPTIONS.find((p) => p.id === o.paymentId)
  const a = o.address

  return (
    <div className="container page success">
      <div className="success-head">
        <span className="success-icon" aria-hidden="true">✓</span>
        <h1>Pedido realizado com sucesso.</h1>
        <p>Número do pedido</p>
        <strong className="order-no">{o.id}</strong>
        <small className="muted">{formatDate(o.date)}</small>
      </div>
      <div className="info-grid">
        <section className="card"><h2>Endereço</h2><p>{a.name}<br />{a.street}<br />{a.district}, {a.city}<br />{a.province} · {a.phone}</p></section>
        <section className="card"><h2>Entrega</h2><p>{delivery.name}<br />{delivery.eta}</p></section>
        <section className="card"><h2>Pagamento</h2><p>{payment.name}<br />Total: <b>{formatMT(o.total)}</b></p></section>
      </div>
      <section className="card">
        <h2>Resumo</h2>
        <ul className="mini-items wide">
          {o.lines.map((l) => (
            <li key={l.id}>
              <img src={l.image} alt="" />
              <span>{l.name}<small>{l.qty} × {formatMT(l.price)} · Vendido por {l.seller}</small></span>
              <b>{formatMT(l.price * l.qty)}</b>
            </li>
          ))}
        </ul>
      </section>
      <div className="actions center">
        <Button to={`/orders/${o.id}`} size="lg">Acompanhar pedido</Button>
        <Button to="/products" variant="secondary" size="lg">Continuar a comprar</Button>
      </div>
    </div>
  )
}
