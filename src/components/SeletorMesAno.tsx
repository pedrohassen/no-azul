import { useState } from 'react'
import {
  NOMES_MESES_ABREV,
  anoMesDeHoje,
  anoMesDeIso,
  formatMesAno,
  paraMesIso,
} from '../lib/calendario'
import { IconeCalendario, IconeSeta } from './Icones'
import { PainelFlutuante } from './PainelFlutuante'

type SeletorMesAnoProps = {
  valor: string // "" = todos os meses, senão "YYYY-MM"
  onChange: (mesIso: string) => void
}

/**
 * Substitui o `<input type="month">` nativo do filtro do Histórico — mesmo
 * motivo do `SeletorData` (popup nativo não é estilizável), com a mesma casca
 * visual (`PainelFlutuante`) pra não quebrar identidade entre os dois.
 * "Limpar"/"Este mês" reproduzem os atalhos que o seletor nativo já tinha.
 */
export function SeletorMesAno({ valor, onChange }: SeletorMesAnoProps) {
  const [aberto, setAberto] = useState(false)
  const [anoVisivel, setAnoVisivel] = useState(
    () => (valor ? anoMesDeIso(valor) : anoMesDeHoje()).ano,
  )

  function abrir() {
    setAnoVisivel((valor ? anoMesDeIso(valor) : anoMesDeHoje()).ano)
    setAberto(true)
  }

  function escolherMes(mes: number) {
    onChange(paraMesIso({ ano: anoVisivel, mes }))
    setAberto(false)
  }

  function limpar() {
    onChange('')
    setAberto(false)
  }

  function irParaMesAtual() {
    onChange(paraMesIso(anoMesDeHoje()))
    setAberto(false)
  }

  const rotulo = valor ? formatMesAno(anoMesDeIso(valor)) : 'Todos os meses'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => (aberto ? setAberto(false) : abrir())}
        className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-paper px-3 font-sans text-sm text-ink"
      >
        {rotulo}
        <IconeCalendario className="h-4 w-4 text-muted" />
      </button>

      <PainelFlutuante aberto={aberto} aoFechar={() => setAberto(false)}>
        <div className="mb-3 flex min-w-64 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setAnoVisivel((a) => a - 1)}
            aria-label="Ano anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink"
          >
            <IconeSeta className="h-4 w-4 rotate-180" />
          </button>
          <span className="font-sans text-sm font-medium text-ink">
            {anoVisivel}
          </span>
          <button
            type="button"
            onClick={() => setAnoVisivel((a) => a + 1)}
            aria-label="Próximo ano"
            className="flex h-11 w-11 items-center justify-center rounded-full text-muted hover:text-ink"
          >
            <IconeSeta className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {NOMES_MESES_ABREV.map((nome, i) => {
            const mes = i + 1
            const selecionado = valor === paraMesIso({ ano: anoVisivel, mes })
            return (
              <button
                key={nome}
                type="button"
                onClick={() => escolherMes(mes)}
                className={`flex h-11 items-center justify-center rounded-lg font-sans text-sm transition-colors ${
                  selecionado
                    ? 'bg-azul text-contraste'
                    : 'text-ink hover:bg-line/30'
                }`}
              >
                {nome}
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <button
            type="button"
            onClick={limpar}
            className="font-sans text-sm text-muted hover:text-ink"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={irParaMesAtual}
            className="font-sans text-sm text-azul hover:underline"
          >
            Este mês
          </button>
        </div>
      </PainelFlutuante>
    </div>
  )
}
