import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { matchesSearch } from '../utils/helpers'

export default function SearchBar({ onDone }) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [q, setQ] = useState(() => (pathname === '/products' ? new URLSearchParams(search).get('search') || '' : ''))
  const [open, setOpen] = useState(false)

  const suggestions = useMemo(
    () => (q.trim().length >= 2 ? products.filter((p) => matchesSearch(p, q)).slice(0, 5) : []),
    [q]
  )

  const submit = (e) => {
    e.preventDefault()
    setOpen(false)
    navigate(q.trim() ? `/products?search=${encodeURIComponent(q.trim())}` : '/products')
    onDone?.()
  }

  return (
    <form
      className="search" role="search" onSubmit={submit}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }}
      onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false) }}
    >
      <label htmlFor="search-input" className="sr-only">Pesquisar produtos</label>
      <input
        id="search-input" type="search" value={q} autoComplete="off" placeholder="O que você procura?"
        onChange={(e) => { setQ(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)}
      />
      <button type="submit" aria-label="Pesquisar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
      </button>
      {open && q.trim().length >= 2 && (
        <div className="suggest">
          {suggestions.length > 0 ? (
            <>
              <ul>
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <Link to={`/products/${p.id}`} onClick={() => { setOpen(false); onDone?.() }}>
                      <img src={p.images[0]} alt="" />
                      <span>{p.name}<small>{p.categoryName} · {p.seller}</small></span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="submit" className="suggest-all">Ver todos os resultados para “{q.trim()}”</button>
            </>
          ) : (
            <p className="suggest-none">Nenhum produto encontrado para “{q.trim()}”.</p>
          )}
        </div>
      )}
    </form>
  )
}
