type ChipCategoriaProps = {
  nome: string
  selecionada: boolean
  onClick: () => void
}

export function ChipCategoria({
  nome,
  selecionada,
  onClick,
}: ChipCategoriaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selecionada}
      className={`rounded-full border px-4 py-2 font-sans text-sm transition-colors ${
        selecionada
          ? 'border-azul bg-azul text-contraste'
          : 'border-line text-ink hover:border-azul'
      }`}
    >
      {nome}
    </button>
  )
}
