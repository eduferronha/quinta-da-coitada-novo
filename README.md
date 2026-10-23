# Quinta da Coitada

> **Projeto de demonstração.** A quinta, a empresa, a história, os vinhos, as imagens e os contactos são fictícios. Usa o mesmo esqueleto do site da Quinta da Videira Grande, com outra identidade visual.

Site institucional: **Quinta**, **Vinhos** (lista + ficha de cada vinho) e **Contactos**. Sem loja.

```
frontend/   Vite + React + React Router + Lingui (5 idiomas) — é o site
backend/    FastAPI antigo do formulário — já não é usado (o formulário usa o Web3Forms)
```

## Correr em desenvolvimento

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Em desenvolvimento o formulário de contacto envia mensagens reais (pelo Web3Forms), se a chave estiver definida.

## Onde editar o conteúdo

| O quê | Ficheiro |
|---|---|
| Morada, telefone, emails, horário, redes | `frontend/src/data/quinta.js` |
| Cronologia e números | `frontend/src/data/quinta.js` |
| Vinhos (dados, textos nas 5 línguas, fotos) | CMS em `/admin`, ou os JSON em `frontend/src/content/vinhos/` |
| Títulos e descrições das páginas (Google, WhatsApp, redes sociais) | `frontend/src/data/meta.js` |
| Empresa (NIF, sede) e domínio do site | `frontend/src/data/quinta.js` |
| Textos da página Adega | `frontend/src/pages/Adega.jsx` |
| Cores e tipografia | topo de `frontend/src/styles.css` |

As fotografias são placeholders (`<Placeholder legenda="…" />`). Para pôr fotos reais, coloque-as em `frontend/public/img/` e troque o componente por `<img src="/img/…" alt="…" />`.
As fotografias e fichas técnicas dos vinhos estão em `frontend/public/img/vinhos/` (é para lá que o CMS carrega as fotos novas). Cada vinho é um ficheiro JSON em `frontend/src/content/vinhos/` — ver a secção "CMS".

## Formulário

O formulário de Contactos envia as mensagens pelo **Web3Forms** (web3forms.com) diretamente para o email da quinta: não há servidor próprio. A chave do Web3Forms está em `frontend/src/data/quinta.js` (`formulario.web3formsKey`); é pública por natureza (só permite enviar para o email associado a ela). Plano grátis: 250 mensagens por mês.

- Funciona em qualquer alojamento e também em desenvolvimento (`npm run dev` envia mensagens reais).
- Anti-spam: campo escondido `bot-field`; se vier preenchido, a mensagem não é enviada.
- As mensagens não ficam guardadas no site: chegam por email e ficam na caixa de correio.

## Publicar

O site é publicado pelo **Cloudflare Pages** a partir de um repositório GitHub (por criar) (grátis). Cada `git push` para `main` publica uma nova versão em 1–2 minutos.

### 1. Criar o projeto no Cloudflare Pages
1. Em dash.cloudflare.com: **Workers & Pages → Create → Pages → Connect to Git** → GitHub → escolher o repositório.
2. Definições de build:
   - *Framework preset*: **None**
   - *Build command*: `npm run build`
   - *Build output directory*: `dist`
   - *Root directory (advanced)*: `frontend`
3. **Save and Deploy**. Fica com um endereço do tipo `https://quinta-da-coitada.pages.dev`.

A versão do Node vem do ficheiro `frontend/.node-version`. Endereços que não existem abrem a app, que mostra a página 404 (comportamento normal do Cloudflare Pages quando não há `404.html`).

### 2. Domínio
**Custom domains → Set up a custom domain** → `www.quintadacoitada.pt`. O HTTPS é automático. Se o domínio for outro, mudar `SITE_URL` em `frontend/src/data/quinta.js`.

### Netlify
O `netlify.toml` continua no projeto: se a conta do Netlify for reativada, o site pode ser publicado lá sem mudar código (o formulário Web3Forms funciona em qualquer lado).

## CMS (gestão dos vinhos)

O cliente gere os vinhos no **Pages CMS** (app.pagescms.org), entrando com o **email** (não precisa de conta GitHub): criar, editar, apagar, carregar fotos e fichas e escrever os textos — tudo num único formulário em português. Ao guardar, o Pages CMS faz commit no GitHub e o Cloudflare publica o site em 1–2 minutos.

