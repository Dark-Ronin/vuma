// Tudo o que muda com a marca ou com regras comerciais simples fica aqui.
export const BRAND = {
  name: 'VUMA',
  tagline: 'Produtos de várias lojas, uma experiência simples.',
}

export const FREE_SHIPPING_FROM = 10000 // entrega normal grátis a partir deste valor (MT)

export const DELIVERY_OPTIONS = [
  { id: 'normal', name: 'Entrega normal', eta: '2 a 4 dias úteis', price: 250 },
  { id: 'express', name: 'Entrega expressa', eta: 'Em 24 horas (Maputo e Matola)', price: 600 },
]

export const PAYMENT_OPTIONS = [
  { id: 'mpesa', name: 'M-Pesa', note: 'Pague com o seu telemóvel Vodacom.', icon: '📲' },
  { id: 'emola', name: 'e-Mola', note: 'Pague com o seu telemóvel Movitel.', icon: '📲' },
  { id: 'card', name: 'Cartão', note: 'Visa ou Mastercard.', icon: '💳' },
  { id: 'cod', name: 'Pagamento na entrega', note: 'Pague em dinheiro ao receber.', icon: '💵' },
]

export const PROVINCES = [
  'Maputo Cidade', 'Maputo Província', 'Gaza', 'Inhambane', 'Sofala', 'Manica',
  'Tete', 'Zambézia', 'Nampula', 'Cabo Delgado', 'Niassa',
]
