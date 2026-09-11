import {
  lerTudo,
  listarCategorias,
  listarTransacoes,
  salvarCategorias,
  salvarTransacao,
  substituirTudo,
  type Dados,
} from './armazenamento'

export type { Dados } from './armazenamento'

/**
 * Exportar/importar o backup completo (transações + categorias) como JSON, sem
 * filtro de período. Duas estratégias de importação:
 * - `mesclar` — junta por `id`, último importado vence em caso de mesmo id. Não
 *   detecta duplicata por conteúdo (dois lançamentos manuais do mesmo gasto em
 *   dispositivos diferentes viram dois registros) — limitação conhecida.
 * - `substituir` — descarta os dados atuais e usa só o arquivo (destrutivo).
 */

export type PreviaMesclagem = {
  totalTransacoes: number
  totalCategorias: number
  transacoesExistentes: number
}

export type ResultadoMesclagem = {
  transacoesImportadas: number
  transacoesExistentes: number
}

export function exportarDados(): string {
  return JSON.stringify(lerTudo(), null, 2)
}

/** Nome sugerido pro arquivo baixado — data facilita organizar vários backups. */
export function nomeArquivoExport(): string {
  const hoje = new Date().toISOString().slice(0, 10)
  return `no-azul-backup-${hoje}.json`
}

/** Faz o parse e valida a estrutura mínima; lança erro com mensagem amigável se inválido. */
export function lerArquivoDeBackup(conteudo: string): Dados {
  let json: unknown
  try {
    json = JSON.parse(conteudo)
  } catch {
    throw new Error('Arquivo inválido — não é um JSON válido.')
  }

  if (
    typeof json !== 'object' ||
    json === null ||
    !Array.isArray((json as Dados).transacoes) ||
    !Array.isArray((json as Dados).categorias)
  ) {
    throw new Error('Arquivo inválido — não parece um backup do No Azul.')
  }

  return json as Dados
}

/** Só calcula o que vai acontecer, sem alterar nada — pra mostrar antes de confirmar. */
export function preverMesclagem(dados: Dados): PreviaMesclagem {
  const idsAtuais = new Set(listarTransacoes().map((t) => t.id))
  const existentes = dados.transacoes.filter((t) => idsAtuais.has(t.id)).length

  return {
    totalTransacoes: dados.transacoes.length,
    totalCategorias: dados.categorias.length,
    transacoesExistentes: existentes,
  }
}

/** Junta por `id` — último importado vence em caso de mesmo id. */
export function mesclar(dados: Dados): ResultadoMesclagem {
  const idsAtuais = new Set(listarTransacoes().map((t) => t.id))
  const existentes = dados.transacoes.filter((t) => idsAtuais.has(t.id)).length

  for (const transacao of dados.transacoes) {
    salvarTransacao(transacao)
  }

  const mapaCategorias = new Map(
    listarCategorias().map((categoria) => [categoria.id, categoria]),
  )
  for (const categoria of dados.categorias) {
    mapaCategorias.set(categoria.id, categoria)
  }
  salvarCategorias(Array.from(mapaCategorias.values()))

  return {
    transacoesImportadas: dados.transacoes.length,
    transacoesExistentes: existentes,
  }
}

/** Descarta os dados atuais e usa só o arquivo — destrutivo, sem volta. */
export function substituir(dados: Dados): void {
  substituirTudo(dados)
}
