import { Link } from 'react-router-dom'
import { Trans } from '@lingui/react/macro'
import { quinta } from '../data/quinta'

export default function Privacidade() {
  const empresa = quinta.empresa.nome
  const nif = quinta.empresa.nif
  const sede = quinta.empresa.sede
  const marca = quinta.nome
  const email = quinta.emails.geral

  return (
    <article className="legal">
      <header className="page-head">
        <h1><Trans>Política de privacidade</Trans></h1>
        <p><Trans>Como tratamos os dados pessoais que nos envia pelo formulário de contacto.</Trans></p>
      </header>

      <div className="legal__body">
        <p className="legal__data"><Trans>Última atualização: 21 de outubro de 2026</Trans></p>

        <h2><Trans>Quem é responsável pelos seus dados</Trans></h2>
        <p>
          <Trans>
            O responsável pelo tratamento é a <strong>{empresa}</strong>, que produz e comercializa os vinhos
            da {marca}, com o NIF {nif} e sede em {sede}.
            Para qualquer questão sobre os seus dados, escreva para <a href={`mailto:${email}`}>{email}</a>.
          </Trans>
        </p>

        <h2><Trans>Que dados recolhemos</Trans></h2>
        <p><Trans>Só recolhemos os dados que escreve no <Link to="/contactos">formulário de contacto</Link>:</Trans></p>
        <ul>
          <li><Trans>nome;</Trans></li>
          <li><Trans>email;</Trans></li>
          <li><Trans>telefone, se o indicar (é opcional);</Trans></li>
          <li><Trans>assunto e mensagem.</Trans></li>
        </ul>
        <p>
          <Trans>
            O site não usa ferramentas de estatística, publicidade ou redes sociais que recolham dados sobre a sua
            visita. Veja a <Link to="/cookies">política de cookies</Link>.
          </Trans>
        </p>

        <h2><Trans>Para que usamos os dados</Trans></h2>
        <p>
          <Trans>
            Usamos os dados apenas para responder ao seu pedido: marcar visitas e provas, tratar de encomendas e
            distribuição, ou responder a pedidos de imprensa. Não os usamos para enviar publicidade nem os vendemos
            ou cedemos a terceiros para esse fim.
          </Trans>
        </p>

        <h2><Trans>Com que fundamento</Trans></h2>
        <p>
          <Trans>
            O tratamento baseia-se no seu consentimento, dado ao assinalar a caixa no formulário (artigo 6.º, n.º 1,
            alínea a) do Regulamento Geral sobre a Proteção de Dados). Quando o pedido é uma encomenda, baseia-se
            também nas diligências necessárias antes de um contrato (alínea b).
          </Trans>
        </p>

        <h2><Trans>Durante quanto tempo os guardamos</Trans></h2>
        <p>
          <Trans>
            Guardamos as mensagens durante o tempo necessário para tratar o seu pedido e, no máximo, dois anos após o
            último contacto. Depois disso são apagadas, exceto se a lei nos obrigar a guardá-las por mais tempo
            (por exemplo, quando dão origem a uma venda faturada).
          </Trans>
        </p>

        <h2><Trans>Quem tem acesso</Trans></h2>
        <p>
          <Trans>
            As mensagens são lidas apenas por quem trabalha na quinta. São encaminhadas para o nosso email por um
            serviço de envio de formulários e ficam guardadas na nossa caixa de correio. Estas empresas tratam os dados
            por nossa conta e não os podem usar para outros fins. Se algum destes prestadores estiver fora do Espaço
            Económico Europeu, a transferência é feita com as garantias exigidas pelo RGPD.
          </Trans>
        </p>

        <h2><Trans>Os seus direitos</Trans></h2>
        <p><Trans>Pode, a qualquer momento e sem custos:</Trans></p>
        <ul>
          <li><Trans>saber que dados temos sobre si e pedir uma cópia;</Trans></li>
          <li><Trans>corrigir dados errados ou incompletos;</Trans></li>
          <li><Trans>pedir que os apaguemos;</Trans></li>
          <li><Trans>limitar ou opor-se ao tratamento;</Trans></li>
          <li><Trans>pedir os dados num formato que possa levar para outra entidade;</Trans></li>
          <li><Trans>retirar o consentimento, sem que isso afete o tratamento feito até então.</Trans></li>
        </ul>
        <p>
          <Trans>
            Para exercer qualquer destes direitos, escreva para <a href={`mailto:${email}`}>{email}</a>. Respondemos no prazo de um mês. Se considerar
            que os seus dados não foram bem tratados, pode apresentar queixa à Comissão Nacional de Proteção de Dados
            (<a href="https://www.cnpd.pt" target="_blank" rel="noreferrer">www.cnpd.pt</a>).
          </Trans>
        </p>

        <h2><Trans>Ligações para outros sites</Trans></h2>
        <p>
          <Trans>
            O site tem ligações para o Instagram, o Google Maps e o Livro de Reclamações. Ao abri-las, passa a
            aplicar-se a política de privacidade de cada um desses serviços.
          </Trans>
        </p>

        <h2><Trans>Alterações</Trans></h2>
        <p><Trans>Se esta política mudar, publicamos aqui a nova versão e atualizamos a data no topo.</Trans></p>
      </div>
    </article>
  )
}
