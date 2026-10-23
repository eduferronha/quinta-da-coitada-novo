import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import { vinhos } from '../data/vinhos'
import { nomesAnalise, nomesCategorias, nomesCores } from '../data/vinhosTextos'
import { texto } from '../data/vinhosBase'
import { nomeDe, numero, percentagem, resumo, temperatura } from '../data/formatar'
import NotFound from './NotFound'
import { LinhaVinho } from './Vinhos'

function Galeria({ fotos, legendas }) {
  const { t } = useLingui()
  const [i, setI] = useState(0)
  return (
    <div className="wine__media">
      <div className="wine__stage">
        <img src={fotos[i]} alt={legendas[i]} />
      </div>
      {fotos.length > 1 && (
        <ul className="wine__thumbs" aria-label={t`Fotografias`}>
          {fotos.map((f, n) => (
            <li key={f}>
              <button aria-pressed={i === n} onClick={() => setI(n)} aria-label={t`Ver fotografia ${n + 1}`}>
                <img src={f} alt="" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Vinho() {
  const { t, i18n } = useLingui()
  const { slug } = useParams()
  const v = vinhos.find(x => x.slug === slug)
  if (!v) return <NotFound />

  // Textos do vinho na língua atual (com o português como alternativa)
  const tx = campo => texto(v, campo, i18n.locale)
  const categoria = i18n._(nomesCategorias[v.categoria])
  // Numa caixa mostram-se os vinhos que inclui; num vinho, as caixas onde entra e outros vinhos
  const inclui = (v.inclui ?? []).map(s => vinhos.find(x => x.slug === s)).filter(Boolean)
  const caixas = vinhos.filter(x => x.inclui?.includes(v.slug))
  const outros = inclui.length ? [] : vinhos.filter(x => x.slug !== v.slug && !x.inclui).slice(0, 3)

  const ficha = [
    [t`Formato`, categoria + (v.formato ? `, ${v.formato}` : '')],
    v.cor && [t`Tipo`, i18n._(nomesCores[v.cor])],
    v.regiao && [t`Região`, v.regiao],
    v.colheita && [t`Colheita`, v.colheita],
    v.castas && [t`Castas`, v.castas.join(', ')],
    tx('estagio') && [t`Estágio`, tx('estagio')],
    v.alcool && [t`Teor alcoólico`, percentagem(i18n, v.alcool)],
    v.temperatura?.min != null && [t`Temperatura de serviço`, temperatura(i18n, v.temperatura)],
    v.produtor && [t`Produtor`, v.produtor],
  ].filter(Boolean)

  // Legenda (alt) das fotos: a descrição da foto ou, se não houver, o nome; numerada a partir da segunda
  const baseLegenda = tx('descricao_foto') || nomeDe(i18n, v)
  const legendas = (v.fotos ?? []).map((_, n) => (n === 0 ? baseLegenda : `${baseLegenda} (${n + 1})`))

  const unidades = { valorEnergetico: 'kcal/100 ml', ph: '' }
  const entradasAnalise = Object.entries(v.analise ?? {}).filter(([k, n]) => nomesAnalise[k] && n != null && n !== '')
  const analise = entradasAnalise.length > 0 && [
    ...entradasAnalise.map(([k, n]) => [
      i18n._(nomesAnalise[k]),
      `${numero(i18n, n)} ${unidades[k] ?? 'g/dm³'}`.trim(),
    ]),
    [t`Alergénicos`, t`Sulfitos`],
  ]

  return (
    <article className="wine">
      <nav className="crumbs" aria-label={t`Caminho`}>
        <Link to="/vinhos"><Trans>Vinhos</Trans></Link>
        <span aria-hidden="true">/</span>
        <Link to={`/vinhos?categoria=${v.categoria}`}>{categoria}</Link>
      </nav>

      <div className="wine__main">
        <Galeria key={v.slug} fotos={v.fotos ?? []} legendas={legendas} />
        <div className="wine__info">
          <p className="label">{categoria}{v.regiao ? ` — ${v.regiao}` : ''}</p>
          <h1>{nomeDe(i18n, v)}</h1>
          <p className="wine__meta">{resumo(i18n, v)}</p>
          {tx('descricao') && <p className="wine__desc">{tx('descricao')}</p>}
          {caixas.map(c => (
            <p key={c.slug} className="wine__also">
              <Trans>Também disponível na <Link to={`/vinhos/${c.slug}`}>caixa de oferta</Link> da quinta.</Trans>
            </p>
          ))}

          <h2><Trans>Ficha técnica</Trans></h2>
          <dl className="spec">
            {ficha.map(([k, val]) => (
              <div key={k}><dt>{k}</dt><dd>{val}</dd></div>
            ))}
          </dl>

          {tx('prova') && <><h2><Trans>Notas de prova</Trans></h2><p>{tx('prova')}</p></>}
          {tx('harmonizacao') && <><h2><Trans>À mesa com</Trans></h2><p>{tx('harmonizacao')}</p></>}
          {tx('conservacao') && <><h2><Trans>Conservação</Trans></h2><p>{tx('conservacao')}</p></>}

          {analise && (
            <>
              <h2><Trans>Análise</Trans></h2>
              <dl className="spec">
                {analise.map(([k, val]) => (
                  <div key={k}><dt>{k}</dt><dd>{val}</dd></div>
                ))}
              </dl>
            </>
          )}

          {v.ficha && (
            <a href={v.ficha} className="btn btn--ghost" target="_blank" rel="noreferrer"><Trans>Ver ficha técnica</Trans></a>
          )}
        </div>
      </div>

      {inclui.length > 0 && (
        <section className="more">
          <h2><Trans>Inclui</Trans></h2>
          <ul className="wine-list">
            {inclui.map(o => <LinhaVinho key={o.slug} v={o} titulo="h3" />)}
          </ul>
        </section>
      )}

      {outros.length > 0 && (
        <section className="more">
          <h2><Trans>Outros vinhos</Trans></h2>
          <ul className="wine-list">
            {outros.map(o => <LinhaVinho key={o.slug} v={o} titulo="h3" />)}
          </ul>
        </section>
      )}
    </article>
  )
}
