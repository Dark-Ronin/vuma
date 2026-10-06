import { useState } from 'react'
import { PROVINCES } from '../../config'
import { useStore } from '../../context/StoreContext'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'

const EMPTY = { label: '', name: '', phone: '', province: 'Maputo Cidade', city: '', district: '', street: '' }

export default function Addresses() {
  const { addresses, addAddress, removeAddress } = useStore()
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    addAddress({ ...form, id: `a${Date.now()}`, label: form.label.trim() || 'Endereço' })
    setForm(EMPTY)
    setAdding(false)
  }

  return (
    <>
      <div className="page-head"><h1>Endereços</h1>{!adding && <Button onClick={() => setAdding(true)}>Adicionar endereço</Button>}</div>

      {adding && (
        <form className="card form-grid" onSubmit={submit}>
          <div className="field"><label htmlFor="a-label">Nome do endereço</label><input id="a-label" value={form.label} onChange={set('label')} placeholder="Casa, Trabalho…" /></div>
          <div className="field"><label htmlFor="a-name">Nome completo</label><input id="a-name" required value={form.name} onChange={set('name')} /></div>
          <div className="field"><label htmlFor="a-phone">Telefone</label><input id="a-phone" required type="tel" value={form.phone} onChange={set('phone')} /></div>
          <div className="field"><label htmlFor="a-prov">Província</label><select id="a-prov" value={form.province} onChange={set('province')}>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select></div>
          <div className="field"><label htmlFor="a-city">Cidade</label><input id="a-city" required value={form.city} onChange={set('city')} /></div>
          <div className="field"><label htmlFor="a-dist">Bairro</label><input id="a-dist" required value={form.district} onChange={set('district')} /></div>
          <div className="field span-2"><label htmlFor="a-street">Endereço</label><input id="a-street" required value={form.street} onChange={set('street')} /></div>
          <div className="actions span-2"><Button type="submit" onClick={undefined}>Guardar endereço</Button><Button variant="secondary" onClick={() => setAdding(false)}>Cancelar</Button></div>
        </form>
      )}

      {addresses.length === 0 && !adding ? (
        <EmptyState icon="📍" title="Sem endereços guardados" text="Adicione um endereço para comprar mais depressa." />
      ) : (
        <ul className="addr-list">
          {addresses.map((a) => (
            <li key={a.id} className="card">
              <h2>{a.label}</h2>
              <p>{a.name}<br />{a.street}<br />{a.district}, {a.city}, {a.province}<br />{a.phone}</p>
              <button type="button" className="link-btn" onClick={() => removeAddress(a.id)} aria-label={`Remover endereço ${a.label}`}>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
