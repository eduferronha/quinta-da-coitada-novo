// Leitura das notícias, partilhada pelo site (noticias.js) e pelo script de build (scripts/prerender.js).
//
// Cada notícia tem dois ficheiros:
// - src/content/noticias/<slug>.json — em português, editado no Pages CMS: titulo, data, publicado, imagem,
//   descricao_imagem, resumo, corpo (texto; parágrafos separados por uma linha em branco).
// - src/content/noticias-traducoes/<slug>.json — opcional: { "en": {...}, … } com titulo, resumo, corpo,
//   descricao_imagem. Um texto sem tradução aparece em português.
import { limpar, linguaBase } from './vinhosBase.js'

// ficheiros: [{ slug, dados }], traducoes: { slug: {...} } -> notícias publicadas, da mais recente para a mais antiga
export function lerNoticias(ficheiros, traducoes = {}) {
  return ficheiros
    .map(({ slug, dados }) => {
      const base = limpar(dados) ?? {}
      return { slug, ...base, _linguas: { ...(limpar(traducoes[slug]) ?? {}), [linguaBase]: base } }
    })
    .filter(n => n.titulo && n.publicado !== false)
    .sort((a, b) => String(b.data ?? '').localeCompare(String(a.data ?? '')))
}

// Texto do corpo -> lista de parágrafos (separados por uma linha em branco)
export const paragrafos = texto => String(texto ?? '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

// Data da notícia no formato da língua ("22 de outubro de 2026", "22 October 2026"…)
export function dataDe(data, lingua) {
  if (!data) return ''
  const d = new Date(String(data).includes('T') ? data : `${data}T12:00:00`)
  return Number.isNaN(d.getTime()) ? String(data) : new Intl.DateTimeFormat(lingua, { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}
