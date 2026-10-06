import { Link } from 'react-router-dom'
import { FREE_SHIPPING_FROM } from '../../config'
import { formatMT, shippingFor } from '../../utils/helpers'
import { useStore } from '../../context/StoreContext'
import CartItem from '../../components/CartItem'
import OrderSummary from '../../components/OrderSummary'
import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'

export default function Cart() {
  const { lines, itemsTotal, originalTotal, cartCount } = useStore()

  if (lines.length === 0) {
    return (
      <div className="container page">
        <EmptyState icon="🛒" title="O seu carrinho está vazio" text="Adicione produtos para os ver aqui." actionTo="/products" actionLabel="Voltar às compras" />
      </div>
    )
  }

  const shipping = shippingFor(itemsTotal, 'normal')
  const missing = FREE_SHIPPING_FROM - itemsTotal

  return (
    <div className="container page">
      <h1>Carrinho <span className="muted">({cartCount} {cartCount === 1 ? 'item' : 'itens'})</span></h1>
      <div className="two-col">
        <div>
          {missing > 0 ? (
            <p className="notice">Faltam <b>{formatMT(missing)}</b> para ter entrega grátis.</p>
          ) : (
            <p className="notice ok">Tem entrega normal grátis nesta compra.</p>
          )}
          <ul className="citems">{lines.map((l) => <CartItem key={l.id} line={l} />)}</ul>
          <Link to="/products" className="back-link">← Continuar a comprar</Link>
        </div>
        <OrderSummary originalTotal={originalTotal} itemsTotal={itemsTotal} shipping={shipping}>
          <p className="muted small">Entrega calculada com a opção normal. Pode escolher entrega expressa no checkout.</p>
          <Button to="/checkout" size="lg" block>Continuar para checkout</Button>
        </OrderSummary>
      </div>
    </div>
  )
}
