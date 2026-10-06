import { ORDER_STEPS } from '../../data/orders'
import { formatDate, formatMT } from '../../utils/helpers'
import { useStore } from '../../context/StoreContext'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'

export default function Orders() {
  const { orders } = useStore()
  const sorted = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <h1>Meus pedidos</h1>
      {sorted.length === 0 ? (
        <EmptyState icon="📦" title="Ainda não fez pedidos" actionTo="/products" actionLabel="Começar a comprar" />
      ) : (
        <ul className="orders">
          {sorted.map((o) => {
            const qty = o.lines.reduce((s, l) => s + l.qty, 0)
            return (
              <li key={o.id} className="card order-row">
                <div className="order-thumbs">{o.lines.slice(0, 3).map((l) => <img key={l.id} src={l.image} alt="" />)}</div>
                <div className="order-meta">
                  <strong>{o.id}</strong>
                  <small>{formatDate(o.date)} · {qty} {qty === 1 ? 'produto' : 'produtos'}</small>
                  <Badge variant={o.status === 5 ? 'ok' : 'new'}>{ORDER_STEPS[o.status].label}</Badge>
                </div>
                <strong className="order-total">{formatMT(o.total)}</strong>
                <Button to={`/orders/${o.id}`} variant="secondary" size="sm" aria-label={`Ver pedido ${o.id}`}>Ver pedido</Button>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
