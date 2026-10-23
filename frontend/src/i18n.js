import { i18n } from '@lingui/core'
import pt from 'flag-icons/flags/4x3/pt.svg'
import gb from 'flag-icons/flags/4x3/gb.svg'
import fr from 'flag-icons/flags/4x3/fr.svg'
import es from 'flag-icons/flags/4x3/es.svg'
import de from 'flag-icons/flags/4x3/de.svg'

// Cada idioma aparece no seletor com o nome na própria língua e a bandeira do país
export const idiomas = [
  { codigo: 'pt', nome: 'Português', bandeira: pt },
  { codigo: 'en', nome: 'English', bandeira: gb },
  { codigo: 'fr', nome: 'Français', bandeira: fr },
  { codigo: 'es', nome: 'Español', bandeira: es },
  { codigo: 'de', nome: 'Deutsch', bandeira: de },
]

const CHAVE = 'idioma'
const suportado = c => idiomas.some(i => i.codigo === c)

// Escolha guardada pelo visitante; senão, a língua do browser; senão, português
export function idiomaInicial() {
  try {
    const guardado = localStorage.getItem(CHAVE)
    if (suportado(guardado)) return guardado
  } catch {}
  const browser = (navigator.languages ?? [navigator.language]).map(l => l?.slice(0, 2).toLowerCase())
  return browser.find(suportado) ?? 'pt'
}

export async function ativarIdioma(codigo) {
  const { messages } = await import(`./locales/${codigo}/messages.po`)
  i18n.loadAndActivate({ locale: codigo, messages })
  document.documentElement.lang = codigo === 'pt' ? 'pt-PT' : codigo
  try { localStorage.setItem(CHAVE, codigo) } catch {}
}

export { i18n }