- Configuração dos campos: `.pages.yml`, na raiz do repositório.
- Cada vinho: `frontend/src/content/vinhos/<slug>.json`, só em português. O `<slug>` (nome do ficheiro) é o endereço da página: `/vinhos/<slug>`.
- Traduções: `frontend/src/content/vinhos-traducoes/<slug>.json` (`{ "en": {...}, "fr": {...}, "es": {...}, "de": {...} }`, só os textos: nome, descricao, descricao_foto, estagio, prova, harmonizacao, conservacao). **Não passam pelo CMS** — acrescentam-se à mão quando o cliente cria um vinho. Sem tradução, aparece o português.
- Fotos e fichas carregadas pelo CMS: `frontend/public/img/vinhos/`.
- O campo **Ordem na lista** define a posição (10, 20, 30…).
- O site ignora campos vazios e aceita as variações de formato que o CMS grava (ver `src/data/vinhosBase.js`).

### Configurar (uma vez, pelo programador)
1. Em **app.pagescms.org**: "Sign in with GitHub" e instalar a **GitHub App** do Pages CMS no repositório do site.
2. Abrir o repositório na app: o Pages CMS lê o `.pages.yml` e mostra a coleção **Vinhos**. Abrir um vinho e confirmar que os campos aparecem preenchidos.
3. **Collaborators** → convidar o email do cliente. O cliente recebe o convite por email e entra só com esse email.

## Notícias

Secção opcional, gerida no Pages CMS (coleção **Notícias**): título, data, publicada (sim/não — "não" é rascunho), imagem, resumo e texto (parágrafos separados por uma linha em branco).

- Cada notícia: `frontend/src/content/noticias/<slug>.json`; imagens em `frontend/public/img/noticias/`; traduções opcionais em `frontend/src/content/noticias-traducoes/<slug>.json` (`{ "en": { "titulo", "resumo", "corpo", "descricao_imagem" }, … }`).
- Páginas: `/noticias` (mais recentes primeiro) e `/noticias/<slug>`.
- O link "Notícias" no menu e no rodapé, e a página no sitemap, **só aparecem quando há pelo menos uma notícia publicada**.

## SEO e pré-visualizações

`npm run build` corre o `vite build` e depois o `scripts/prerender.js`, que gera um HTML por página (`dist/vinhos/lubatos-tinto.html`, etc.) com o título, a descrição e as tags Open Graph certas, mais o `sitemap.xml` e o `robots.txt`. É preciso porque o WhatsApp e o Facebook não correm JavaScript.

A imagem de pré-visualização de cada vinho está em `frontend/public/og/<slug>.jpg` (1200×630). Se não existir (por exemplo, num vinho novo criado no CMS), usa-se a primeira fotografia do vinho. A imagem geral do site é `public/og/site.jpg`.

A fonte (Poppins) é servida pelo próprio site (pacotes `@fontsource`) e não pelo Google Fonts, para não enviar o IP dos visitantes à Google.

## Idiomas (Lingui)

O site está em português, inglês, francês, espanhol e alemão. O visitante escolhe o idioma no seletor do cabeçalho; a escolha fica guardada no browser. Na primeira visita usa-se a língua do browser (ou português, se não for nenhuma destas).

- Os textos escrevem-se **em português** no código, marcados com `<Trans>…</Trans>` ou `` t`…` `` (componentes) e `` msg`…` `` (dados, em `src/data/vinhosTextos.js`, `conteudo.js` e `metaTraduzida.js`).
- As traduções estão em `src/locales/<idioma>/messages.po` (um ficheiro por idioma, editável com qualquer editor de texto ou com o Poedit).
- Depois de mudar ou acrescentar textos: `npm run extract`. Os textos novos aparecem nos `.po` com a tradução vazia; preenchê-la. Enquanto estiver vazia, o site mostra o português.
- Os textos dos **vinhos** não usam o Lingui: o português está em `src/content/vinhos/` (editado no CMS) e as traduções em `src/content/vinhos-traducoes/`. Se faltar uma tradução, aparece o português.
- `quinta.js` e `vinhosBase.js` não podem ter textos traduzíveis (são lidos pelo script de build, que não corre o Lingui).
- As páginas geradas para o Google e para as pré-visualizações (`npm run build`) estão em português. As outras línguas são aplicadas no browser.

