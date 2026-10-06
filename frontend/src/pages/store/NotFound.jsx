import EmptyState from '../../components/EmptyState'

export default function NotFound() {
  return (
    <div className="container page">
      <EmptyState icon="🧭" title="Página não encontrada" text="O endereço que abriu não existe." actionTo="/" actionLabel="Ir para o início" />
    </div>
  )
}
