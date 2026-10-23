import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nProvider } from '@lingui/react'
import App from './App'
import { i18n, ativarIdioma, idiomaInicial } from './i18n'
// Fontes servidas pelo próprio site (sem pedidos ao Google Fonts)
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import './styles.css'

// Carrega o idioma antes do primeiro render, para não aparecer o texto noutra língua por um instante
ativarIdioma(idiomaInicial()).then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <I18nProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </React.StrictMode>
  )
})
