// Ícones de contacto em traço simples. A cor vem do texto à volta (currentColor),
// por isso ficam creme no rodapé e escuros nas páginas claras.
const tracos = {
  telefone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  morada: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
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
