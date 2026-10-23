import { defineConfig } from '@lingui/cli'

// O português é a língua de origem: os textos escrevem-se em PT no código e traduzem-se nos .po
export default defineConfig({
  sourceLocale: 'pt',
  locales: ['pt', 'en', 'fr', 'es', 'de'],
  catalogs: [{ path: '<rootDir>/src/locales/{locale}/messages', include: ['src'] }],
})
