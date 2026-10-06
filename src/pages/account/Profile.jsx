import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

export default function Profile() {
  const { orders, addresses, wishlist } = useStore()
  const [prefs, setPrefs] = useState({ sms: true, promo: false })
  const toggle = (k) => () => setPrefs({ ...prefs, [k]: !prefs[k] })

  return (
    <>
      <h1>Meu perfil</h1>
      <section className="card">
        <h2>Informações pessoais</h2>
        <dl className="kv">
          <div><dt>Nome</dt><dd>Ana Machava</dd></div>
          <div><dt>E-mail</dt><dd>ana.machava@email.co.mz</dd></div>
          <div><dt>Telefone</dt><dd>+258 84 123 4567</dd></div>
        </dl>
      </section>
      <div className="info-grid">
        <Link to="/orders" className="card link-card"><strong>{orders.length}</strong><span>Pedidos</span></Link>
        <Link to="/addresses" className="card link-card"><strong>{addresses.length}</strong><span>Endereços</span></Link>
        <Link to="/wishlist" className="card link-card"><strong>{wishlist.length}</strong><span>Favoritos</span></Link>
      </div>
      <section className="card">
        <h2>Configurações</h2>
        <label className="check"><input type="checkbox" checked={prefs.sms} onChange={toggle('sms')} /><span>Receber SMS sobre o estado dos pedidos</span></label>
        <label className="check"><input type="checkbox" checked={prefs.promo} onChange={toggle('promo')} /><span>Receber ofertas por e-mail</span></label>
        <div className="field">
          <label htmlFor="lang">Idioma</label>
          <select id="lang" defaultValue="pt"><option value="pt">Português</option><option value="en">English</option></select>
        </div>
      </section>
    </>
  )
}
