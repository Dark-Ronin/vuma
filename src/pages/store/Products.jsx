import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import { sellers } from '../../data/sellers'
import { matchesSearch } from '../../utils/helpers'
import ProductGrid from '../../components/ProductGrid'
import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'

const SORTS = [
  ['relevance', 'Relevância'],
  ['bestsellers', 'Mais vendidos'],
  ['price-asc', 'Menor preço'],
  ['price-desc', 'Maior preço'],
  ['rating', 'Melhor avaliação'],
  ['newest', 'Mais recentes'],
]
const PRICES = [
  ['0-5000', 'Até 5.000 MT', 0, 5000],
  ['5000-15000', '5.000 – 15.000 MT', 5000, 15000],
  ['15000-40000', '15.000 – 40.000 MT', 15000, 40000],
  ['40000-', 'Acima de 40.000 MT', 40000, Infinity],
]

const sorters = {
  relevance: (a, b) => Number(b.featured) - Number(a.featured) || b.sold - a.sold,
  bestsellers: (a, b) => b.sold - a.sold,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  newest: (a, b) => b.id - a.id,
}

function Choice({ type = 'radio', name, checked, onChange, children }) {
  return (
    <label className="check">
      <input type={type} name={name} checked={checked} onChange={onChange} />
      <span>{children}</span>
    </label>
  )
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const search = params.get('search') || ''
  const category = params.get('category') || ''
  const seller = params.get('seller') || ''
  const price = params.get('price') || ''
  const minRating = Number(params.get('rating') || 0)
  const inStock = params.get('stock') === '1'
  const deal = params.get('deal') === '1'
  const sort = params.get('sort') || 'relevance'

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === '' || value == null || value === false) next.delete(key)
    else next.set(key, value === true ? '1' : value)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const range = PRICES.find((r) => r[0] === price)
    return products
      .filter((p) => (!search || matchesSearch(p, search))
        && (!category || p.category === category)
        && (!seller || p.sellerId === seller)
        && (!range || (p.price >= range[2] && p.price < range[3]))
        && p.rating >= minRating
        && (!inStock || p.stock > 0)
        && (!deal || p.discount > 0))
      .sort(sorters[sort] || sorters.relevance)
  }, [search, category, seller, price, minRating, inStock, deal, sort])

  const activeCat = categories.find((c) => c.id === category)
  const title = search ? `Resultados para “${search}”` : activeCat ? activeCat.name : deal ? 'Ofertas' : 'Todos os produtos'
  const hasFilters = search || category || seller || price || minRating || inStock || deal
  const clearAll = () => setParams({}, { replace: true })

  return (
    <div className="container page">
      <div className="page-head">
        <div>
          <h1>{title}</h1>
          <p className="muted">{list.length} {list.length === 1 ? 'produto' : 'produtos'}</p>
        </div>
        <div className="page-tools">
          <button type="button" className="btn btn-secondary btn-md filters-toggle" aria-expanded={showFilters} onClick={() => setShowFilters(!showFilters)}>
            Filtros
          </button>
          <label className="sort">
            <span>Ordenar por</span>
            <select value={sort} onChange={(e) => setParam('sort', e.target.value === 'relevance' ? '' : e.target.value)}>
              {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="catalog">
        <aside className={`filters${showFilters ? ' open' : ''}`} aria-label="Filtros">
          <fieldset>
            <legend>Categoria</legend>
            <Choice name="cat" checked={!category} onChange={() => setParam('category', '')}>Todas</Choice>
            {categories.map((c) => (
              <Choice key={c.id} name="cat" checked={category === c.id} onChange={() => setParam('category', c.id)}>
                {c.name} <small>({products.filter((p) => p.category === c.id).length})</small>
              </Choice>
            ))}
          </fieldset>
          <fieldset>
            <legend>Preço</legend>
            <Choice name="price" checked={!price} onChange={() => setParam('price', '')}>Qualquer preço</Choice>
            {PRICES.map(([id, label]) => (
              <Choice key={id} name="price" checked={price === id} onChange={() => setParam('price', id)}>{label}</Choice>
            ))}
          </fieldset>
          <fieldset>
            <legend>Avaliação</legend>
            <Choice name="rating" checked={!minRating} onChange={() => setParam('rating', '')}>Todas</Choice>
            <Choice name="rating" checked={minRating === 4.5} onChange={() => setParam('rating', '4.5')}>4,5 ★ ou mais</Choice>
            <Choice name="rating" checked={minRating === 4} onChange={() => setParam('rating', '4')}>4 ★ ou mais</Choice>
          </fieldset>
          <fieldset>
            <legend>Vendedor</legend>
            <Choice name="seller" checked={!seller} onChange={() => setParam('seller', '')}>Todos</Choice>
            {sellers.map((s) => (
              <Choice key={s.id} name="seller" checked={seller === s.id} onChange={() => setParam('seller', s.id)}>{s.name}</Choice>
            ))}
          </fieldset>
          <fieldset>
            <legend>Mais opções</legend>
            <Choice type="checkbox" name="stock" checked={inStock} onChange={(e) => setParam('stock', e.target.checked)}>Apenas em stock</Choice>
            <Choice type="checkbox" name="deal" checked={deal} onChange={(e) => setParam('deal', e.target.checked)}>Apenas em promoção</Choice>
          </fieldset>
          {hasFilters && <Button variant="secondary" block onClick={clearAll}>Limpar filtros</Button>}
        </aside>

        <section aria-label="Produtos">
          {list.length > 0 ? (
            <ProductGrid products={list} />
          ) : (
            <div className="empty-box">
              <EmptyState
                icon="🔎" title="Nenhum produto encontrado"
                text="Experimente outra palavra, menos filtros ou uma categoria diferente."
              />
              <div className="center"><Button onClick={clearAll}>Limpar pesquisa e filtros</Button></div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
