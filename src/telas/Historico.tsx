import { useMemo, useState } from 'react'
import {
  excluirTransacao,
  listarCategorias,
  listarTransacoes,
} from '../lib/armazenamento'
import { formatData } from '../lib/formatData'
import { formatMoeda } from '../lib/formatMoeda'
import type { Transacao, TipoTransacao } from '../types'

type HistoricoProps = {
  aoEditar: (transacao: Transacao) => void
}

export function Historico({ aoEditar }: HistoricoProps) {
  const [transacoes, setTransacoes] = useState(listarTransacoes)
  const categorias = listarCategorias()

  const [filtroTipo, setFiltroTipo] = useState<TipoTransacao | 'todos'>('todos')
  const [filtroCategoriaId, setFiltroCategoriaId] = useState('todas')
  const [filtroMes, setFiltroMes] = useState('') // "" = todos os meses, senão "YYYY-MM"

  const nomeDaCategoria = (id: string) =>
    categorias.find((c) => c.id === id)?.nome ?? 'Sem categoria'

  const filtradas = useMemo(() => {
    return transacoes
      .filter((t) => filtroTipo === 'todos' || t.tipo === filtroTipo)
      .filter(
        (t) =>
          filtroCategoriaId === 'todas' || t.categoriaId === filtroCategoriaId,
      )
      .filter((t) => filtroMes === '' || t.data.startsWith(filtroMes))
      .sort((a, b) => b.data.localeCompare(a.data))
  }, [transacoes, filtroTipo, filtroCategoriaId, filtroMes])

  function excluir(id: string) {
    if (!window.confirm('Excluir este lançamento? Não dá pra desfazer.')) return
    excluirTransacao(id)
    setTransacoes(listarTransacoes())
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-4 font-sans text-xl font-semibold text-ink">
        Histórico
      </h1>

      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={filtroTipo}
          onChange={(e) =>
            setFiltroTipo(e.target.value as TipoTransacao | 'todos')
          }
          className="rounded-lg border border-line bg-paper px-3 py-2 font-sans text-sm text-ink"
        >
          <option value="todos">Todos os tipos</option>
          <option value="despesa">Despesas</option>
          <option value="receita">Receitas</option>
        </select>

        <select
          value={filtroCategoriaId}
          onChange={(e) => setFiltroCategoriaId(e.target.value)}
          className="rounded-lg border border-line bg-paper px-3 py-2 font-sans text-sm text-ink"
        >
          <option value="todas">Todas as categorias</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>

        <input
          type="month"
          value={filtroMes}
          onChange={(e) => setFiltroMes(e.target.value)}
          className="rounded-lg border border-line bg-paper px-3 py-2 font-sans text-sm text-ink"
        />
      </div>

      {filtradas.length === 0 ? (
        <p className="py-10 text-center font-sans text-sm text-muted">
          Nenhum lançamento com esses filtros.
        </p>
      ) : (
        <ul>
          {filtradas.map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between gap-3 border-b border-line py-3"
            >
              <button
                type="button"
                onClick={() => aoEditar(t)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate font-sans text-sm text-ink">
                  {nomeDaCategoria(t.categoriaId)}
                  {t.descricao ? (
                    <span className="text-muted"> · {t.descricao}</span>
                  ) : null}
                </p>
                <p className="font-sans text-xs text-muted">
                  {formatData(t.data)}
                </p>
              </button>

              <span
                className={`font-sans text-sm font-medium ${
                  t.tipo === 'despesa' ? 'text-vermelho' : 'text-azul'
                }`}
              >
                {t.tipo === 'despesa' ? '-' : '+'} {formatMoeda(t.valor)}
              </span>

              <button
                type="button"
                onClick={() => excluir(t.id)}
                aria-label={`Excluir lançamento de ${nomeDaCategoria(t.categoriaId)}`}
                className="font-sans text-xs text-muted hover:text-vermelho"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
