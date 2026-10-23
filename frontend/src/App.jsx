import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Adega from './pages/Adega'
import Vinhos from './pages/Vinhos'
import Vinho from './pages/Vinho'
import Alojamento from './pages/Alojamento'
import Contactos from './pages/Contactos'
import Privacidade from './pages/Privacidade'
import Cookies from './pages/Cookies'
import Noticias from './pages/Noticias'
import Noticia from './pages/Noticia'
import NotFound from './pages/NotFound'
import { Trans, useLingui } from '@lingui/react/macro'
import { metaTraduzida } from './data/metaTraduzida'
import VerificacaoIdade, { idadeConfirmada } from './components/VerificacaoIdade'

// Cria ou atualiza uma tag <meta>/<link> no <head>
function definir(seletor, criar, atributo, valor) {
  let el = document.head.querySelector(seletor)
  if (!el) { el = criar(); document.head.appendChild(el) }
  el.setAttribute(atributo, valor)
}

function aplicarMeta(m) {
  document.title = m.titulo
  const meta = (attr, nome, valor) => definir(`meta[${attr}="${nome}"]`, () => {
    const el = document.createElement('meta'); el.setAttribute(attr, nome); return el
  }, 'content', valor)
  meta('name', 'description', m.descricao)
  meta('property', 'og:title', m.titulo)
  meta('property', 'og:description', m.descricao)
  meta('property', 'og:type', m.tipo)
  meta('property', 'og:url', m.url)
  meta('property', 'og:image', m.imagem)
  definir('link[rel="canonical"]', () => {
    const el = document.createElement('link'); el.rel = 'canonical'; return el
  }, 'href', m.url)
}

export default function App() {
  const { pathname } = useLocation()
  const { i18n } = useLingui()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => { aplicarMeta(metaTraduzida(pathname, i18n)) }, [pathname, i18n.locale])
  const [maior, setMaior] = useState(idadeConfirmada)

  // Enquanto o visitante não confirmar a idade, o site não aparece
  if (!maior) return <VerificacaoIdade onConfirmar={() => setMaior(true)} />

  return (
    <>
      <a href="#conteudo" className="skip"><Trans>Saltar para o conteúdo</Trans></a>
      <Header />
      <main id="conteudo">
        <Routes>
          <Route path="/" element={<Navigate to="/adega" replace />} />
          <Route path="/adega" element={<Adega />} />
          <Route path="/vinhos" element={<Vinhos />} />
          <Route path="/vinhos/:slug" element={<Vinho />} />
          <Route path="/alojamento" element={<Alojamento />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:slug" element={<Noticia />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
