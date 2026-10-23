import { Link } from 'react-router-dom'
import { Trans } from '@lingui/react/macro'
import { quinta } from '../data/quinta'

export default function Cookies() {
  const marca = quinta.nome
  return (
    <article className="legal">
      <header className="page-head">
        <h1><Trans>Política de cookies</Trans></h1>
        <p><Trans>Este site não usa cookies. Explicamos aqui o que isso quer dizer.</Trans></p>
      </header>

      <div className="legal__body">
        <p className="legal__data"><Trans>Última atualização: 21 de outubro de 2026</Trans></p>

        <h2><Trans>O que são cookies</Trans></h2>
        <p>
          <Trans>
            Cookies são pequenos ficheiros que um site guarda no seu browser para se lembrar de si entre visitas,
            medir audiências ou mostrar publicidade.
          </Trans>
        </p>

        <h2><Trans>Que cookies usamos</Trans></h2>
        <p>
          <Trans>
            Nenhum. O site da {marca} não usa cookies nem ferramentas de estatística, publicidade ou botões de
            redes sociais. Por isso também não lhe pedimos consentimento à entrada.
          </Trans>
        </p>
        <p>
          <Trans>
            O site guarda apenas, no seu browser, o idioma que escolheu e a confirmação de que tem 18 anos ou mais,
            para não lhe voltar a perguntar na próxima visita. Esta informação não é enviada para nenhum servidor e
            pode apagá-la a qualquer momento nas definições do browser.
          </Trans>
        </p>
        <p>
          <Trans>As fotografias e os tipos de letra são servidos pelo próprio site, sem pedidos a serviços de terceiros.</Trans>
        </p>

        <h2><Trans>Ligações para outros sites</Trans></h2>
        <p>
          <Trans>
            As ligações para o Instagram, o Google Maps e o Livro de Reclamações abrem esses serviços, que podem
            usar os seus próprios cookies. Consulte as políticas de cada um.
          </Trans>
        </p>

        <h2><Trans>Como controlar os cookies</Trans></h2>
        <p><Trans>Em qualquer site, pode ver e apagar cookies nas definições do seu browser, ou bloqueá-los por completo.</Trans></p>

        <h2><Trans>Alterações</Trans></h2>
        <p>
          <Trans>
            Se passarmos a usar cookies (por exemplo, para estatísticas de visitas), atualizamos esta página e
            pedimos o seu consentimento antes de os ativar. Sobre o formulário de contacto, veja a <Link to="/privacidade">política de privacidade</Link>.
          </Trans>
        </p>
      </div>
    </article>
  )
}
