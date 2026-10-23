import { Link } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import { noticias } from '../data/noticias'
import { dataDe } from '../data/noticiasBase'
import { texto } from '../data/vinhosBase'
import Mark from '../components/Mark'

export default function Noticias() {
  const { i18n } = useLingui()
  const tx = (n, campo) => texto(n, campo, i18n.locale)

  return (
    <section className="news">
      <header className="page-head">
        <h1><Trans>Novidades</Trans></h1>
        <p><Trans>Novidades da quinta: vindimas, vinhos novos, prémios e eventos.</Trans></p>
      </header>

      {noticias.length === 0 ? (
        <p className="news__vazio"><Trans>Ainda não há novidades.</Trans></p>
      ) : (
        // A mais recente aparece em destaque; as outras em linhas
        <ul className="news-list">
          {noticias.map((n, i) => (
            <li key={n.slug}>
              <Link to={`/noticias/${n.slug}`} className={`news-row ${i === 0 ? 'news-row--destaque' : ''}`}>
                <div className={`news-row__img ${n.imagem ? '' : 'news-row__img--vazio'}`}>
                  {n.imagem ? <img src={n.imagem} alt="" loading="lazy" /> : <Mark size={72} />}
                </div>
                <div className="news-row__txt">
                  <time dateTime={n.data}>{dataDe(n.data, i18n.locale)}</time>
                  <h2>{tx(n, 'titulo')}</h2>
                  {tx(n, 'resumo') && <p>{tx(n, 'resumo')}</p>}
                  <span className="news-row__mais"><Trans>Ler mais</Trans> →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
