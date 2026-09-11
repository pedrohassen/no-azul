/** Tipos compartilhados. Consumidos por `src/data/*`, `src/lib/*` e pelas telas. */

export type TipoTransacao = 'receita' | 'despesa'

export type Transacao = {
  id: string
  tipo: TipoTransacao
  /** Sempre positivo; o sinal vem do `tipo`. */
  valor: number
  categoriaId: string
  /** ISO `YYYY-MM-DD`. */
  data: string
  descricao?: string
}

export type Categoria = {
  id: string
  nome: string
  tipo: TipoTransacao | 'ambos'
  cor?: string
}
