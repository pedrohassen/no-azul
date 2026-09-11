import { listarCategorias, listarTransacoes } from '../lib/armazenamento'
import { dataDeHoje } from '../lib/formatData'
import { formatMoeda } from '../lib/formatMoeda'

// Sem `useMemo`: esta tela é remontada do zero a cada visita (navegação por
// estado no App, não router), então o cálculo já roda uma vez só por natureza.
export function Resumo() {
  const transacoes = listarTransacoes()
  const categorias = listarCategorias()
  const mesAtual = dataDeHoje().slice(0, 7) // "YYYY-MM"

  let saldoTotal = 0
  let receitasMes = 0
  let despesasMes = 0
  const porCategoria = new Map<string, number>()

  for (const t of transacoes) {
    const sinal = t.tipo === 'receita' ? 1 : -1
    saldoTotal += sinal * t.valor

    if (t.data.startsWith(mesAtual)) {
      if (t.tipo === 'receita') {
        receitasMes += t.valor
      } else {
        despesasMes += t.valor
        porCategoria.set(
          t.categoriaId,
          (porCategoria.get(t.categoriaId) ?? 0) + t.valor,
        )
      }
    }
  }

  const nomeDaCategoria = (id: string) =>
    categorias.find((c) => c.id === id)?.nome ?? 'Sem categoria'

  const categoriasOrdenadas = [...porCategoria.entries()].sort(
    (a, b) => b[1] - a[1],
  )

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-6 font-sans text-xl font-semibold text-ink">Resumo</h1>

      <div className="mb-6 rounded-xl border border-line p-5 text-center">
        <p className="mb-1 font-sans text-sm text-muted">Saldo</p>
        <p
          className={`font-sans text-3xl font-semibold ${
            saldoTotal >= 0 ? 'text-azul' : 'text-vermelho'
          }`}
        >
          {formatMoeda(saldoTotal)}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-line p-4">
          <p className="mb-1 font-sans text-xs text-muted">Receitas (mês)</p>
          <p className="font-sans text-lg font-medium text-azul">
            {formatMoeda(receitasMes)}
          </p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="mb-1 font-sans text-xs text-muted">Despesas (mês)</p>
          <p className="font-sans text-lg font-medium text-vermelho">
            {formatMoeda(despesasMes)}
          </p>
        </div>
      </div>

      <h2 className="mb-3 font-sans text-sm font-medium text-muted">
        Despesas do mês por categoria
      </h2>
      {categoriasOrdenadas.length === 0 ? (
        <p className="font-sans text-sm text-muted">
          Nenhuma despesa lançada este mês ainda.
        </p>
      ) : (
        <ul>
          {categoriasOrdenadas.map(([categoriaId, total]) => (
            <li
              key={categoriaId}
              className="flex items-center justify-between border-b border-line py-2.5 font-sans text-sm"
            >
              <span className="text-ink">{nomeDaCategoria(categoriaId)}</span>
              <span className="text-muted">{formatMoeda(total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
