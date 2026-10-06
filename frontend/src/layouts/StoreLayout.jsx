import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useStore } from '../context/StoreContext'

export default function StoreLayout() {
  const { pathname } = useLocation()
  const { toast } = useStore()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <a href="#conteudo" className="skip">Saltar para o conteúdo</a>
      <Header />
      <main id="conteudo"><Outlet /></main>
      <Footer />
      <div className="toast-region" role="status" aria-live="polite">
        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  )
}
