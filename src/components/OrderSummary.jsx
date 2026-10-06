import { formatMT } from '../utils/helpers'

export default function OrderSummary({ originalTotal, itemsTotal, shipping, title = 'Resumo do pedido', children }) {
  const savings = originalTotal - itemsTotal
  return (
    <aside className="summary" aria-label={title}>
      <h2>{title}</h2>
      <dl>
        <div><dt>Subtotal</dt><dd>{formatMT(originalTotal)}</dd></div>
        {savings > 0 && <div className="save"><dt>Desconto</dt><dd>−{formatMT(savings)}</dd></div>}
        <div><dt>Entrega</dt><dd>{shipping === 0 ? 'Grátis' : formatMT(shipping)}</dd></div>
        <div className="total"><dt>Total</dt><dd>{formatMT(itemsTotal + shipping)}</dd></div>
      </dl>
      {children}
    </aside>
  )
}
