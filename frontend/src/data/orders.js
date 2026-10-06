import { products } from './products'
import { shippingFor } from '../utils/helpers'

export const ORDER_STEPS = [
  { label: 'Pedido realizado', text: 'Recebemos o seu pedido.' },
  { label: 'Pagamento confirmado', text: 'O pagamento foi validado.' },
  { label: 'Preparando pedido', text: 'A loja está a separar os produtos.' },
  { label: 'Enviado', text: 'O pedido saiu do armazém da loja.' },
  { label: 'Em trânsito', text: 'A caminho do seu endereço.' },
  { label: 'Entregue', text: 'Pedido entregue com sucesso.' },
]

export const initialAddresses = [
  { id: 'a1', label: 'Casa', name: 'Ana Machava', phone: '84 123 4567', province: 'Maputo Cidade', city: 'Maputo', district: 'Polana Cimento', street: 'Av. Julius Nyerere, 1250, Apt. 4' },
  { id: 'a2', label: 'Trabalho', name: 'Ana Machava', phone: '84 123 4567', province: 'Maputo Cidade', city: 'Maputo', district: 'Sommerschield', street: 'Rua da Sé, 88, 2º andar' },
]

// Constrói um pedido a partir de [{ id, qty }] usando os preços atuais
export function buildOrder({ id, date, status, items, address, deliveryId, paymentId }) {
  const lines = items.map(({ id: pid, qty }) => {
    const p = products.find((x) => x.id === pid)
    return { id: pid, name: p.name, image: p.images[0], seller: p.seller, sellerId: p.sellerId, price: p.price, oldPrice: p.oldPrice, qty }
  })
  const itemsTotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const originalTotal = lines.reduce((s, l) => s + (l.oldPrice || l.price) * l.qty, 0)
  const shipping = shippingFor(itemsTotal, deliveryId)
  return { id, date, status, lines, address, deliveryId, paymentId, itemsTotal, originalTotal, shipping, total: itemsTotal + shipping }
}

const home = initialAddresses[0]
const work = initialAddresses[1]

export const mockOrders = [
  buildOrder({ id: 'VUM-48281', date: '2026-09-29T14:20:00', status: 0, items: [{ id: 27, qty: 1 }, { id: 31, qty: 1 }], address: work, deliveryId: 'normal', paymentId: 'cod' }),
  buildOrder({ id: 'VUM-48260', date: '2026-09-28T09:05:00', status: 2, items: [{ id: 1, qty: 1 }], address: home, deliveryId: 'express', paymentId: 'mpesa' }),
  buildOrder({ id: 'VUM-48237', date: '2026-09-25T18:40:00', status: 4, items: [{ id: 20, qty: 1 }, { id: 21, qty: 1 }], address: home, deliveryId: 'normal', paymentId: 'emola' }),
  buildOrder({ id: 'VUM-48102', date: '2026-08-14T11:12:00', status: 5, items: [{ id: 13, qty: 1 }, { id: 30, qty: 2 }], address: home, deliveryId: 'normal', paymentId: 'mpesa' }),
  buildOrder({ id: 'VUM-47955', date: '2026-07-29T16:30:00', status: 5, items: [{ id: 5, qty: 1 }], address: work, deliveryId: 'express', paymentId: 'card' }),
]
