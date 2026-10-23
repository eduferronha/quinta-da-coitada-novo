// Números, percentagens e temperaturas no formato de cada idioma (14 % em francês, 3.71 em inglês…)
import { nomesCores } from './vinhosTextos'
import { texto } from './vinhosBase.js'

export const numero = (i18n, n) => new Intl.NumberFormat(i18n.locale).format(n)

export const percentagem = (i18n, n) =>
  new Intl.NumberFormat(i18n.locale, { style: 'percent', maximumFractionDigits: 1 }).format(n / 100)

export const temperatura = (i18n, { min, max }) =>
  min === max || max == null ? `${numero(i18n, min)} ºC` : `${numero(i18n, min)}–${numero(i18n, max)} ºC`

// Linha curta por baixo do nome: "Tinto · 2022 · 750 ml" (caixas: "Douro · 3 × 750 ml")
export const resumo = (i18n, v) =>
  [v.cor ? i18n._(nomesCores[v.cor]) : v.regiao, v.colheita, v.formato].filter(Boolean).join(' · ')

// Nome a mostrar na língua atual (se não houver tradução, o nome em português)
export const nomeDe = (i18n, v) => texto(v, 'nome', i18n.locale)
