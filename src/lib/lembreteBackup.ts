/**
 * Lembrete discreto pra exportar de novo depois de um tempo sem backup — mitiga o
 * risco de perda (não faz backup sozinho, o app não tem onde enviar). Registrado só
 * quando o export de fato dispara (ver `Backup.tsx`).
 */

const CHAVE_ULTIMO_BACKUP = 'no-azul:ultimo-backup'
const DIAS_PARA_LEMBRAR = 14

export function registrarBackupFeito(): void {
  localStorage.setItem(CHAVE_ULTIMO_BACKUP, new Date().toISOString())
}

function ultimoBackupEm(): Date | null {
  const bruto = localStorage.getItem(CHAVE_ULTIMO_BACKUP)
  return bruto ? new Date(bruto) : null
}

/** `null` = nunca fez backup. Caso contrário, dias inteiros desde o último export. */
export function diasDesdeUltimoBackup(): number | null {
  const ultimo = ultimoBackupEm()
  if (!ultimo) return null
  const diffMs = Date.now() - ultimo.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

/** true se nunca fez export, ou já se passaram `DIAS_PARA_LEMBRAR` dias desde o último. */
export function precisaLembrarBackup(): boolean {
  const dias = diasDesdeUltimoBackup()
  return dias === null || dias >= DIAS_PARA_LEMBRAR
}
