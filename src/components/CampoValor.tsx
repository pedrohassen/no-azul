type CampoValorProps = {
  valor: string
  onChange: (valor: string) => void
  id?: string
}

/**
 * Campo de valor monetário — teclado numérico no celular, aceita vírgula ou ponto
 * como separador decimal. O componente só filtra caracteres; converter pra `number`
 * é responsabilidade de quem consome (ver `Lancar.tsx`).
 */
export function CampoValor({ valor, onChange, id }: CampoValorProps) {
  return (
    <div className="flex items-baseline gap-2 rounded-lg border border-line px-4 py-3 focus-within:border-azul">
      <span className="font-sans text-2xl text-muted">R$</span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        placeholder="0,00"
        value={valor}
        onChange={(e) => {
          const limpo = e.target.value.replace(/[^0-9,.]/g, '')
          onChange(limpo)
        }}
        className="w-full bg-transparent font-sans text-2xl text-ink outline-none placeholder:text-muted/60"
      />
    </div>
  )
}
