import { useState } from 'react'
import { AvisoPrimeiroUso } from './components/AvisoPrimeiroUso'
import { BottomNav } from './components/BottomNav'
import { LembreteBackup } from './components/LembreteBackup'
import { categoriasPadrao } from './data/categorias'
import {
  inicializarCategoriasPadrao,
  listarTransacoes,
} from './lib/armazenamento'
import { precisaLembrarBackup } from './lib/lembreteBackup'
import { Backup } from './telas/Backup'
import { Historico } from './telas/Historico'
import { Lancar } from './telas/Lancar'
import { Resumo } from './telas/Resumo'
import type { Tela, Transacao } from './types'

// Roda uma vez, antes do primeiro render — garante que sempre existam categorias
// (mesmo no primeiríssimo acesso, antes de qualquer tela ler `listarCategorias()`).
inicializarCategoriasPadrao(categoriasPadrao)

export default function App() {
  const [tela, setTela] = useState<Tela>('resumo')
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(
    null,
  )

  function irPara(destino: Tela) {
    setTransacaoEditando(null)
    setTela(destino)
  }

  function editar(transacao: Transacao) {
    setTransacaoEditando(transacao)
    setTela('lancar')
  }

  // Só incomoda com o lembrete se já existe dado pra perder, e não enquanto o
  // usuário já está na própria tela de Backup.
  const mostrarLembreteBackup =
    tela !== 'backup' && listarTransacoes().length > 0 && precisaLembrarBackup()

  return (
    <>
      <AvisoPrimeiroUso />
      {mostrarLembreteBackup ? (
        <LembreteBackup aoIrParaBackup={() => irPara('backup')} />
      ) : null}

      <main className="pb-20">
        {tela === 'resumo' ? <Resumo /> : null}
        {tela === 'lancar' ? (
          <Lancar
            transacaoEditando={transacaoEditando}
            aoSalvar={() => irPara('historico')}
            aoCancelarEdicao={() => irPara('historico')}
          />
        ) : null}
        {tela === 'historico' ? <Historico aoEditar={editar} /> : null}
        {tela === 'backup' ? <Backup /> : null}
      </main>
      <BottomNav ativa={tela} onMudar={irPara} />
    </>
  )
}
