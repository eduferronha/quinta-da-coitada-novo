// Dados da quinta. Os que vêm do site antigo são reais (email, mapa, Booking, Airbnb);
// os marcados com "A CONFIRMAR" são provisórios e têm de ser pedidos ao cliente (ver PENDENTE.md).

// Endereço público do site: usado nos links canónicos e nas pré-visualizações (Open Graph)
export const SITE_URL = 'https://www.quintadacoitada.pt' // A CONFIRMAR: domínio

// Textos traduzíveis da quinta (horário) estão em conteudo.js
export const quinta = {
  nome: 'Quinta da Coitada',
  // Responsável pelo tratamento de dados (políticas de privacidade e cookies) — A CONFIRMAR: nome, NIF e sede
  empresa: { nome: 'Quinta da Coitada', nif: '000 000 000', sede: '5130-406 Soutelo do Douro' },
  // Morada e coordenadas do anúncio no Booking.com
  morada: ['Quinta da Coitada', '5130-406 Soutelo do Douro', 'Portugal'],
  // Telemóveis: a nota de rodapé diz "rede móvel nacional" (obrigatório indicar o tipo de rede)
  telefones: [
    { numero: '+351 910 000 000', nome: 'Geral' }, // A CONFIRMAR: o número do site antigo era de exemplo
  ],
  emails: { geral: 'cruzvelha2008@hotmail.com' },
  mapa: 'https://www.google.com/maps/search/?api=1&query=41.210664,-7.441454',
  // Reservas do alojamento
  reservas: {
    booking: 'https://www.booking.com/hotel/pt/quinta-da-coitada-alojamento-local.pt-pt.html',
    airbnb: 'https://www.airbnb.pt/rooms/1020954889633892300',
  },
  // Formulário de contacto: chave do Web3Forms (web3forms.com). Vazia = o formulário mostra erro.
  formulario: { web3formsKey: '' },
  // Instagram real; Facebook A CONFIRMAR
  redes: {
    Instagram: 'https://www.instagram.com/quintadacoitada/',
    Facebook: 'https://www.facebook.com/quintadacoitada.demo',
  },
}
