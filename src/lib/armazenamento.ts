import type { Categoria, Transacao } from '../types'

/**
 * Única camada que toca `localStorage` diretamente — nada de tela/componente lendo
 * ou escrevendo storage direto. `versao` existe pra permitir migração de schema no
 * futuro sem quebrar dado já salvo em quem já usa o app.
 */

const CHAVE = 'no-azul:dados'
const VERSAO_SCHEMA = 1

export type Dados = {
  versao: number
  transacoes: Transacao[]
  categorias: Categoria[]
}

function dadosVazios(): Dados {
  return { versao: VERSAO_SCHEMA, transacoes: [], categorias: [] }
}

function ler(): Dados {
  try {
    const bruto = localStorage.getItem(CHAVE)
    if (!bruto) return dadosVazios()
    return JSON.parse(bruto) as Dados
  } catch {
    return dadosVazios()
  }
}

function escrever(dados: Dados): void {
  localStorage.setItem(CHAVE, JSON.stringify(dados))
}

/** Gera um id único pra transação/categoria nova. */
export function gerarId(): string {
  return crypto.randomUUID()
}

export function listarTransacoes(): Transacao[] {
  return ler().transacoes
}

/** Cria ou atualiza (por `id`). */
export function salvarTransacao(transacao: Transacao): void {
  const dados = ler()
  const indice = dados.transacoes.findIndex((t) => t.id === transacao.id)
  if (indice === -1) dados.transacoes.push(transacao)
  else dados.transacoes[indice] = transacao
  escrever(dados)
}

export function excluirTransacao(id: string): void {
  const dados = ler()
  dados.transacoes = dados.transacoes.filter((t) => t.id !== id)
  escrever(dados)
}

export function listarCategorias(): Categoria[] {
  return ler().categorias
}

export function salvarCategorias(categorias: Categoria[]): void {
  const dados = ler()
  dados.categorias = categorias
  escrever(dados)
}

/** Só popula se ainda não houver nenhuma categoria salva (primeira vez que abre o app). */
export function inicializarCategoriasPadrao(
  categoriasPadrao: Categoria[],
): void {
  const dados = ler()
  if (dados.categorias.length === 0) {
    dados.categorias = categoriasPadrao
    escrever(dados)
  }
}

/** Snapshot completo — usado pelo backup (exportar). */
export function lerTudo(): Dados {
  return ler()
}

/** Sobrescreve tudo — usado pelo backup (importar "substituir"). */
export function substituirTudo(dados: Dados): void {
  escrever({ ...dados, versao: VERSAO_SCHEMA })
}
