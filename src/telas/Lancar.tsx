import { useState } from 'react'
import { Botao } from '../components/Botao'
import { CampoValor } from '../components/CampoValor'
import { ChipCategoria } from '../components/ChipCategoria'
import {
  gerarId,
  listarCategorias,
  salvarTransacao,
} from '../lib/armazenamento'
import { dataDeHoje } from '../lib/formatData'
import type { Transacao, TipoTransacao } from '../types'

type LancarProps = {
  transacaoEditando: Transacao | null
  aoSalvar: () => void
  aoCancelarEdicao: () => void
}

// `Lancar` é sempre remontado do zero quando o App troca de aba (renderização
// condicional em vez de esconder/mostrar) — por isso dá pra inicializar o estado
// direto a partir de `transacaoEditando`, sem `useEffect` pra sincronizar depois.
export function Lancar({
  transacaoEditando,
  aoSalvar,
  aoCancelarEdicao,
}: LancarProps) {
  const categorias = listarCategorias()

  const [tipo, setTipo] = useState<TipoTransacao>(
    transacaoEditando?.tipo ?? 'despesa',
  )
  const [valor, setValor] = useState(() =>
    transacaoEditando
      ? transacaoEditando.valor.toFixed(2).replace('.', ',')
      : '',
  )
  const [categoriaId, setCategoriaId] = useState(
    transacaoEditando?.categoriaId ?? '',
  )
  const [data, setData] = useState(transacaoEditando?.data ?? dataDeHoje())
  const [descricao, setDescricao] = useState(transacaoEditando?.descricao ?? '')
  const [erro, setErro] = useState('')

  const categoriasDoTipo = categorias.filter(
    (c) => c.tipo === tipo || c.tipo === 'ambos',
  )

  function limpar() {
    setTipo('despesa')
    setValor('')
    setCategoriaId('')
    setData(dataDeHoje())
    setDescricao('')
    setErro('')
  }

  function salvar() {
    const valorNumerico = Number(valor.replace(',', '.'))
    if (!valorNumerico || valorNumerico <= 0) {
      setErro('Informe um valor válido.')
      return
    }
    if (!categoriaId) {
      setErro('Escolha uma categoria.')
      return
    }

    salvarTransacao({
      id: transacaoEditando?.id ?? gerarId(),
      tipo,
      valor: valorNumerico,
      categoriaId,
      data,
      descricao: descricao.trim() || undefined,
    })

    limpar()
    aoSalvar()
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-6 font-sans text-xl font-semibold text-ink">
        {transacaoEditando ? 'Editar lançamento' : 'Lançar'}
      </h1>

      <div className="mb-5 flex rounded-lg border border-line p-1">
        {(['despesa', 'receita'] as const).map((opcao) => (
          <button
            key={opcao}
            type="button"
            onClick={() => {
              setTipo(opcao)
              setCategoriaId('')
            }}
            className={`flex min-h-11 flex-1 items-center justify-center rounded-md font-sans text-sm font-medium transition-colors ${
              tipo === opcao
                ? opcao === 'despesa'
                  ? 'bg-vermelho text-contraste'
                  : 'bg-azul text-contraste'
                : 'text-muted'
            }`}
          >
            {opcao === 'despesa' ? 'Despesa' : 'Receita'}
          </button>
        ))}
      </div>

      <div className="mb-5">
        <CampoValor valor={valor} onChange={setValor} />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categoriasDoTipo.map((c) => (
          <ChipCategoria
            key={c.id}
            nome={c.nome}
            selecionada={categoriaId === c.id}
            onClick={() => setCategoriaId(c.id)}
          />
        ))}
      </div>

      <label className="mb-5 block">
        <span className="mb-1 block font-sans text-sm text-muted">Data</span>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 font-sans text-ink outline-none focus:border-azul"
        />
      </label>

      <label className="mb-6 block">
        <span className="mb-1 block font-sans text-sm text-muted">
          Descrição (opcional)
        </span>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex.: mercado da semana"
          className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 font-sans text-ink outline-none placeholder:text-muted/60 focus:border-azul"
        />
      </label>

      {erro ? (
        <p className="mb-4 font-sans text-sm text-vermelho">{erro}</p>
      ) : null}

      <div className="flex gap-3">
        <Botao onClick={salvar} className="flex-1">
          Salvar
        </Botao>
        {transacaoEditando ? (
          <Botao
            variante="contorno"
            onClick={() => {
              limpar()
              aoCancelarEdicao()
            }}
          >
            Cancelar
          </Botao>
        ) : null}
      </div>
    </div>
  )
}
