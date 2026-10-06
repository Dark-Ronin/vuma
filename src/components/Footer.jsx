import { Link } from 'react-router-dom'
import { BRAND } from '../config'
import { Logo } from './Header'

const COLS = [
  { title: 'A empresa', links: [['Sobre', 'about'], ['Contacto', 'contact'], ['Vender na ' + BRAND.name, 'sell']] },
  { title: 'Ajuda', links: [['Centro de ajuda', 'help'], ['Entregas', 'shipping'], ['Devoluções', 'returns']] },
  { title: 'Legal', links: [['Termos e condições', 'terms'], ['Privacidade', 'privacy']] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{BRAND.tagline}</p>
          <div className="social" aria-label="Redes sociais">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>{c.links.map(([label, slug]) => <li key={slug}><Link to={`/info/${slug}`}>{label}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} {BRAND.name}. Protótipo — nenhum pagamento é processado.</div>
      </div>
    </footer>
  )
}
