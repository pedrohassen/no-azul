import { useState } from 'react'
import {
  NOMES_DIAS_SEMANA,
  anoMesDeIso,
  formatMesAno,
  gradeDoMes,
  mesAnterior,
  mesSeguinte,
} from '../lib/calendario'
import { dataDeHoje, formatData } from '../lib/formatData'
import { IconeCalendario, IconeSeta } from './Icones'
import { PainelFlutuante } from './PainelFlutuante'

type SeletorDataProps = {
  valor: string // ISO "YYYY-MM-DD"
  onChange: (iso: string) => void
  id?: string
}

/**
 * Substitui o `<input type="date">` nativo — o popup de calendário do
 * navegador não é estilizável via CSS (é renderizado pelo SO), então isso é
 * um calendário próprio, com a mesma paleta do resto do app.
 */
export function SeletorData({ valor, onChange, id }: SeletorDataProps) {
  const [aberto, setAberto] = useState(false)
  const [mesVisivel, setMesVisivel] = useState(() => anoMesDeIso(valor))

  function abrir() {
    setMesVisivel(anoMesDeIso(valor))
    setAberto(true)
  }

  function escolher(iso: string) {
    onChange(iso)
    setAberto(false)
  }

  const grade = gradeDoMes(mesVisivel)

  return (
    <div className="relative">
      <button
        type="button"
        id={id}
        onClick={() => (aberto ? setAberto(false) : abrir())}
        className="flex min-h-11 w-full items-center justify-between rounded-lg border border-line bg-paper px-3 font-sans text-ink outline-none focus:border-azul"
      >
        {formatData(valor)}
        <IconeCalendario className="h-5 w-5 text-muted" />
      </button>

      <PainelFlutuante aberto={aberto} aoFechar={() => setAberto(false)}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setMesVisivel(mesAnterior(mesVisivel))}
            aria-label="Mês anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink"
          >
            <IconeSeta className="h-4 w-4 rotate-180" />
          </button>
          <span className="font-sans text-sm font-medium text-ink">
            {formatMesAno(mesVisivel)}
          </span>
          <button
            type="button"
            onClick={() => setMesVisivel(mesSeguinte(mesVisivel))}
            aria-label="Próximo mês"
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink"
          >
            <IconeSeta className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7">
          {NOMES_DIAS_SEMANA.map((nome, i) => (
            <span
              key={i}
              className="flex h-8 items-center justify-center font-sans text-xs text-muted"
            >
              {nome}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {grade.map((celula) => {
            const selecionado = celula.iso === valor
            return (
              <button
                key={celula.iso}
                type="button"
                onClick={() => escolher(celula.iso)}
                className={`flex h-11 w-11 items-center justify-center rounded-full font-sans text-sm transition-colors ${
                  selecionado
                    ? 'bg-azul text-contraste'
                    : celula.doMesAtual
                      ? 'text-ink hover:bg-line/30'
                      : 'text-muted/50 hover:bg-line/30'
                }`}
              >
                {celula.dia}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => escolher(dataDeHoje())}
          className="mt-2 w-full rounded-lg py-2 text-center font-sans text-sm text-azul hover:underline"
        >
          Hoje
        </button>
      </PainelFlutuante>
    </div>
  )
}
