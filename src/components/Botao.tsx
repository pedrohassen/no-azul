import type { ButtonHTMLAttributes, ReactNode } from 'react'

type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variante?: 'solido' | 'contorno' | 'perigo'
}

export function Botao({
  children,
  variante = 'solido',
  className = '',
  type = 'button',
  ...resto
}: BotaoProps) {
  // `min-h-11` (44px) garante o alvo de toque mínimo independente da métrica da
  // fonte — o padding sozinho (py-2.5) ficava em ~40px.
  const base =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-sans text-sm font-medium transition-colors disabled:opacity-50'
  const aparencia = {
    solido: 'bg-azul text-contraste hover:opacity-90',
    contorno: 'border border-line text-ink hover:border-azul hover:text-azul',
    perigo:
      'border border-vermelho text-vermelho hover:bg-vermelho hover:text-contraste',
  }[variante]

  return (
    <button
      type={type}
      className={`${base} ${aparencia} ${className}`}
      {...resto}
    >
      {children}
    </button>
  )
}
