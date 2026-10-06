import { useParams } from 'react-router-dom'
import { BRAND, FREE_SHIPPING_FROM } from '../../config'
import { formatMT } from '../../utils/helpers'
import Button from '../../components/Button'
import NotFound from './NotFound'

const PAGES = {
  about: ['Sobre a ' + BRAND.name, [`A ${BRAND.name} é um marketplace moçambicano: reúne produtos de várias lojas num só lugar, com um checkout único, entrega organizada e apoio ao cliente.`, 'Vendemos produtos próprios e produtos de lojas parceiras. Em cada produto mostramos sempre quem vende.']],
  contact: ['Contacto', ['Fale connosco de segunda a sábado, das 8h às 18h.', 'Telefone: +258 84 000 0000 · E-mail: ajuda@vuma.example · WhatsApp: +258 84 000 0000']],
  help: ['Centro de ajuda', ['Como fazer um pedido: escolha o produto, adicione ao carrinho e siga o checkout em três passos.', 'Como acompanhar um pedido: entre em Meus pedidos e abra o pedido para ver o estado da entrega.']],
  shipping: ['Entregas', [`Entrega normal em 2 a 4 dias úteis por ${formatMT(250)}. É grátis em compras acima de ${formatMT(FREE_SHIPPING_FROM)}.`, `Entrega expressa em 24 horas em Maputo e Matola por ${formatMT(600)}.`]],
  returns: ['Devoluções', ['Tem 7 dias após a receção para devolver um produto intacto, na embalagem original.', 'Depois de recebermos o produto, o reembolso é feito pelo mesmo método de pagamento.']],
  terms: ['Termos e condições', ['Texto provisório. Os termos definitivos serão definidos com o modelo de negócio e a assessoria jurídica.']],
  privacy: ['Privacidade', ['Texto provisório. Neste protótipo, os dados ficam apenas no seu navegador.']],
  sell: ['Vender na ' + BRAND.name, [`Abra a sua loja na ${BRAND.name} e venda a clientes em todo o país.`, 'A plataforma trata do checkout, da logística e do apoio ao cliente. O painel do vendedor será a próxima fase do projeto.']],
}

export default function InfoPage() {
  const { slug } = useParams()
  const page = PAGES[slug]
  if (!page) return <NotFound />
  return (
    <div className="container page narrow">
      <h1>{page[0]}</h1>
      {page[1].map((t) => <p key={t} className="prose">{t}</p>)}
      <Button to="/products" variant="secondary">Voltar às compras</Button>
    </div>
  )
}
