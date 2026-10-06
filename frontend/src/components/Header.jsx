import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '../config'
import { categories } from '../data/categories'
import { useStore } from '../context/StoreContext'
import SearchBar from './SearchBar'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${BRAND.name} — página inicial`}>
      <span className="logo-mark" aria-hidden="true">{BRAND.name[0]}</span>
      <span className="logo-text">{BRAND.name}</span>
    </Link>
  )
}

const NAV = [
  { to: '/products?deal=1', label: 'Ofertas' },
  { to: '/products?sort=bestsellers', label: 'Mais vendidos' },
  { to: '/products?sort=newest', label: 'Novidades' },
  { to: '/stores', label: 'Lojas' },
]

export default function Header() {
  const { cartCount, wishlist } = useStore()
  const [menu, setMenu] = useState(false)
  const [cats, setCats] = useState(false)
  const close = () => { setMenu(false); setCats(false) }

  return (
    <header className="header" onKeyDown={(e) => { if (e.key === 'Escape') close() }}>
      <div className="header-main">
        <div className="container header-row">
          <button type="button" className="icon-btn menu-btn" aria-expanded={menu} aria-controls="mobile-menu"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu(!menu)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
          <Logo />
          <div className="header-search"><SearchBar onDone={close} /></div>
          <Link to="/addresses" className="hdr-link hdr-loc">
            <small>Entregar em</small><strong>Maputo</strong>
          </Link>
          <Link to="/profile" className="hdr-link hide-md"><small>Olá,</small><strong>Conta</strong></Link>
          <Link to="/orders" className="hdr-link hide-md"><small>Meus</small><strong>Pedidos</strong></Link>
          <Link to="/wishlist" className="hdr-link hide-md"><small>{wishlist.length} itens</small><strong>Favoritos</strong></Link>
          <Link to="/cart" className="hdr-cart" aria-label={`Carrinho, ${cartCount} itens`}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6" />
            </svg>
            <span className="hdr-cart-count">{cartCount}</span>
            <strong className="hide-md">Carrinho</strong>
          </Link>
        </div>
      </div>

      <nav className="header-nav" aria-label="Navegação principal">
        <div className="container nav-row">
          <div className="cat-wrap">
            <button type="button" className="nav-cats" aria-expanded={cats} onClick={() => setCats(!cats)}>
              <span aria-hidden="true">☰</span> Categorias
            </button>
            {cats && (
              <div className="cat-menu">
                {categories.map((c) => (
                  <Link key={c.id} to={`/products?category=${c.id}`} onClick={close}>
                    <span aria-hidden="true">{c.icon}</span> {c.name}
                  </Link>
                ))}
                <Link to="/products" onClick={close} className="cat-all">Ver todos os produtos</Link>
              </div>
            )}
          </div>
          {NAV.map((n) => <Link key={n.label} to={n.to} onClick={close}>{n.label}</Link>)}
          <Link to="/info/sell" className="nav-sell" onClick={close}>Vender na {BRAND.name}</Link>
        </div>
      </nav>

      {menu && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Menu">
          <div className="mm-group">
            <Link to="/profile" onClick={close}>Minha conta</Link>
            <Link to="/orders" onClick={close}>Meus pedidos</Link>
            <Link to="/wishlist" onClick={close}>Favoritos ({wishlist.length})</Link>
            <Link to="/addresses" onClick={close}>Endereços</Link>
          </div>
          <div className="mm-group">
            {NAV.map((n) => <Link key={n.label} to={n.to} onClick={close}>{n.label}</Link>)}
          </div>
          <div className="mm-group">
            <strong>Categorias</strong>
            {categories.map((c) => (
              <Link key={c.id} to={`/products?category=${c.id}`} onClick={close}>{c.icon} {c.name}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
