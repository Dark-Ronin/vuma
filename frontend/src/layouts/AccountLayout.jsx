import { NavLink, Outlet } from 'react-router-dom'

const LINKS = [
  ['/profile', 'Perfil'],
  ['/orders', 'Pedidos'],
  ['/addresses', 'Endereços'],
  ['/wishlist', 'Favoritos'],
]

export default function AccountLayout() {
  return (
    <div className="container account">
      <nav className="account-nav" aria-label="Minha conta">
        {LINKS.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
      </nav>
      <div className="account-content"><Outlet /></div>
    </div>
  )
}
