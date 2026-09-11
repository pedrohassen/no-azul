/**
 * Matemática de calendário sem lib externa — `Date` nativo já resolve ano
 * bissexto, dias por mês e virada de ano/mês corretamente (ver `diasNoMes` e
 * `normalizar`). Usado pelos seletores customizados (`SeletorData`,
 * `SeletorMesAno`) que substituem os `<input type="date/month">` nativos.
 */

export const NOMES_MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export const NOMES_MESES_ABREV = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export const NOMES_DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

/** `mes` é 1-12 (não o índice 0-11 do `Date` nativo). */
export type AnoMes = { ano: number; mes: number }

export function anoMesDeHoje(): AnoMes {
  const hoje = new Date()
  return { ano: hoje.getFullYear(), mes: hoje.getMonth() + 1 }
}

export function anoMesDeIso(iso: string): AnoMes {
  const [ano, mes] = iso.split('-').map(Number)
  return { ano, mes }
}

/** Dia 0 do mês seguinte = último dia do mês pedido. Resolve fevereiro/bissexto
 * de graça, é o próprio motor de datas do JS que sabe a regra. */
export function diasNoMes(ano: number, mes: number): number {
  return new Date(ano, mes, 0).getDate()
}

/** `Date` normaliza mês fora de 1-12 sozinho (mes=0 vira dezembro do ano
 * anterior, mes=13 vira janeiro do ano seguinte) — usado pra navegar sem
 * `if` manual de virada de ano. */
function normalizar(ano: number, mes: number): AnoMes {
  const d = new Date(ano, mes - 1, 1)
  return { ano: d.getFullYear(), mes: d.getMonth() + 1 }
}

export function mesAnterior({ ano, mes }: AnoMes): AnoMes {
  return normalizar(ano, mes - 1)
}

export function mesSeguinte({ ano, mes }: AnoMes): AnoMes {
  return normalizar(ano, mes + 1)
}

export function formatMesAno({ ano, mes }: AnoMes): string {
  return `${NOMES_MESES[mes - 1]} de ${ano}`
}

export function paraIso(ano: number, mes: number, dia: number): string {
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`
}

export function paraMesIso({ ano, mes }: AnoMes): string {
  return `${ano}-${String(mes).padStart(2, '0')}`
}

export type DiaDaGrade = {
  dia: number
  iso: string
  /** false = dia de preenchimento do mês anterior/seguinte (mostrado apagado). */
  doMesAtual: boolean
}

/**
 * Grade de 42 células (6 semanas), começando no domingo, preenchida com dias
 * do mês anterior/seguinte nas pontas — mesmo comportamento do seletor nativo
 * do navegador (ver print do `<input type="date">`).
 */
export function gradeDoMes({ ano, mes }: AnoMes): DiaDaGrade[] {
  const totalDias = diasNoMes(ano, mes)
  const primeiroDiaSemana = new Date(ano, mes - 1, 1).getDay() // 0 = domingo
  const { ano: anoAnt, mes: mesAnt } = mesAnterior({ ano, mes })
  const diasMesAnterior = diasNoMes(anoAnt, mesAnt)

  const celulas: DiaDaGrade[] = []

  for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
    const dia = diasMesAnterior - i
    celulas.push({ dia, iso: paraIso(anoAnt, mesAnt, dia), doMesAtual: false })
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    celulas.push({ dia, iso: paraIso(ano, mes, dia), doMesAtual: true })
  }

  const { ano: anoProx, mes: mesProx } = mesSeguinte({ ano, mes })
  let diaProx = 1
  while (celulas.length < 42) {
    celulas.push({
      dia: diaProx,
      iso: paraIso(anoProx, mesProx, diaProx),
      doMesAtual: false,
    })
    diaProx++
  }

  return celulas
}
