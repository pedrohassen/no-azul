import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { categoriasPadrao } from './data/categorias'
import { inicializarCategoriasPadrao } from './lib/armazenamento'
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

  return (
    <>
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
      </main>
      <BottomNav ativa={tela} onMudar={irPara} />
    </>
  )
}
