import { useEffect, useRef, type ReactNode } from 'react'

type PainelFlutuanteProps = {
  aberto: boolean
  aoFechar: () => void
  children: ReactNode
}

/**
 * Painel posicionado abaixo do gatilho (o pai precisa ter `className="relative"`),
 * fecha ao clicar fora ou apertar Escape. Base compartilhada por `SeletorData` e
 * `SeletorMesAno` — mesma casca visual pros dois, só o conteúdo interno muda.
 */
export function PainelFlutuante({
  aberto,
  aoFechar,
  children,
}: PainelFlutuanteProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberto) return

    function aoClicarFora(evento: MouseEvent) {
      if (ref.current && !ref.current.contains(evento.target as Node)) {
        aoFechar()
      }
    }

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === 'Escape') aoFechar()
    }

    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [aberto, aoFechar])

  if (!aberto) return null

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 z-30 mt-2 rounded-xl border border-line bg-paper p-4 shadow-lg"
    >
      {children}
    </div>
  )
}
