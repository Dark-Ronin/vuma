import { products } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import ProductGrid from '../../components/ProductGrid'
import EmptyState from '../../components/EmptyState'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <h1>Favoritos <span className="muted">({items.length})</span></h1>
      {items.length === 0 ? (
        <EmptyState icon="♡" title="Ainda não tem favoritos" text="Toque no coração de um produto para o guardar aqui." actionTo="/products" actionLabel="Explorar produtos" />
      ) : (
        <ProductGrid products={items} />
      )}
    </>
  )
}
