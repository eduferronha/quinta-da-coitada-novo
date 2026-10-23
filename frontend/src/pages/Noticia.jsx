import { Link, useParams } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import { noticias } from '../data/noticias'
import { dataDe, paragrafos } from '../data/noticiasBase'
import { texto } from '../data/vinhosBase'
import NotFound from './NotFound'
import Mark from '../components/Mark'

export default function Noticia() {
  const { t, i18n } = useLingui()
  const { slug } = useParams()
  const n = noticias.find(x => x.slug === slug)
  if (!n) return <NotFound />

  const tx = campo => texto(n, campo, i18n.locale)
  const outras = noticias.filter(x => x.slug !== n.slug).slice(0, 3)

  return (
    <article className="article">
      <nav className="crumbs" aria-label={t`Caminho`}>
        <Link to="/noticias"><Trans>Novidades</Trans></Link>
      </nav>

      <header className="article__head">
        <time dateTime={n.data}>{dataDe(n.data, i18n.locale)}</time>
        <h1>{tx('titulo')}</h1>
        {tx('resumo') && <p className="article__resumo">{tx('resumo')}</p>}
      </header>

      {n.imagem && (
        <figure className="article__img">
          <img src={n.imagem} alt={tx('descricao_imagem') || ''} />
        </figure>
      )}

      <div className="article__corpo">
        {paragrafos(tx('corpo')).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="article__voltar"><Link to="/noticias">← <Trans>Todas as novidades</Trans></Link></p>

      {outras.length > 0 && (
        <section className="more">
          <h2><Trans>Outras novidades</Trans></h2>
          <ul className="news-list">
            {outras.map(o => (
              <li key={o.slug}>
                <Link to={`/noticias/${o.slug}`} className="news-row">
                  <div className={`news-row__img ${o.imagem ? '' : 'news-row__img--vazio'}`}>{o.imagem ? <img src={o.imagem} alt="" loading="lazy" /> : <Mark size={60} />}</div>
                  <div className="news-row__txt">
                    <time dateTime={o.data}>{dataDe(o.data, i18n.locale)}</time>
                    <h3>{texto(o, 'titulo', i18n.locale)}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
