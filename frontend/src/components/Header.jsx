import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import Mark from './Mark'
import SeletorIdioma from './SeletorIdioma'
import { noticias } from '../data/noticias'

export default function Header() {
  const { t } = useLingui()
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setAberto(false) }, [pathname])

  const links = [
    ['/adega', t`Quinta`],
    ['/vinhos', t`Vinhos`],
    ['/alojamento', t`Alojamento`],
    // Só aparece se houver notícias publicadas
    ...(noticias.length ? [['/noticias', t`Novidades`]] : []),
    ['/contactos', t`Contactos`],
  ]

  return (
    <header className={`header ${aberto ? 'is-open' : ''}`}>
      <Link to="/adega" className="header__brand" aria-label={t`Quinta da Coitada — início`}>
        <Mark size={44} />
      </Link>
      <nav id="nav" className="header__nav">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to}>{label}</NavLink>
        ))}
      </nav>
      <div className="header__tools">
        <SeletorIdioma />
        <button
          className="header__toggle"
          aria-expanded={aberto}
          aria-controls="nav"
          onClick={() => setAberto(a => !a)}
        >
          {aberto ? <Trans>Fechar</Trans> : <Trans>Menu</Trans>}
        </button>
      </div>
    </header>
  )
}
