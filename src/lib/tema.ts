/**
 * Mesmo padrão do portfólio: classe `.dark` no `<html>`, persistida no `localStorage`,
 * com fallback pra preferência do sistema. O anti-FOUC (aplicar antes do primeiro
 * render) fica num script inline no `index.html`, não aqui.
 */

export type Tema = 'light' | 'dark'

const CHAVE = 'no-azul:tema'

/** Tema salvo por quem usa, ou a preferência do sistema, ou claro. */
export function temaInicial(): Tema {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo === 'light' || salvo === 'dark') return salvo
  } catch {
    // localStorage indisponível (modo privado etc.) — segue no fallback.
  }

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

/** Aplica a classe `.dark` no `<html>` e persiste a escolha. */
export function aplicarTema(tema: Tema): void {
  document.documentElement.classList.toggle('dark', tema === 'dark')
  try {
    localStorage.setItem(CHAVE, tema)
  } catch {
    // sem persistência — a escolha vale só nesta sessão.
  }
}
