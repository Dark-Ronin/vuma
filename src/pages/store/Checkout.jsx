import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DELIVERY_OPTIONS, PAYMENT_OPTIONS, PROVINCES } from '../../config'
import { formatMT, shippingFor } from '../../utils/helpers'
import { useStore } from '../../context/StoreContext'
import OrderSummary from '../../components/OrderSummary'
import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'

const STEPS = ['Endereço', 'Entrega', 'Pagamento']
const EMPTY = { name: '', phone: '', province: 'Maputo Cidade', city: '', district: '', street: '', save: false }

export default function Checkout() {
  const navigate = useNavigate()
  const { lines, itemsTotal, originalTotal, addresses, addAddress, placeOrder } = useStore()
  const [step, setStep] = useState(1)
  const [addrId, setAddrId] = useState(addresses[0]?.id || 'new')
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [deliveryId, setDeliveryId] = useState('normal')
  const [paymentId, setPaymentId] = useState('mpesa')

  if (lines.length === 0) {
    return (
      <div className="container page">
        <EmptyState icon="🛒" title="Não há nada para finalizar" text="O seu carrinho está vazio." actionTo="/products" actionLabel="Ver produtos" />
      </div>
    )
  }

  const shipping = shippingFor(itemsTotal, deliveryId)
  const saved = addresses.find((a) => a.id === addrId)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const validate = () => {
    if (addrId !== 'new') return true
    const e = {}
    if (!form.name.trim()) e.name = 'Indique o nome de quem recebe.'
    if (form.phone.replace(/\D/g, '').length < 9) e.phone = 'Indique um telefone com 9 dígitos.'
    if (!form.city.trim()) e.city = 'Indique a cidade.'
    if (!form.district.trim()) e.district = 'Indique o bairro.'
    if (!form.street.trim()) e.street = 'Indique o endereço.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (step === 1 && !validate()) return; setStep(step + 1) }

  const confirm = () => {
    let address = saved
    if (addrId === 'new') {
      const { save, ...data } = form
      address = { ...data, id: `a${Date.now()}`, label: 'Novo endereço' }
      if (save) addAddress(address)
    }
    const order = placeOrder({ address, deliveryId, paymentId })
    navigate(`/orders/${order.id}/success`)
  }

  const field = (k, label, props = {}) => (
    <div className={`field${errors[k] ? ' has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} value={form[k]} onChange={set(k)} aria-invalid={Boolean(errors[k])} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />
      {errors[k] && <span id={`e-${k}`} className="error">{errors[k]}</span>}
    </div>
  )

  return (
    <div className="container page">
      <h1>Finalizar compra</h1>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li key={s} className={step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''} aria-current={step === i + 1 ? 'step' : undefined}>
            {step > i + 1 ? (
              <button type="button" onClick={() => setStep(i + 1)}><span>✓</span>{s}</button>
            ) : (
              <span className="step-label"><span>{i + 1}</span>{s}</span>
            )}
          </li>
        ))}
      </ol>

      <div className="two-col">
        <div className="panel">
          {step === 1 && (
            <section>
              <h2>Onde quer receber?</h2>
              <div className="options">
                {addresses.map((a) => (
                  <label key={a.id} className={`option${addrId === a.id ? ' on' : ''}`}>
                    <input type="radio" name="addr" checked={addrId === a.id} onChange={() => setAddrId(a.id)} />
                    <span><strong>{a.label} · {a.name}</strong><small>{a.street}, {a.district}, {a.city}, {a.province} · {a.phone}</small></span>
                  </label>
                ))}
                <label className={`option${addrId === 'new' ? ' on' : ''}`}>
                  <input type="radio" name="addr" checked={addrId === 'new'} onChange={() => setAddrId('new')} />
                  <span><strong>Usar outro endereço</strong><small>Preencha os dados abaixo.</small></span>
                </label>
              </div>
              {addrId === 'new' && (
                <div className="form-grid">
                  {field('name', 'Nome completo', { autoComplete: 'name' })}
                  {field('phone', 'Telefone', { type: 'tel', autoComplete: 'tel', placeholder: '84 123 4567' })}
                  <div className="field">
                    <label htmlFor="f-province">Província</label>
                    <select id="f-province" value={form.province} onChange={set('province')}>
                      {PROVINCES.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  {field('city', 'Cidade')}
                  {field('district', 'Bairro')}
                  <div className="span-2">{field('street', 'Endereço (rua, número, referência)')}</div>
                  <label className="check span-2"><input type="checkbox" checked={form.save} onChange={set('save')} /><span>Guardar este endereço na minha conta</span></label>
                </div>
              )}
              <Button size="lg" onClick={next}>Continuar</Button>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2>Como quer receber?</h2>
              <div className="options">
                {DELIVERY_OPTIONS.map((d) => {
                  const price = shippingFor(itemsTotal, d.id)
                  return (
                    <label key={d.id} className={`option${deliveryId === d.id ? ' on' : ''}`}>
                      <input type="radio" name="delivery" checked={deliveryId === d.id} onChange={() => setDeliveryId(d.id)} />
                      <span><strong>{d.name}</strong><small>{d.eta}</small></span>
                      <b>{price === 0 ? 'Grátis' : formatMT(price)}</b>
                    </label>
                  )
                })}
              </div>
              <div className="actions">
                <Button variant="secondary" size="lg" onClick={() => setStep(1)}>Voltar</Button>
                <Button size="lg" onClick={next}>Continuar</Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2>Como quer pagar?</h2>
              <div className="options">
                {PAYMENT_OPTIONS.map((m) => (
                  <label key={m.id} className={`option${paymentId === m.id ? ' on' : ''}`}>
                    <input type="radio" name="payment" checked={paymentId === m.id} onChange={() => setPaymentId(m.id)} />
                    <span><strong><span aria-hidden="true">{m.icon}</span> {m.name}</strong><small>{m.note}</small></span>
                  </label>
                ))}
              </div>
              <p className="notice">Protótipo: nenhum pagamento real é feito ao confirmar.</p>
              <div className="actions">
                <Button variant="secondary" size="lg" onClick={() => setStep(2)}>Voltar</Button>
                <Button size="lg" variant="accent" onClick={confirm}>Confirmar pedido</Button>
              </div>
            </section>
          )}
        </div>

        <OrderSummary originalTotal={originalTotal} itemsTotal={itemsTotal} shipping={shipping}>
          <ul className="mini-items">
            {lines.map((l) => (
              <li key={l.id}>
                <img src={l.product.images[0]} alt="" />
                <span>{l.product.name}<small>{l.qty} × {formatMT(l.product.price)} · {l.product.seller}</small></span>
              </li>
            ))}
          </ul>
        </OrderSummary>
      </div>
    </div>
  )
}
