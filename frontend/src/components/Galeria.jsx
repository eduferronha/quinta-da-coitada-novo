import { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react/macro'

// Grelha de fotografias; ao clicar, a foto abre em ecrã inteiro (setas e Esc no teclado).
// `fotos`: [{ src, alt }]
export default function Galeria({ fotos }) {
  const { t } = useLingui()
  const [aberta, setAberta] = useState(null)
  const mover = d => setAberta(i => (i + d + fotos.length) % fotos.length)

  useEffect(() => {
    if (aberta === null) return
    const tecla = e => {
      if (e.key === 'Escape') setAberta(null)
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    document.addEventListener('keydown', tecla)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', tecla); document.body.style.overflow = '' }
  }, [aberta])

  return (
    <>
      <ul className="galeria">
        {fotos.map((f, i) => (
          <li key={f.src}>
            <button onClick={() => setAberta(i)} aria-label={t`Ampliar: ${f.alt}`}>
              <img src={f.src} alt={f.alt} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      {aberta !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={fotos[aberta].alt} onClick={() => setAberta(null)}>
          <img src={fotos[aberta].src} alt={fotos[aberta].alt} onClick={e => e.stopPropagation()} />
          <button className="lightbox__fechar" onClick={() => setAberta(null)} aria-label={t`Fechar`}>✕</button>
          <button className="lightbox__seta lightbox__seta--ant" onClick={e => { e.stopPropagation(); mover(-1) }} aria-label={t`Anterior`}>←</button>
          <button className="lightbox__seta lightbox__seta--seg" onClick={e => { e.stopPropagation(); mover(1) }} aria-label={t`Seguinte`}>→</button>
          <p className="lightbox__conta">{aberta + 1} / {fotos.length}</p>
        </div>
      )}
    </>
  )
}
