import { abasNavegacao } from '../data/navegacao'
import type { Tela } from '../types'

type SidebarProps = {
  ativa: Tela
  onMudar: (tela: Tela) => void
}

/**
 * Navegação lateral fixa — só em telas médias/grandes (`hidden md:flex`; ver
 * `BottomNav` pro equivalente mobile). Mesma lista de abas dos dois, só o
 * layout muda: rail vertical em vez de barra inferior. Padrão comum em app
 * financeiro (Nubank/Inter web) — cabe bem na identidade "app de carteira" do
 * projeto, em vez de esticar a barra inferior pra tela grande.
 */
export function Sidebar({ ativa, onMudar }: SidebarProps) {
  return (
    <nav
      className="fixed inset-y-0 left-0 z-10 hidden w-56 flex-col border-r border-line bg-paper p-4 md:flex"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
    >
      <span className="mb-8 px-3 font-sans text-lg font-semibold text-azul">
        No Azul
      </span>
      <div className="flex flex-col gap-1">
        {abasNavegacao.map(({ tela, rotulo, Icone }) => {
          const ativoAgora = tela === ativa
          return (
            <button
              key={tela}
              type="button"
              onClick={() => onMudar(tela)}
              aria-current={ativoAgora ? 'page' : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-lg px-3 font-sans text-sm transition-colors ${
                ativoAgora
                  ? 'bg-azul/10 text-azul'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Icone className="h-5 w-5" />
              {rotulo}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
