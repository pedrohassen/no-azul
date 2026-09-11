import { abasNavegacao } from '../data/navegacao'
import type { Tela } from '../types'

type BottomNavProps = {
  ativa: Tela
  onMudar: (tela: Tela) => void
}

/**
 * Navegação fixa no rodapé, tipo app de banco — só em telas pequenas (`md:hidden`;
 * ver `Sidebar` pro equivalente em telas médias/grandes). Sem `react-router` —
 * troca de aba é só estado em `App.tsx`. Respiro extra embaixo pra home indicator
 * do PWA instalado.
 */
export function BottomNav({ ativa, onMudar }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-md">
        {abasNavegacao.map(({ tela, rotulo, Icone }) => {
          const ativoAgora = tela === ativa
          return (
            <button
              key={tela}
              type="button"
              onClick={() => onMudar(tela)}
              aria-current={ativoAgora ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 font-sans text-xs transition-colors ${
                ativoAgora ? 'text-azul' : 'text-muted'
              }`}
            >
              <Icone className="h-6 w-6" />
              {rotulo}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
