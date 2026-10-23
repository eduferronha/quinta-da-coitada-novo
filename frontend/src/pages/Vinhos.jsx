import { Link, useSearchParams } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import { categorias, vinhos } from '../data/vinhos'
import { nomesCategorias } from '../data/vinhosTextos'
import { nomeDe, resumo } from '../data/formatar'

// Linha do índice de vinhos (também usada na página de cada vinho)
export function LinhaVinho({ v, titulo: H = 'h2' }) {
  const { i18n } = useLingui()
  return (
    <li>
      <Link to={`/vinhos/${v.slug}`} className="wine-row">
        <span className="wine-row__img"><img src={v.fotos?.[0]} alt="" loading="lazy" /></span>
        <H className="wine-row__nome">{nomeDe(i18n, v)}</H>
        <span className="wine-row__meta">{resumo(i18n, v)}</span>
        <span className="wine-row__seta" aria-hidden="true">→</span>
      </Link>
    </li>
  )
}

export default function Vinhos() {
  const { t, i18n } = useLingui()
  const [params, setParams] = useSearchParams()
  const atual = params.get('categoria') ?? 'todos'
  const lista = atual === 'todos' ? vinhos : vinhos.filter(v => v.categoria === atual)

  return (
    <section className="wines">
      <header className="page-head">
        <p className="label"><Trans>Douro DOC</Trans></p>
        <h1><Trans>Os vinhos da Coitada</Trans></h1>
        <p>
          <Trans>
            Vinhos do Douro de uma só encosta: o Xisto Grande Reserva das vinhas velhas, o Coitada Reserva,
            os Socalco tinto e branco para todos os dias, e tinto e branco em bag-in-box.
          </Trans>
        </p>
      </header>

      <div className="filter" role="group" aria-label={t`Filtrar por formato`}>
        {categorias.filter(c => c === 'todos' || vinhos.some(v => v.categoria === c)).map(c => (
          <button
            key={c}
            aria-pressed={atual === c}
            onClick={() => setParams(c === 'todos' ? {} : { categoria: c })}
          >
            {i18n._(nomesCategorias[c])}
            <sup className="filter__n">
              {c === 'todos' ? vinhos.length : vinhos.filter(v => v.categoria === c).length}
            </sup>
          </button>
        ))}
      </div>

      <ul className="wine-list">
        {lista.map(v => <LinhaVinho key={v.slug} v={v} />)}
      </ul>
    </section>
  )
}
