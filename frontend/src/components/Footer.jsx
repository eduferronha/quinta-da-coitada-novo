import { Link } from 'react-router-dom'
import { Trans } from '@lingui/react/macro'
import { quinta } from '../data/quinta'
import Mark from './Mark'
import { noticias } from '../data/noticias'
import RedesSociais from './RedesSociais'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <Mark size={56} />
          <RedesSociais className="footer__social" soIcones size={24} />
        </div>
        <div>
          <h2><Trans>Navegação</Trans></h2>
          <ul>
            <li><Link to="/adega"><Trans>Quinta</Trans></Link></li>
            <li><Link to="/vinhos"><Trans>Vinhos</Trans></Link></li>
            <li><Link to="/alojamento"><Trans>Alojamento</Trans></Link></li>
            {noticias.length > 0 && <li><Link to="/noticias"><Trans>Novidades</Trans></Link></li>}
            <li><Link to="/contactos"><Trans>Contactos</Trans></Link></li>
          </ul>
        </div>
        <div>
          <h2><Trans>Morada</Trans></h2>
          <address>{quinta.morada.map(l => <span key={l}>{l}<br /></span>)}</address>
        </div>
        <div>
          <h2><Trans>Falar connosco</Trans></h2>
          <ul>
            {quinta.telefones.map(t => (
              <li key={t.numero}><a href={`tel:${t.numero.replace(/\s/g, '')}`}>{t.numero}</a><sup>1</sup> · {t.nome}</li>
            ))}
            <li><a href={`mailto:${quinta.emails.geral}`}>{quinta.emails.geral}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__base">
        <p><sup>1</sup> <Trans>Chamada para a rede móvel nacional.</Trans></p>
        <ul>
          <li><Link to="/privacidade"><Trans>Política de privacidade</Trans></Link></li>
          <li><Link to="/cookies"><Trans>Política de cookies</Trans></Link></li>
          <li><a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noreferrer"><Trans>Livro de reclamações</Trans></a></li>
        </ul>
        <p>© {new Date().getFullYear()} {quinta.nome}{quinta.empresa.nome !== quinta.nome && ` · ${quinta.empresa.nome}`}</p>
      </div>
    </footer>
  )
}
