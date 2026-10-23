import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Trans, useLingui } from '@lingui/react/macro'
import { msg } from '@lingui/core/macro'
import { quinta } from '../data/quinta'
import RedesSociais from '../components/RedesSociais'
import { ComIcone } from '../components/Icones'
// import { horario } from '../data/conteudo'

// O valor enviado ao backend fica em português (é o que ele valida); só o rótulo é traduzido
const assuntos = [
  ['Visitas e provas', msg`Visitas e provas`],
  ['Alojamento', msg`Alojamento`],
  ['Encomendas e distribuição', msg`Encomendas e distribuição`],
  ['Imprensa', msg`Imprensa`],
  ['Geral', msg`Geral`],
]
const vazio = { nome: '', email: '', telefone: '', assunto: '', mensagem: '', consentimento: false }

export default function Contactos() {
  const { t, i18n } = useLingui()
  // Vindo do botão "Pedir reserva" (?assunto=Alojamento), o assunto já vem escolhido
  const [params] = useSearchParams()
  const assuntoInicial = assuntos.some(([v]) => v === params.get('assunto')) ? params.get('assunto') : ''
  const [form, setForm] = useState({ ...vazio, assunto: assuntoInicial })
  const [estado, setEstado] = useState({ tipo: 'idle', msg: '' })
  const email = quinta.emails.geral

  const set = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  // As mensagens são enviadas pelo Web3Forms para o email da quinta (chave em data/quinta.js).
  // Funciona em qualquer alojamento (Cloudflare, Netlify…) e também em desenvolvimento.
  const enviar = async e => {
    e.preventDefault()
    setEstado({ tipo: 'loading', msg: '' })
    try {
      // Anti-spam: se o campo escondido vier preenchido, é um robô — finge-se que correu bem e não se envia
      if (!form['bot-field']) {
        if (!quinta.formulario.web3formsKey) {
          console.warn('[formulário] Falta a chave do Web3Forms em data/quinta.js')
        }
        if (!quinta.formulario.web3formsKey) throw new Error(t`Não foi possível enviar a mensagem. Tente outra vez ou escreva para ${email}.`)
        // FormData (e não JSON): é um pedido "simples", sem a verificação prévia de CORS (preflight)
        const dados = new FormData()
        Object.entries({
          access_key: quinta.formulario.web3formsKey,
          subject: `[Site] ${form.assunto} — ${form.nome}`,
          from_name: 'Site Quinta da Coitada',
          replyto: form.email,
          nome: form.nome,
          email: form.email,
          telefone: form.telefone || '—',
          assunto: form.assunto,
          mensagem: form.mensagem,
          consentimento: form.consentimento ? 'sim' : 'não',
          idioma: i18n.locale,
        }).forEach(([k, v]) => dados.append(k, v))
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: dados })
        const d = await r.json().catch(() => ({}))
        if (!r.ok || !d.success) {
          console.warn('[formulário] O Web3Forms recusou a mensagem:', r.status, d) // para diagnóstico
          throw new Error(t`Não foi possível enviar a mensagem. Tente outra vez ou escreva para ${email}.`)
        }
      }
      setForm(vazio)
      setEstado({ tipo: 'ok', msg: t`Mensagem enviada. Respondemos em até dois dias úteis.` })
    } catch (err) {
      const msgErro = err instanceof TypeError ? t`Sem ligação ao servidor. Tente mais tarde ou escreva para ${email}.` : err.message
      setEstado({ tipo: 'erro', msg: msgErro })
    }
  }

  return (
    <section className="contacts">
      <header className="page-head">
        <h1><Trans>Visite-nos ou escreva-nos</Trans></h1>
        <p><Trans>Recebemos visitas com marcação. Para encomendas, distribuição ou imprensa, ligue-nos, envie um email ou use o formulário.</Trans></p>
      </header>

      <div className="contacts__grid">
        <div className="contacts__info">
          <div>
            <h2><Trans>Morada</Trans></h2>
            <ComIcone nome="morada" as="address">{quinta.morada.map(l => <span key={l}>{l}<br /></span>)}</ComIcone>
            <a href={quinta.mapa} target="_blank" rel="noreferrer" className="btn btn--ghost"><Trans>Obter direções</Trans></a>
          </div>
          <div>
            <h2><Trans>Contactos</Trans></h2>
            <ul className="contacts__list">
              {quinta.telefones.map(t => (
                <ComIcone key={t.numero} nome="telefone" as="li">
                  <a href={`tel:${t.numero.replace(/\s/g, '')}`}>{t.numero}</a><sup>1</sup> · {t.nome}
                </ComIcone>
              ))}
              <ComIcone nome="email" as="li"><a href={`mailto:${quinta.emails.geral}`}>{quinta.emails.geral}</a></ComIcone>
            </ul>
            <RedesSociais className="contacts__social" />
            <p className="note"><sup>1</sup> <Trans>Chamada para a rede móvel nacional.</Trans></p>
          </div>
          {/* Horário escondido até estar definido. Para voltar a mostrar, descomentar este bloco
              e o import de `horario` no topo (os textos e traduções estão em data/conteudo.js).
          <div>
            <h2><Trans>Horário</Trans></h2>
            <dl className="hours">
              {horario.map(([d, h]) => (
                <div key={d.id}><dt>{i18n._(d)}</dt><dd>{i18n._(h)}</dd></div>
              ))}
            </dl>
          </div>
          */}
        </div>

        <form className="form" name="contacto" onSubmit={enviar} noValidate={false}>
          <h2><Trans>Enviar mensagem</Trans></h2>
          {/* Anti-spam: campo invisível que só os robôs preenchem; o Netlify descarta essas mensagens */}
          <p hidden><label>Não preencher: <input name="bot-field" value={form['bot-field'] ?? ''} onChange={set} tabIndex={-1} autoComplete="off" /></label></p>
          <label>
            <span><Trans>Nome completo</Trans></span>
            <input name="nome" value={form.nome} onChange={set} required autoComplete="name" />
          </label>
          <div className="form__row">
            <label>
              <span><Trans>Email</Trans></span>
              <input type="email" name="email" value={form.email} onChange={set} required autoComplete="email" />
            </label>
            <label>
              <span><Trans>Telefone <em>(opcional)</em></Trans></span>
              <input type="tel" name="telefone" value={form.telefone} onChange={set} autoComplete="tel" />
            </label>
          </div>
          <label>
            <span><Trans>Assunto</Trans></span>
            <select name="assunto" value={form.assunto} onChange={set} required>
              <option value="" disabled>{t`Escolha um assunto`}</option>
              {assuntos.map(([valor, rotulo]) => <option key={valor} value={valor}>{i18n._(rotulo)}</option>)}
            </select>
          </label>
          <label>
            <span><Trans>Mensagem</Trans></span>
            <textarea name="mensagem" rows="6" value={form.mensagem} onChange={set} required minLength={10} />
          </label>
          <label className="form__check">
            <input type="checkbox" name="consentimento" checked={form.consentimento} onChange={set} required />
            <span>
              <Trans>
                Autorizo a recolha e tratamento dos meus dados pessoais para responder a esta mensagem.
                Saiba mais na <Link to="/privacidade">política de privacidade</Link>.
              </Trans>
            </span>
          </label>
          <button className="btn" disabled={estado.tipo === 'loading'}>
            {estado.tipo === 'loading' ? t`A enviar…` : t`Enviar mensagem`}
          </button>
          <p className={`form__status is-${estado.tipo}`} role="status" aria-live="polite">{estado.msg}</p>
        </form>
      </div>
    </section>
  )
}
