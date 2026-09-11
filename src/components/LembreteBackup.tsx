import { diasDesdeUltimoBackup } from '../lib/lembreteBackup'

type LembreteBackupProps = {
  aoIrParaBackup: () => void
}

/**
 * Aviso discreto (não bloqueia o uso) pra exportar de novo — só aparece quando
 * `precisaLembrarBackup()` já deu `true` (ver critério de exibição em `App.tsx`).
 */
export function LembreteBackup({ aoIrParaBackup }: LembreteBackupProps) {
  const dias = diasDesdeUltimoBackup()
  const texto =
    dias === null
      ? 'Você ainda não fez nenhum backup dos seus dados.'
      : `Já fazem ${dias} dias desde o último backup.`

  return (
    <div className="mx-auto max-w-md px-4 pt-4 md:max-w-2xl md:px-8">
      <button
        type="button"
        onClick={aoIrParaBackup}
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-left font-sans text-sm text-muted transition-colors hover:border-azul"
      >
        <span className="text-ink">{texto}</span> Exportar agora →
      </button>
    </div>
  )
}
