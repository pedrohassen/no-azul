/**
 * Ícones de linha, minimalistas, `currentColor` (herdam a cor do texto — usados na
 * `BottomNav` pra indicar aba ativa/inativa). Sem lib de ícones, sem emoji.
 */

type IconeProps = {
  className?: string
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconeResumo({ className }: IconeProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 19V10M12 19V5M20 19v-6" />
    </svg>
  )
}

export function IconeLancar({ className }: IconeProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

export function IconeHistorico({ className }: IconeProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  )
}

export function IconeBackup({ className }: IconeProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 4v11M8 11l4 4 4-4M5 19h14" />
    </svg>
  )
}

export function IconeSol({ className }: IconeProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

export function IconeLua({ className }: IconeProps) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}
