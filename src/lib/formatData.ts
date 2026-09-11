/** `"2026-09-10"` -> `"10/09/2026"` */
export function formatData(dataIso: string): string {
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}

/** Data de hoje em ISO `YYYY-MM-DD`, no fuso local (não UTC). */
export function dataDeHoje(): string {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}
