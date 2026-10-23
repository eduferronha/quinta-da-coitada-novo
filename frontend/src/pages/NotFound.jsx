import { Link } from 'react-router-dom'
import { Trans } from '@lingui/react/macro'

export default function NotFound() {
  return (
    <section className="notfound">
      <h1><Trans>Esta página não existe</Trans></h1>
      <p><Trans>O endereço pode ter mudado. Volte à <Link to="/adega">quinta</Link> ou veja os <Link to="/vinhos">vinhos</Link>.</Trans></p>
    </section>
  )
}
