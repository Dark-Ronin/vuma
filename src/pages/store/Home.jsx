import { Link } from 'react-router-dom'
import { BRAND, FREE_SHIPPING_FROM } from '../../config'
import { categories } from '../../data/categories'
import { products, getProduct } from '../../data/products'
import { sellers } from '../../data/sellers'
import { formatMT } from '../../utils/helpers'
import Button from '../../components/Button'
import Badge from '../../components/Badge'
import CategoryCard from '../../components/CategoryCard'
import ProductGrid from '../../components/ProductGrid'
import SellerCard from '../../components/SellerCard'

const HERO_IDS = [1, 9, 13]
const TRUST = [
  ['🚚', 'Entrega em todo o país', 'Maputo em 24 horas'],
  ['📲', 'M-Pesa e e-Mola', 'Pague como preferir'],
  ['↩️', 'Devolução em 7 dias', 'Sem complicações'],
  ['✅', 'Lojas verificadas', 'Sabe sempre quem vende'],
]

function SectionHead({ title, to, cta = 'Ver tudo' }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {to && <Link to={to}>{cta}</Link>}
    </div>
  )
}

export default function Home() {
  const hero = HERO_IDS.map(getProduct)
  const deals = products.filter((p) => p.discount > 0).sort((a, b) => b.discount - a.discount).slice(0, 5)
  const best = [...products].filter((p) => p.bestSeller).sort((a, b) => b.sold - a.sold).slice(0, 8)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Encontre tudo num só lugar.</h1>
            <p>{BRAND.tagline} Compare lojas, escolha com confiança e receba em casa.</p>
            <div className="hero-actions">
              <Button to="/products" variant="accent" size="lg">Comprar agora</Button>
              <Button to="/stores" variant="ghost" size="lg" className="on-dark">Ver lojas</Button>
            </div>
          </div>
          <div className="hero-tiles">
            {hero.map((p, i) => (
              <Link key={p.id} to={`/products/${p.id}`} className={`hero-tile hero-tile-${i}`}>
                <img src={p.images[0]} alt={p.name} />
                <span className="hero-tile-info">
                  <span>{p.name}</span>
                  <strong>{formatMT(p.price)}</strong>
                </span>
                {p.discount > 0 && <span className="hero-tile-off">−{p.discount}%</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Vantagens">
        <ul className="container trust-row">
          {TRUST.map(([icon, title, text]) => (
            <li key={title}><span aria-hidden="true">{icon}</span><div><strong>{title}</strong><small>{text}</small></div></li>
          ))}
        </ul>
      </section>

      <section className="container section">
        <SectionHead title="Categorias" to="/products" cta="Todos os produtos" />
        <div className="cgrid">
          {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      <section className="container section">
        <SectionHead title="Ofertas do momento" to="/products?deal=1" />
        <ProductGrid products={deals} />
      </section>

      <section className="container section">
        <div className="promo promo-yellow">
          <div>
            <Badge variant="ink">Entrega grátis</Badge>
            <h2>Compras acima de {formatMT(FREE_SHIPPING_FROM)} não pagam entrega.</h2>
            <p>Válido para entrega normal em todas as lojas da {BRAND.name}.</p>
          </div>
          <Button to="/products" variant="primary" size="lg">Aproveitar</Button>
        </div>
      </section>

      <section className="container section">
        <SectionHead title="Mais vendidos" to="/products?sort=bestsellers" />
        <ProductGrid products={best} />
      </section>

      <section className="container section">
        <SectionHead title="Lojas em destaque" to="/stores" cta="Ver todas as lojas" />
        <div className="sgrid">
          {sellers.map((s) => <SellerCard key={s.id} seller={s} />)}
        </div>
      </section>

      <section className="container section">
        <div className="promo promo-green">
          <div>
            <h2>Tem uma loja? Venda na {BRAND.name}.</h2>
            <p>Chegue a milhares de clientes. Nós tratamos do checkout, da logística e do apoio ao cliente.</p>
          </div>
          <Button to="/info/sell" variant="accent" size="lg">Saber mais</Button>
        </div>
      </section>
    </>
  )
}
