// Os vinhos vêm dos ficheiros JSON em src/content/vinhos/ (editados pelo Pages CMS) e as traduções
// de src/content/vinhos-traducoes/. Ver vinhosBase.js para o formato.
import { lerVinhos } from './vinhosBase.js'

const nomeFicheiro = caminho => caminho.split('/').pop().replace(/\.json$/, '')
const ficheiros = import.meta.glob('../content/vinhos/*.json', { eager: true, import: 'default' })
const traducoes = import.meta.glob('../content/vinhos-traducoes/*.json', { eager: true, import: 'default' })

export const vinhos = lerVinhos(
  Object.entries(ficheiros).map(([caminho, dados]) => ({ slug: nomeFicheiro(caminho), dados })),
  Object.fromEntries(Object.entries(traducoes).map(([caminho, dados]) => [nomeFicheiro(caminho), dados])),
)

export const categorias = ['todos', 'garrafa', 'bag-in-box', 'caixa']
