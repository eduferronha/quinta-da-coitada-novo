// As notícias vêm de src/content/noticias/ (editadas no Pages CMS) e as traduções de
// src/content/noticias-traducoes/. Ver noticiasBase.js para o formato.
import { lerNoticias } from './noticiasBase.js'

const nomeFicheiro = caminho => caminho.split('/').pop().replace(/\.json$/, '')
const ficheiros = import.meta.glob('../content/noticias/*.json', { eager: true, import: 'default' })
const traducoes = import.meta.glob('../content/noticias-traducoes/*.json', { eager: true, import: 'default' })

export const noticias = lerNoticias(
  Object.entries(ficheiros).map(([caminho, dados]) => ({ slug: nomeFicheiro(caminho), dados })),
  Object.fromEntries(Object.entries(traducoes).map(([caminho, dados]) => [nomeFicheiro(caminho), dados])),
)
