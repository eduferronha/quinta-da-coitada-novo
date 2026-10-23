// Título, descrição e imagem de pré-visualização de cada página, em português.
// Usado no build (scripts/prerender.js) e no browser (App.jsx), por isso não importa imagens, React, Lingui nem os vinhos.
// As traduções destes textos estão em metaTraduzida.js: ao mudar um texto aqui, mudar também lá.
import { quinta, SITE_URL } from './quinta.js'

const marca = quinta.nome

const paginas = {
  '/adega': {
    titulo: marca,
    descricao: 'Quinta no Douro com vista para o rio, entre vinhas em socalcos. Conheça os vinhos da quinta e o alojamento local com piscina.',
  },
  '/vinhos': {
    titulo: `Vinhos | ${marca}`,
    descricao: 'Xisto Grande Reserva, Coitada Reserva, Socalco tinto e branco Douro DOC, e tinto e branco em bag-in-box. Fichas técnicas e notas de prova.',
  },
  '/alojamento': {
    titulo: `Alojamento | ${marca}`,
    descricao: 'Moradia de dois quartos na Quinta da Coitada, no Douro, com piscina, terraço, varanda e vista para o rio. Reserve no Booking.com ou no Airbnb.',
    imagem: '/og/alojamento.jpg',
  },
  '/noticias': {
    titulo: `Novidades | ${marca}`,
    descricao: 'Novidades da quinta: vindimas, vinhos novos, prémios e eventos.',
  },
  '/contactos': {
    titulo: `Contactos e visitas | ${marca}`,
    descricao: 'Morada, horário e contactos da quinta. Marque uma visita ou prova, ou fale connosco sobre encomendas e distribuição.',
  },
  '/privacidade': {
    titulo: `Política de privacidade | ${marca}`,
    descricao: `Como a ${marca} trata os dados pessoais enviados pelo formulário de contacto.`,
  },
  '/cookies': {
    titulo: `Política de cookies | ${marca}`,
    descricao: `Que cookies e serviços de terceiros o site da ${marca} usa.`,
  },
}

// Só para o HTML gerado no build (português); no browser, as outras línguas vêm de metaTraduzida.js
const corPt = { tinto: 'Tinto', branco: 'Branco' }
const tipoDe = v =>
  v.categoria === 'bag-in-box' ? `${corPt[v.cor] ?? 'Vinho'} em bag-in-box` : v.cor ? `Vinho ${v.cor}` : 'Vinho'

// Imagem de pré-visualização: a de public/og/<slug>.jpg (1200×630) se existir; senão, a primeira foto do vinho
const imagemDe = (v, ogExiste) => (ogExiste(v.slug) ? `/og/${v.slug}.jpg` : v.fotos?.[0])

function metaCaixa(v, vinhos, ogExiste) {
  const nomes = v.inclui.map(s => vinhos.find(x => x.slug === s)?.nome).filter(Boolean)
  return {
    titulo: `${v.nome} | ${marca}`,
    descricao: `Caixa de oferta em madeira com vinhos do Douro: ${nomes.join(', ')}.`,
    imagem: imagemDe(v, ogExiste),
  }
}

function metaVinho(v, vinhos, ogExiste) {
  if (v.inclui?.length) return metaCaixa(v, vinhos, ogExiste)
  const partes = [tipoDe(v), v.regiao, v.colheita, v.formato].filter(Boolean).join(', ')
  const castas = v.castas ? ` Castas: ${v.castas.join(', ')}.` : ''
  return {
    // A região só entra no título se ainda não fizer parte do nome (ex.: "Socalco Douro DOC")
    titulo: `${v.nome}${v.regiao && !v.nome.includes(v.regiao) ? ` — ${v.regiao}` : ''} | ${marca}`,
    descricao: `${partes}.${castas} Ficha técnica e notas de prova.`,
    imagem: imagemDe(v, ogExiste),
  }
}

// Notícia: título, resumo (ou início do texto) e a imagem da notícia
function metaNoticia(n) {
  const resumo = n.resumo || String(n.corpo ?? '').replace(/\s+/g, ' ').slice(0, 160)
  return { titulo: `${n.titulo} | ${marca}`, descricao: resumo, imagem: n.imagem, tipo: 'article' }
}

export const naoEncontrada = { titulo: `Página não encontrada | ${marca}`, descricao: paginas['/adega'].descricao }

// Devolve sempre a meta completa, com URL e imagem absolutos (o WhatsApp e o Facebook exigem-nos).
// `vinhos` vem de vinhos.js (browser) ou dos JSON lidos pelo script de build; `ogExiste(slug)` diz se há
// imagem própria em public/og/ (no browser assume-se que sim: lá estas tags só servem de referência).
export function metaPara(pathname, vinhos, ogExiste = () => true, noticias = []) {
  const caminho = pathname.replace(/\/+$/, '') || '/adega'
  const slug = caminho.match(/^\/vinhos\/([^/]+)$/)?.[1]
  const vinho = slug && vinhos.find(v => v.slug === slug)
  const slugNoticia = caminho.match(/^\/noticias\/([^/]+)$/)?.[1]
  const noticia = slugNoticia && noticias.find(n => n.slug === slugNoticia)
  const base = vinho ? metaVinho(vinho, vinhos, ogExiste)
    : noticia ? metaNoticia(noticia)
    : paginas[caminho] ?? naoEncontrada
  return {
    tipo: 'website',
    ...base,
    url: SITE_URL + caminho,
    imagem: SITE_URL + (base.imagem ?? '/og/site.jpg'),
  }
}

// Todas as rotas que o build deve gerar como HTML próprio (/noticias só se houver notícias publicadas)
export const rotasDe = (vinhos, noticias = []) => [
  ...Object.keys(paginas).filter(p => p !== '/noticias' || noticias.length),
  ...vinhos.map(v => `/vinhos/${v.slug}`),
  ...noticias.map(n => `/noticias/${n.slug}`),
]
