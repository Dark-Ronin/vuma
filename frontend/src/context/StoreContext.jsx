import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../data/products'
import { mockOrders, buildOrder, initialAddresses } from '../data/orders'

const StoreContext = createContext(null)
export const useStore = () => useContext(StoreContext)

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* sem storage */ }
  }, [key, value])
  return [value, setValue]
}

export function StoreProvider({ children }) {
  const [cart, setCart] = usePersisted('vuma_cart', [])
  const [wishlist, setWishlist] = usePersisted('vuma_wishlist', [])
  const [userOrders, setUserOrders] = usePersisted('vuma_orders', [])
  const [addresses, setAddresses] = usePersisted('vuma_addresses', initialAddresses)
  const [toast, setToast] = useState(null)
  const timer = useRef()

  const notify = useCallback((message) => {
    setToast(message)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const addToCart = useCallback((id, qty = 1, silent = false) => {
    const p = products.find((x) => x.id === id)
    if (!p || p.stock < 1) return
    setCart((c) => {
      const found = c.find((i) => i.id === id)
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: Math.min(p.stock, i.qty + qty) } : i))
      return [...c, { id, qty: Math.min(p.stock, qty) }]
    })
    if (!silent) notify(`Adicionado ao carrinho: ${p.name}`)
  }, [notify, setCart])

  const removeFromCart = useCallback((id) => setCart((c) => c.filter((i) => i.id !== id)), [setCart])

  const setQty = useCallback((id, qty) => {
    const p = products.find((x) => x.id === id)
    if (!p) return
    if (qty < 1) return removeFromCart(id)
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.min(p.stock, qty) } : i)))
  }, [removeFromCart, setCart])

  const toggleWishlist = useCallback((id) => {
    setWishlist((w) => {
      const has = w.includes(id)
      notify(has ? 'Removido dos favoritos' : 'Guardado nos favoritos')
      return has ? w.filter((x) => x !== id) : [...w, id]
    })
  }, [notify, setWishlist])

  const addAddress = useCallback((a) => setAddresses((list) => [...list, a]), [setAddresses])
  const removeAddress = useCallback((id) => setAddresses((list) => list.filter((a) => a.id !== id)), [setAddresses])

  const lines = useMemo(
    () => cart.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((l) => l.product),
    [cart]
  )
  const cartCount = lines.reduce((s, l) => s + l.qty, 0)
  const itemsTotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const originalTotal = lines.reduce((s, l) => s + (l.product.oldPrice || l.product.price) * l.qty, 0)

  const orders = useMemo(() => [...userOrders, ...mockOrders], [userOrders])
  const getOrder = useCallback((id) => orders.find((o) => o.id === id), [orders])

  const placeOrder = ({ address, deliveryId, paymentId }) => {
    let id
    do { id = `VUM-${10000 + Math.floor(Math.random() * 89999)}` } while (orders.some((o) => o.id === id))
    const order = buildOrder({
      id, date: new Date().toISOString(), status: paymentId === 'cod' ? 0 : 1,
      items: cart, address, deliveryId, paymentId,
    })
    setUserOrders((o) => [order, ...o])
    setCart([])
    return order
  }

  const value = {
    lines, cartCount, itemsTotal, originalTotal, addToCart, removeFromCart, setQty,
    wishlist, toggleWishlist, isWished: (id) => wishlist.includes(id),
    orders, getOrder, placeOrder, addresses, addAddress, removeAddress, toast,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
