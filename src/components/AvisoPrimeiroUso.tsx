import { useState } from 'react'
import { Botao } from './Botao'

const CHAVE_AVISO_VISTO = 'no-azul:aviso-inicial-visto'

function jaViuAviso(): boolean {
  try {
    return localStorage.getItem(CHAVE_AVISO_VISTO) === '1'
  } catch {
    return false
  }
}

/**
 * Banner de primeiro uso, uma vez só — deixa claro que os dados ficam só no
 * dispositivo e que backup é responsabilidade do usuário (o app não tem onde
 * enviar sozinho). Some pra sempre depois de dispensado.
 */
export function AvisoPrimeiroUso() {
  const [visivel, setVisivel] = useState(() => !jaViuAviso())

  function dispensar() {
    try {
      localStorage.setItem(CHAVE_AVISO_VISTO, '1')
    } catch {
      // localStorage indisponível (ex. modo privado) — some só desta sessão.
    }
    setVisivel(false)
  }

  if (!visivel) return null

  return (
    <div className="mx-auto max-w-md px-4 pt-4 md:max-w-2xl md:px-8">
      <div className="rounded-xl border border-line bg-paper p-4">
        <p className="mb-3 font-sans text-sm text-ink">
          Seus dados ficam só neste dispositivo. Sem backup regular (aba{' '}
          <strong>Backup</strong>, botão Exportar), perder o aparelho significa
          perder os dados — sem recuperação possível.
        </p>
        <Botao variante="contorno" onClick={dispensar} className="w-full">
          Entendi
        </Botao>
      </div>
    </div>
  )
}
