// Leitura dos vinhos, partilhada pelo site (vinhos.js) e pelo script de build (scripts/prerender.js).
// Não importa nada, para o Node a poder usar diretamente.
//
// Cada vinho tem dois ficheiros:
// - src/content/vinhos/<slug>.json — todos os campos, em português. É o que o cliente edita no Pages CMS
//   (ver .pages.yml na raiz).
// - src/content/vinhos-traducoes/<slug>.json — opcional: { "en": {...}, "fr": {...}, "es": {...}, "de": {...} }
//   só com os textos traduzidos (nome, descricao, descricao_foto, estagio, prova, harmonizacao, conservacao).
//   Não está no CMS; um texto sem tradução aparece em português.

export const linguaBase = 'pt'

// O CMS pode gravar campos vazios ("" ou listas/objetos vazios): tratam-se como se não existissem
export function limpar(valor) {
  if (Array.isArray(valor)) {
    const lista = valor.map(limpar).filter(x => x != null)
    return lista.length ? lista : null
  }
  if (valor && typeof valor === 'object') {
    const obj = Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, limpar(v)]).filter(([, v]) => v != null))
    return Object.keys(obj).length ? obj : null
  }
  return valor === '' || valor == null ? null : valor
}

// "frontend/src/content/vinhos/lubatos-tinto.json" ou "lubatos-tinto" -> "lubatos-tinto"
const slugDe = s => String(s).split('/').pop().replace(/\.json$/, '')

// ficheiros: [{ slug, dados }], traducoes: { slug: { en: {...}, … } } -> lista de vinhos ordenada pelo campo `ordem`
export function lerVinhos(ficheiros, traducoes = {}) {
  return ficheiros
    .map(({ slug, dados }) => {
      // Formato antigo: { pt: {...}, en: {...} } no mesmo ficheiro
      const base = limpar(dados?.[linguaBase] ? dados[linguaBase] : dados) ?? {}
      const antigas = dados?.[linguaBase] ? limpar(dados) ?? {} : {}
      const linguas = { ...antigas, ...(limpar(traducoes[slug]) ?? {}), [linguaBase]: base }
      const v = { slug, ...base, _linguas: linguas }
      // Uma só foto pode vir como texto em vez de lista
      if (v.fotos && !Array.isArray(v.fotos)) v.fotos = [v.fotos]
      if (v.castas && !Array.isArray(v.castas)) v.castas = [v.castas]
      // Referências a outros vinhos podem vir como caminho do ficheiro
      if (v.inclui) v.inclui = (Array.isArray(v.inclui) ? v.inclui : [v.inclui]).map(slugDe)
      return v
    })
    .filter(v => v.nome)
    .sort((a, b) => (Number(a.ordem) || 999) - (Number(b.ordem) || 999) || a.nome.localeCompare(b.nome))
}

// Texto de um campo na língua pedida, com o português como alternativa
export const texto = (v, campo, lingua) => v._linguas?.[lingua]?.[campo] || v[campo] || null
