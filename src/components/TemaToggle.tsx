import { useEffect, useState } from 'react'
import { aplicarTema, temaInicial, type Tema } from '../lib/tema'
import { IconeLua, IconeSol } from './Icones'

/**
 * Botão de alternar tema — entra na barra superior (ver `App.tsx`), no fluxo normal
 * da página, não sobreposto ao conteúdo. Alvo de toque 44×44 (acessibilidade).
 * `useEffect` aqui é o único jeito de aplicar o tema depois de uma troca do usuário —
 * o valor inicial já vem certo de `temaInicial()` (o anti-FOUC no `index.html` cuida
 * do primeiro paint).
 */
export function TemaToggle() {
  const [tema, setTema] = useState<Tema>(temaInicial)

  useEffect(() => {
    aplicarTema(tema)
  }, [tema])

  const alternar = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))
  const alvo = tema === 'dark' ? 'claro' : 'escuro'

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={`Ativar tema ${alvo}`}
      className="flex h-11 w-11 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
    >
      {tema === 'dark' ? (
        <IconeSol className="h-5 w-5" />
      ) : (
        <IconeLua className="h-5 w-5" />
      )}
    </button>
  )
}
