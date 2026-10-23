import { Link } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import Placeholder from '../components/Placeholder'
import fotoHero from '../img/quinta/douro.jpg'
import fotoVista from '../img/alojamento/vista-2.jpg'
import fotoTelhado from '../img/alojamento/vista-1.jpg'
import fotoVaranda from '../img/alojamento/varanda-1.jpg'

// Textos com base no site antigo da quinta. A história da família fica por escrever (ver PENDENTE.md).
export default function Adega() {
  const { t } = useLingui()
  // Faixa que desliza por baixo da capa (repetida para o movimento não ter fim)
  const faixa = [t`Douro`, t`Vista para o rio`, t`Vinha em socalcos`, t`Alojamento Local`, t`Piscina`, t`Casa em pedra`]

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__img" src={fotoHero} alt="" />
        <div className="hero__conteudo">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__small">Quinta da</span> Coitada
          </h1>
          <p className="hero__lede">
            <Trans>
              Uma casa de pedra entre vinhas em socalcos, com vista para o rio Douro. Para conhecer os vinhos
              da quinta ou ficar uns dias.
            </Trans>
          </p>
          <a href="#quinta" className="hero__scroll"><Trans>Conhecer a quinta</Trans> ↓</a>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__fita">
          {[0, 1].map(k => (
            <span key={k}>{faixa.map(f => <span key={f}>{f}<i>✺</i></span>)}</span>
          ))}
        </div>
      </div>

      <section id="quinta" className="story">
        <div className="story__intro">
          <p className="label"><Trans>A quinta</Trans></p>
          <h2><Trans>Entre a vinha e o rio</Trans></h2>
        </div>
        <div className="story__text">
          <p className="story__lead">
            <Trans>
              A Quinta da Coitada fica no Douro vinhateiro, numa encosta de vinha em socalcos virada para o rio.
            </Trans>
          </p>
          <div className="story__cols">
            <p>
              <Trans>
                Aqui faz-se vinho e recebem-se hóspedes: a casa da quinta tem paredes de pedra, piscina, terraço e
                varanda sobre o vale.
              </Trans>
            </p>
            <p>
              <Trans>
                É um bom ponto de partida para o Douro: o Museu do Douro, o Museu do Vinho de São João da Pesqueira
                e o Palácio de Mateus ficam a menos de 50 km.
              </Trans>
            </p>
          </div>
        </div>
        <div className="story__media">
          <Placeholder src={fotoVista} alt={t`O rio Douro visto da quinta, com vinhas em socalcos nas duas margens`} ratio="16 / 10" className="story__ph-a" />
          <Placeholder src={fotoTelhado} alt={t`Vista sobre o telhado da casa para o rio Douro`} ratio="3 / 4" posicao="70% center" className="story__ph-b" />
        </div>
      </section>

      <section className="figure" aria-labelledby="fig-title">
        <Placeholder src={fotoVaranda} alt={t`Alpendre de madeira da casa, com vista para o vale`} ratio="21 / 9" className="figure__media" />
        <div className="figure__text">
          <p className="label"><Trans>Alojamento</Trans></p>
          <h2 id="fig-title"><Trans>Ficar na quinta</Trans></h2>
          <p>
            <Trans>
              Uma moradia com dois quartos, cozinha equipada, piscina e varanda virada para o Douro.
            </Trans>
          </p>
          <p><Link to="/alojamento"><Trans>Ver o alojamento</Trans> →</Link></p>
        </div>
      </section>

      <section className="next">
        <Link to="/vinhos" className="next__link">
          <small><Trans>Os vinhos da quinta</Trans></small>
          <span><Trans>Ver os vinhos</Trans> <i aria-hidden="true">→</i></span>
        </Link>
        <Link to="/contactos" className="next__link">
          <small><Trans>Localização e contactos</Trans></small>
          <span><Trans>Falar connosco</Trans> <i aria-hidden="true">→</i></span>
        </Link>
      </section>
    </>
  )
}
