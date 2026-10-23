# Pendente — Quinta da Coitada

O site mistura conteúdo **real** (do site antigo da quinta) com conteúdo **provisório** que tem de ser pedido ao cliente.

## Real (vem do site antigo)
- Fotografias: capa do Douro, casa (quartos, cozinha, casas de banho, alpendre, vistas).
- Alojamento: moradia com 2 quartos, sala, cozinha equipada, 2 casas de banho, piscina, terraço, varanda, jardim, estacionamento, ar condicionado; distâncias a museus e ao Palácio de Mateus.
- Reservas: links do Booking.com e do Airbnb.
- Email: cruzvelha2008@hotmail.com.
- Morada e localização (do Booking.com): Quinta da Coitada, 5130-406 Soutelo do Douro; 41.210664, -7.441454.

## Provisório — pedir ao cliente
- **Vinhos**: todos fictícios (nomes, fichas técnicas, análises, imagens). Pedir nomes, fotografias e fichas técnicas.
- **Novidades**: as duas notícias são de exemplo — apagar ou substituir.
- **Logótipo**: o real (veado com "QC", visível nas fotos) — pedir o ficheiro e substituir o `Mark.jsx` e o `favicon.svg`.
- **História da quinta / família**: a página inicial tem só texto genérico.
- **Telefone**: o do site antigo era de exemplo (`+351 912 345 678`); está `+351 910 000 000`.
- **Empresa**: nome, NIF e sede (políticas de privacidade e cookies).
- **Facebook**: está uma conta `.demo` — pôr a real ou retirar (o Instagram já é o real: @quintadacoitada).
- **Número de registo do Alojamento Local** (RNAL): deve aparecer na página de Alojamento.
- **Domínio** (`SITE_URL` em `frontend/src/data/quinta.js`).

## Para publicar
- Criar um repositório GitHub (ex.: `quinta-da-coitada`) e fazer push.
- Cloudflare Pages: novo projeto ligado a esse repositório (Framework None, build `npm run build`, output `dist`, root `frontend`, `NODE_VERSION=22`).
- Formulário: falta a chave do Web3Forms (`formulario.web3formsKey`), criada com o email que deve receber as mensagens.
- Pages CMS: ligar ao repositório novo (README, secção "CMS").
- Seguir o `guia-entrega-cliente.md` na entrega.
