import { DELIVERY_OPTIONS, FREE_SHIPPING_FROM } from '../config'

// 45000 -> "45.000 MT"
export const formatMT = (n) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} MT`

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })

// minúsculas e sem acentos, para pesquisa
export const norm = (s) =>
  String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export const matchesSearch = (product, query) => {
  const hay = norm(`${product.name} ${product.categoryName} ${product.seller}`)
  return norm(query).split(/\s+/).filter(Boolean).every((t) => hay.includes(t))
}

export const discountPct = (price, oldPrice) => (oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0)

export function shippingFor(itemsTotal, deliveryId = 'normal') {
  if (!itemsTotal) return 0
  const opt = DELIVERY_OPTIONS.find((d) => d.id === deliveryId) || DELIVERY_OPTIONS[0]
  if (opt.id === 'normal' && itemsTotal >= FREE_SHIPPING_FROM) return 0
  return opt.price
}
