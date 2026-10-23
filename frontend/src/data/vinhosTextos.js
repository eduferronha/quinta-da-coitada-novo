// Rótulos da interface ligados aos vinhos (Lingui): categorias, cores e análise.
// Os textos de cada vinho (descrição, notas de prova…) estão nos JSON de src/content/vinhos/, editados pelo CMS.
import { msg } from '@lingui/core/macro'

export const nomesCategorias = {
  todos: msg`Todos`,
  garrafa: msg`Garrafa`,
  'bag-in-box': msg`Bag-in-box`,
  caixa: msg`Caixa de oferta`,
}

export const nomesCores = {
  tinto: msg`Tinto`,
  branco: msg`Branco`,
}

export const nomesAnalise = {
  extratoSeco: msg`Extrato seco`,
  ph: msg`pH`,
  acidezTotal: msg`Acidez total`,
  acidezVolatil: msg`Acidez volátil`,
  acucarResidual: msg`Açúcar residual`,
  valorEnergetico: msg`Valor energético`,
}
