// Versão traduzida (Lingui) dos títulos e descrições de meta.js, aplicada no browser ao mudar de idioma.
// Os textos de origem têm de ser iguais aos de meta.js.
import { msg } from '@lingui/core/macro'
import { metaPara } from './meta.js'
import { vinhos } from './vinhos.js'
import { noticias } from './noticias.js'
import { quinta } from './quinta.js'
import { nomesCores } from './vinhosTextos'
import { texto } from './vinhosBase.js'

const marca = quinta.nome

const paginas = {
  '/adega': {
    titulo: null, // só o nome da quinta, igual em todas as línguas
    descricao: msg`Quinta no Douro com vista para o rio, entre vinhas em socalcos. Conheça os vinhos da quinta e o alojamento local com piscina.`,
  },
  '/vinhos': {
    titulo: msg`Vinhos | ${marca}`,
    descricao: msg`Xisto Grande Reserva, Coitada Reserva, Socalco tinto e branco Douro DOC, e tinto e branco em bag-in-box. Fichas técnicas e notas de prova.`,
  },
  '/alojamento': {
    titulo: msg`Alojamento | ${marca}`,
    descricao: msg`Moradia de dois quartos na Quinta da Coitada, no Douro, com piscina, terraço, varanda e vista para o rio. Reserve no Booking.com ou no Airbnb.`,
  },
  '/noticias': {
    titulo: msg`Novidades | ${marca}`,
    descricao: msg`Novidades da quinta: vindimas, vinhos novos, prémios e eventos.`,
  },
  '/contactos': {
    titulo: msg`Contactos e visitas | ${marca}`,
    descricao: msg`Morada, horário e contactos da quinta. Marque uma visita ou prova, ou fale connosco sobre encomendas e distribuição.`,
  },
  '/privacidade': {
    titulo: msg`Política de privacidade | ${marca}`,
    descricao: msg`Como a ${marca} trata os dados pessoais enviados pelo formulário de contacto.`,
  },
  '/cookies': {
    titulo: msg`Política de cookies | ${marca}`,
    descricao: msg`Que cookies e serviços de terceiros o site da ${marca} usa.`,
  },
}

const naoEncontrada = msg`Página não encontrada | ${marca}`

export function metaTraduzida(pathname, i18n) {
  const m = metaPara(pathname, vinhos, undefined, noticias)
  if (i18n.locale === 'pt') return m

  const caminho = pathname.replace(/\/+$/, '') || '/adega'
  const pagina = paginas[caminho]
  if (pagina) return { ...m, titulo: pagina.titulo ? i18n._(pagina.titulo) : m.titulo, descricao: i18n._(pagina.descricao) }

  const n = noticias.find(x => `/noticias/${x.slug}` === caminho)
  if (n) return { ...m, titulo: `${texto(n, 'titulo', i18n.locale)} | ${marca}`, descricao: texto(n, 'resumo', i18n.locale) || m.descricao }

  const v = vinhos.find(x => `/vinhos/${x.slug}` === caminho)
  if (!v) return { ...m, titulo: i18n._(naoEncontrada), descricao: i18n._(paginas['/adega'].descricao) }

  if (v.inclui?.length) {
    const nomes = v.inclui.map(s => vinhos.find(x => x.slug === s)).filter(Boolean).map(x => texto(x, 'nome', i18n.locale)).join(', ')
    return { ...m, titulo: `${texto(v, 'nome', i18n.locale)} | ${marca}`, descricao: i18n._(msg`Caixa de oferta em madeira com vinhos do Douro: ${nomes}.`) }
  }

  const cor = v.cor ? i18n._(nomesCores[v.cor]) : ''
  const tipo = v.categoria === 'bag-in-box' ? i18n._(msg`${cor} em bag-in-box`) : i18n._(msg`Vinho ${cor}`)
  const partes = [tipo, v.regiao, v.colheita, v.formato].filter(Boolean).join(', ')
  const lista = v.castas?.join(', ')
  const castas = lista ? ' ' + i18n._(msg`Castas: ${lista}.`) : ''
  return { ...m, descricao: `${partes}.${castas} ${i18n._(msg`Ficha técnica e notas de prova.`)}` }
}
