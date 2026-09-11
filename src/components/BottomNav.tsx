import type { Tela } from '../types'
import { IconeHistorico, IconeLancar, IconeResumo } from './Icones'

type BottomNavProps = {
  ativa: Tela
  onMudar: (tela: Tela) => void
}

const abas: { tela: Tela; rotulo: string; Icone: typeof IconeResumo }[] = [
  { tela: 'resumo', rotulo: 'Resumo', Icone: IconeResumo },
  { tela: 'lancar', rotulo: 'Lançar', Icone: IconeLancar },
  { tela: 'historico', rotulo: 'Histórico', Icone: IconeHistorico },
]

/**
 * Navegação fixa no rodapé, tipo app de banco. Sem `react-router` — troca de aba é
 * só estado em `App.tsx`. Respiro extra embaixo pra home indicator do PWA instalado.
 */
export function BottomNav({ ativa, onMudar }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-md">
        {abas.map(({ tela, rotulo, Icone }) => {
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
