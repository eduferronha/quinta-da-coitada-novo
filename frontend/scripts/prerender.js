// Depois do `vite build`: escreve um HTML por rota com título, descrição e Open Graph próprios.
// O WhatsApp, o Facebook e o LinkedIn não correm JavaScript, por isso precisam destas tags no HTML.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { metaPara, rotasDe } from '../src/data/meta.js'
import { lerVinhos } from '../src/data/vinhosBase.js'
import { lerNoticias } from '../src/data/noticiasBase.js'
import { SITE_URL } from '../src/data/quinta.js'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(raiz, 'dist')

// Os vinhos são os JSON de src/content/vinhos (os mesmos que o site e o CMS usam), com as traduções
// de src/content/vinhos-traducoes
const lerPasta = pasta => existsSync(pasta)
  ? readdirSync(pasta).filter(f => f.endsWith('.json')).map(f => [f.replace(/\.json$/, ''), JSON.parse(readFileSync(join(pasta, f), 'utf8'))])
  : []
const conteudo = join(raiz, 'src', 'content')
const vinhos = lerVinhos(
  lerPasta(join(conteudo, 'vinhos')).map(([slug, dados]) => ({ slug, dados })),
  Object.fromEntries(lerPasta(join(conteudo, 'vinhos-traducoes'))),
)
const noticias = lerNoticias(
  lerPasta(join(conteudo, 'noticias')).map(([slug, dados]) => ({ slug, dados })),
  Object.fromEntries(lerPasta(join(conteudo, 'noticias-traducoes'))),
)
const ogExiste = slug => existsSync(join(raiz, 'public', 'og', `${slug}.jpg`))
const rotas = rotasDe(vinhos, noticias)

const base = readFileSync(join(dist, 'index.html'), 'utf8')
const bloco = /<!-- meta:inicio[\s\S]*?<!-- meta:fim -->/

if (!bloco.test(base)) throw new Error('index.html não tem o bloco <!-- meta:inicio --> … <!-- meta:fim -->')

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function html(rota) {
  const m = metaPara(rota, vinhos, ogExiste, noticias)
  const tags = [
    `<title>${esc(m.titulo)}</title>`,
    `<meta name="description" content="${esc(m.descricao)}" />`,
    `<link rel="canonical" href="${esc(m.url)}" />`,
    `<meta property="og:type" content="${esc(m.tipo)}" />`,
    `<meta property="og:title" content="${esc(m.titulo)}" />`,
    `<meta property="og:description" content="${esc(m.descricao)}" />`,
    `<meta property="og:url" content="${esc(m.url)}" />`,
    `<meta property="og:image" content="${esc(m.imagem)}" />`,
    // As imagens de public/og/ têm 1200×630; para as fotos dos vinhos (sem imagem própria) não se indica tamanho
    ...(m.imagem.includes('/og/')
      ? ['<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />']
      : []),
  ].join('\n    ')
  return base.replace(bloco, tags)
}

// A raiz redireciona para /adega e serve de fallback às rotas desconhecidas
writeFileSync(join(dist, 'index.html'), html('/adega'))

// /vinhos/lubatos-tinto -> dist/vinhos/lubatos-tinto.html: o Cloudflare Pages (e o Netlify) servem
// este ficheiro em /vinhos/lubatos-tinto sem redirecionar para uma versão com "/" no fim
for (const rota of rotas) {
  const ficheiro = join(dist, rota + '.html')
  mkdirSync(dirname(ficheiro), { recursive: true })
  writeFileSync(ficheiro, html(rota))
}

const urls = rotas.map(r => `  <url><loc>${SITE_URL}${r}</loc></url>`).join('\n')
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

console.log(`prerender: ${rotas.length} páginas, sitemap.xml e robots.txt`)
