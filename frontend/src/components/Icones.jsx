// Ícones de contacto em traço simples. A cor vem do texto à volta (currentColor),
// por isso ficam creme no rodapé e escuros nas páginas claras.
const tracos = {
  telefone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  morada: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  // Comodidades do alojamento
  cama: <><path d="M2 19V6M2 15h20v4M22 15v-3a3 3 0 0 0-3-3h-8v6" /><circle cx="6.5" cy="11.5" r="2" /></>,
  sofa: <><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" /><path d="M2 13a2 2 0 0 1 4 0v2h12v-2a2 2 0 0 1 4 0v5H2Z" /><path d="M4 18v2M20 18v2" /></>,
  cafe: <><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" /><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" /><path d="M8 3v3M12 3v3" /></>,
  duche: <><path d="M5 21V6a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v1" /><path d="M10 10h8l-1.5-3h-5Z" /><path d="M11 14v1M14 14v2M17 14v1M12.5 18v1M15.5 18v1" /></>,
  toalha: <><path d="M10 6a2 2 0 1 1 2 2c-.6.3-1 .8-1 1.5V10" /><path d="M11 10 3 16.5V18h18v-1.5Z" /></>,
  frio: <path d="M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10M9 4l3 2 3-2M9 20l3-2 3 2" />,
  piscina: <><path d="M9 14V4M15 14V4M9 7h6M9 11h6" /><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" /><path d="M2 22c2 0 2-1.5 4-1.5S8 22 10 22s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" /></>,
  arvore: <><path d="M12 22v-7" /><path d="M12 3a6 6 0 0 0-6 6c0 3.3 2.7 6 6 6s6-2.7 6-6a6 6 0 0 0-6-6Z" /><path d="M8 22h8" /></>,
  estacionamento: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>,
}

export function Icone({ nome, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="ic"
      fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {tracos[nome]}
    </svg>
  )
}

// Linha com ícone à esquerda e conteúdo à direita (o conteúdo pode ter várias linhas)
export function ComIcone({ nome, children, as: Tag = 'div', className = '' }) {
  return (
    <Tag className={`ic-linha ${className}`}>
      <Icone nome={nome} />
      <span className="ic-linha__txt">{children}</span>
    </Tag>
  )
}
