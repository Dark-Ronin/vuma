import { sellers } from '../../data/sellers'
import SellerCard from '../../components/SellerCard'

export default function Stores() {
  return (
    <div className="container page">
      <h1>Lojas</h1>
      <p className="muted">Todos os produtos são vendidos por lojas verificadas. Conheça quem vende.</p>
      <div className="sgrid">{sellers.map((s) => <SellerCard key={s.id} seller={s} />)}</div>
    </div>
  )
}
