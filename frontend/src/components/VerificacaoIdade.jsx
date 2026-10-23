import { useEffect, useRef, useState } from 'react'
import { Trans } from '@lingui/react/macro'
import Mark from './Mark'
import SeletorIdioma from './SeletorIdioma'

const CHAVE = 'maior-idade'

// A resposta "sim" fica guardada no browser para não perguntar em cada visita.
// Se o browser não deixar guardar (modo privado, etc.), pergunta-se de novo na próxima visita.
export function idadeConfirmada() {
  try { return localStorage.getItem(CHAVE) === 'sim' } catch { return false }
}

// Ecrã inteiro que bloqueia o site até o visitante confirmar que tem 18 anos ou mais
export default function VerificacaoIdade({ onConfirmar }) {
  const [recusou, setRecusou] = useState(false)
  const sim = useRef(null)
  useEffect(() => { sim.current?.focus() }, [])

  const confirmar = () => {
    try { localStorage.setItem(CHAVE, 'sim') } catch {}
    onConfirmar()
  }

  return (
    <div className="idade" role="dialog" aria-modal="true" aria-labelledby="idade-titulo">
      <div className="idade__lang"><SeletorIdioma /></div>
      <div className="idade__caixa">
        <Mark size={72} />
        <p className="idade__marca">Quinta da Coitada</p>
        {recusou ? (
          <>
            <h1 id="idade-titulo"><Trans>Lamentamos</Trans></h1>
            <p><Trans>Para entrar neste site tem de ter idade legal para consumir bebidas alcoólicas.</Trans></p>
            <div className="idade__botoes">
              <button className="btn btn--ghost" onClick={() => setRecusou(false)}><Trans>Voltar</Trans></button>
            </div>
          </>
        ) : (
          <>
            <h1 id="idade-titulo"><Trans>Tem 18 anos ou mais?</Trans></h1>
            <p><Trans>Este site contém informação sobre bebidas alcoólicas. Para entrar, confirme que tem idade legal para as consumir.</Trans></p>
            <div className="idade__botoes">
              <button ref={sim} className="btn" onClick={confirmar}><Trans>Sim, tenho 18 anos ou mais</Trans></button>
              <button className="btn btn--ghost" onClick={() => setRecusou(true)}><Trans>Não</Trans></button>
            </div>
          </>
        )}
        <p className="idade__nota"><Trans>Seja responsável. Beba com moderação.</Trans></p>
      </div>
    </div>
  )
}
