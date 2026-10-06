import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { sellers } from '../../data/sellers'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import Button from '../../components/Button'
import Rating from '../../components/Rating'
import ProductGrid from '../../components/ProductGrid'
import EmptyState from '../../components/EmptyState'
import { SellerLogo } from '../../components/SellerCard'

export default function SellerStore() {
  const { id } = useParams()
  const seller = sellers.find((s) => s.id === id)
  const [cat, setCat] = useState('')
  const [following, setFollowing] = useState(false)

  if (!seller) return <div className="container page"><EmptyState icon="🏪" title="Loja não encontrada" actionTo="/stores" actionLabel="Ver todas as lojas" /></div>

  const all = products.filter((p) => p.sellerId === seller.id)
  const cats = categories.filter((c) => all.some((p) => p.category === c.id))
  const list = cat ? all.filter((p) => p.category === cat) : all

  return (
    <div className="container page">
      <div className="store-banner" style={{ '--hue': seller.hue }} />
      <div className="store-head">
        <SellerLogo seller={seller} size="lg" />
        <div className="store-title">
          <h1>{seller.name}</h1>
          <Rating value={seller.rating} count={seller.reviews} />
        </div>
        <Button variant={following ? 'secondary' : 'primary'} aria-pressed={following} onClick={() => setFollowing(!following)}>
          {following ? 'A seguir' : 'Seguir loja'}
        </Button>
      </div>
      <p className="prose">{seller.description}</p>
      <dl className="kv kv-row">
        <div><dt>Na plataforma desde</dt><dd>{seller.since}</dd></div>
        <div><dt>Localização</dt><dd>{seller.city}</dd></div>
        <div><dt>Seguidores</dt><dd>{(seller.followers + (following ? 1 : 0)).toLocaleString('pt-PT')}</dd></div>
        <div><dt>Expedição</dt><dd>{seller.dispatch}</dd></div>
      </dl>

      <h2>Produtos ({list.length})</h2>
      <div className="chips" role="group" aria-label="Filtrar por categoria">
        <button type="button" className={!cat ? 'on' : ''} aria-pressed={!cat} onClick={() => setCat('')}>Todos</button>
        {cats.map((c) => (
          <button key={c.id} type="button" className={cat === c.id ? 'on' : ''} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.name}</button>
        ))}
      </div>
      <ProductGrid products={list} />
    </div>
  )
}
