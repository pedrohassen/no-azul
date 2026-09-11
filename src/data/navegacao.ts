import {
  IconeBackup,
  IconeHistorico,
  IconeLancar,
  IconeResumo,
} from '../components/Icones'
import type { Tela } from '../types'

/** Compartilhado por `BottomNav` (mobile) e `Sidebar` (desktop) — mesmas abas,
 * só muda o layout. */
export const abasNavegacao: {
  tela: Tela
  rotulo: string
  Icone: typeof IconeResumo
}[] = [
  { tela: 'resumo', rotulo: 'Resumo', Icone: IconeResumo },
  { tela: 'lancar', rotulo: 'Lançar', Icone: IconeLancar },
  { tela: 'historico', rotulo: 'Histórico', Icone: IconeHistorico },
  { tela: 'backup', rotulo: 'Backup', Icone: IconeBackup },
]
