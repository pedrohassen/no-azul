import type { Categoria } from '../types'

/**
 * Categorias padrão, usadas na primeira vez que o app abre (ver
 * `inicializarCategoriasPadrao`). O usuário pode editar/adicionar depois — isso aqui
 * é só a semente inicial.
 */
export const categoriasPadrao: Categoria[] = [
  { id: 'alimentacao', nome: 'Alimentação', tipo: 'despesa' },
  { id: 'transporte', nome: 'Transporte', tipo: 'despesa' },
  { id: 'moradia', nome: 'Moradia', tipo: 'despesa' },
  { id: 'lazer', nome: 'Lazer', tipo: 'despesa' },
  { id: 'saude', nome: 'Saúde', tipo: 'despesa' },
  { id: 'compras', nome: 'Compras', tipo: 'despesa' },
  { id: 'outros-despesa', nome: 'Outros', tipo: 'despesa' },
  { id: 'salario', nome: 'Salário', tipo: 'receita' },
  { id: 'freelance', nome: 'Freelance', tipo: 'receita' },
  { id: 'outros-receita', nome: 'Outros', tipo: 'receita' },
]
