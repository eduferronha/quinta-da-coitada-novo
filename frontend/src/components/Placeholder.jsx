import { Trans } from '@lingui/react/macro'

// Moldura de fotografia. Com `src` mostra a foto (o `alt` descreve-a); sem `src` mostra
// um marcador "Fotografia: legenda" até haver foto real. `posicao` ajusta o enquadramento.
export default function Placeholder({ legenda, src, alt = '', posicao = 'center', ratio = '4 / 5', tom = 'claro', className = '' }) {
  if (src) {
    return (
      <figure className={`ph ph--foto ${className}`} style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} loading="lazy" style={{ objectPosition: posicao }} />
      </figure>
    )
  }
  return (
    <figure className={`ph ph--${tom} ${className}`} style={{ aspectRatio: ratio }}>
      <figcaption><Trans>Fotografia: {legenda}</Trans></figcaption>
    </figure>
  )
}
