import { Link } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import { msg } from '@lingui/core/macro'
import Placeholder from '../components/Placeholder'
import Galeria from '../components/Galeria'
import { quinta } from '../data/quinta'
import { LogoBooking, LogoAirbnb } from '../components/LogosReservas'
import fotoVista from '../img/alojamento/vista-1.jpg'
import fotoVista2 from '../img/alojamento/vista-2.jpg'
import fotoQuarto1 from '../img/alojamento/quarto-1.jpg'
import fotoQuarto2 from '../img/alojamento/quarto-2.jpg'
import fotoQuarto3 from '../img/alojamento/quarto-3.jpg'
import fotoBanho1 from '../img/alojamento/casa-banho-1.jpg'
import fotoBanho3 from '../img/alojamento/casa-banho-3.jpg'
import fotoCozinha1 from '../img/alojamento/cozinha-1.jpg'
import fotoCozinha2 from '../img/alojamento/cozinha-2.jpg'
import fotoVaranda from '../img/alojamento/varanda-1.jpg'

// Informação do site antigo da quinta (e do anúncio no Booking)
const comodidades = [
  msg`2 quartos`,
  msg`Sala de estar`,
  msg`Cozinha equipada, com frigorífico e máquina de café`,
  msg`2 casas de banho com duche e produtos de higiene`,
  msg`Toalhas e roupa de cama`,
  msg`Ar condicionado`,
  msg`Piscina`,
  msg`Terraço, varanda e jardim`,
  msg`Estacionamento privado gratuito`,
]


export default function Alojamento() {
  const { t, i18n } = useLingui()
  const fotos = [
    { src: fotoQuarto3, alt: t`Quarto com cama de casal e parede de rocha` },
    { src: fotoCozinha1, alt: t`Cozinha e mesa de jantar, com paredes de pedra` },
    { src: fotoVaranda, alt: t`Alpendre de madeira com vista para o vale` },
    { src: fotoQuarto1, alt: t`Quarto com parede de rocha natural` },
    { src: fotoBanho3, alt: t`Duche com paredes de pedra` },
    { src: fotoVista2, alt: t`O rio Douro visto da quinta` },
    { src: fotoQuarto2, alt: t`Quarto com cama de casal` },
    { src: fotoCozinha2, alt: t`Cozinha com frigorífico e placa` },
    { src: fotoBanho1, alt: t`Casa de banho com lavatório de pedra` },
  ]

  return (
    <section className="stay">
      <header className="page-head">
        <p className="label"><Trans>Alojamento Local</Trans></p>
        <h1><Trans>Ficar na quinta</Trans></h1>
        <p>
          <Trans>
            Uma moradia com vista para a piscina e para o Douro, com terraço, varanda, jardim e estacionamento
            privado gratuito.
          </Trans>
        </p>
      </header>

      <Placeholder src={fotoVista} alt={t`Vista da casa sobre o rio Douro e as vinhas em socalcos`} ratio="21 / 9" className="stay__capa" />

      <div className="stay__split stay__split--casa">
        <div>
          <p className="label"><Trans>A casa</Trans></p>
          <h2><Trans>Pedra, madeira e vista para o rio</Trans></h2>
          <p className="stay__texto">
            <Trans>
              A moradia tem dois quartos, sala de estar, cozinha totalmente equipada e duas casas de banho.
              As paredes de pedra e rocha natural ficaram à vista em quase todas as divisões.
            </Trans>
          </p>
        </div>
        <ul className="stay__lista">
          {comodidades.map(c => <li key={c.id}>{i18n._(c)}</li>)}
        </ul>
      </div>

      <div className="stay__galeria">
        <p className="label"><Trans>Fotografias</Trans></p>
        <Galeria fotos={fotos} />
      </div>

      <section className="reserva" aria-labelledby="reserva-title">
        <div>
          <h2 id="reserva-title"><Trans>Faça a sua reserva</Trans></h2>
          <p><Trans>Veja as datas livres e reserve no Booking.com ou no Airbnb. Para outras questões, <Link to="/contactos?assunto=Alojamento">fale connosco</Link>.</Trans></p>
        </div>
        <div className="reserva__botoes">
          <a className="reserva__btn reserva__btn--booking" href={quinta.reservas.booking} target="_blank" rel="noreferrer">
            <LogoBooking /> <span><small><Trans>Reservar no</Trans></small>Booking.com</span>
          </a>
          <a className="reserva__btn reserva__btn--airbnb" href={quinta.reservas.airbnb} target="_blank" rel="noreferrer">
            <LogoAirbnb /> <span><small><Trans>Reservar no</Trans></small>Airbnb</span>
          </a>
        </div>
      </section>
    </section>
  )
}
