import { useEffect, useRef, useState } from 'react'
import { useLingui } from '@lingui/react/macro'
import { idiomas, ativarIdioma } from '../i18n'

export default function SeletorIdioma() {
  const { i18n, t } = useLingui()
  const [aberto, setAberto] = useState(false)
  const raiz = useRef(null)
  const atual = idiomas.find(i => i.codigo === i18n.locale) ?? idiomas[0]

  // Fecha ao clicar fora ou com Escape
  useEffect(() => {
    if (!aberto) return
    const fora = e => { if (!raiz.current?.contains(e.target)) setAberto(false) }
    const esc = e => { if (e.key === 'Escape') setAberto(false) }
    document.addEventListener('pointerdown', fora)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('pointerdown', fora)
      document.removeEventListener('keydown', esc)
    }
  }, [aberto])

  const escolher = async codigo => {
    setAberto(false)
    if (codigo !== i18n.locale) await ativarIdioma(codigo)
  }

  return (
    <div className="lang" ref={raiz}>
      <button
        className="lang__btn"
        aria-expanded={aberto}
        aria-controls="lang-lista"
        aria-label={t`Idioma: ${atual.nome}`}
        onClick={() => setAberto(a => !a)}
      >
        <img src={atual.bandeira} alt="" className="lang__flag" />
        <span>{atual.codigo.toUpperCase()}</span>
      </button>
      {aberto && (
        <ul id="lang-lista" className="lang__list">
          {idiomas.map(i => (
            <li key={i.codigo}>
              <button lang={i.codigo} aria-current={i.codigo === atual.codigo} onClick={() => escolher(i.codigo)}>
                <img src={i.bandeira} alt="" className="lang__flag" />
                <span>{i.nome}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
