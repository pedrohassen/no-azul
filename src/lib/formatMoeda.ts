/** `1234.5` -> `"R$ 1.234,50"` */
export function formatMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
