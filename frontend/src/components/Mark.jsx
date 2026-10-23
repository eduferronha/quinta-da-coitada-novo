// Logótipo da Quinta da Coitada: círculo com os socalcos da encosta e o sol.
// O traço usa a cor do texto à volta (currentColor); o sol é sempre terracota.
export default function Mark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="mark">
      <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="42" cy="21" r="6" fill="var(--acento)" />
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M10 36 C 20 30, 30 33, 40 28 S 52 26, 56 25" />
        <path d="M8 44 C 20 38, 32 41, 42 36 S 54 33, 58 33" />
        <path d="M12 52 C 22 47, 34 49, 44 45 S 52 42, 55 42" />
      </g>
    </svg>
  )
}
