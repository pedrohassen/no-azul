import { useRef, useState } from 'react'
import { Botao } from '../components/Botao'
import {
  exportarDados,
  lerArquivoDeBackup,
  mesclar,
  nomeArquivoExport,
  preverMesclagem,
  substituir,
  type Dados,
} from '../lib/backup'
import { registrarBackupFeito } from '../lib/lembreteBackup'

const TEXTO_CONFIRMACAO = 'SUBSTITUIR'

export function Backup() {
  const inputArquivoRef = useRef<HTMLInputElement>(null)

  const [dadosImportar, setDadosImportar] = useState<Dados | null>(null)
  const [erroArquivo, setErroArquivo] = useState('')
  const [mensagemExport, setMensagemExport] = useState('')
  const [mensagemImportar, setMensagemImportar] = useState('')

  const [mostrarAvancado, setMostrarAvancado] = useState(false)
  const [textoConfirmacao, setTextoConfirmacao] = useState('')

  function limparResultadoArquivo() {
    setDadosImportar(null)
    setErroArquivo('')
    setMensagemImportar('')
    setMostrarAvancado(false)
    setTextoConfirmacao('')
  }

  function exportar() {
    const conteudo = exportarDados()
    const blob = new Blob([conteudo], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = nomeArquivoExport()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    registrarBackupFeito()
    setMensagemExport('Backup exportado — confira a pasta de downloads.')
  }

  async function aoSelecionarArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target
    const arquivo = input.files?.[0]
    if (!arquivo) return

    limparResultadoArquivo()
    setMensagemExport('')

    try {
      const conteudo = await arquivo.text()
      setDadosImportar(lerArquivoDeBackup(conteudo))
    } catch (erro) {
      setErroArquivo(
        erro instanceof Error
          ? erro.message
          : 'Não foi possível ler o arquivo.',
      )
    } finally {
      input.value = '' // permite escolher o mesmo arquivo de novo, se precisar
    }
  }

  function confirmarMesclagem() {
    if (!dadosImportar) return
    const resultado = mesclar(dadosImportar)
    setMensagemImportar(
      `${resultado.transacoesImportadas} transações importadas` +
        (resultado.transacoesExistentes > 0
          ? ` (${resultado.transacoesExistentes} já existiam e foram atualizadas).`
          : '.'),
    )
    setDadosImportar(null)
  }

  function confirmarSubstituicao() {
    if (!dadosImportar) return
    substituir(dadosImportar)
    setMensagemImportar(
      'Dados substituídos pelo conteúdo do arquivo importado.',
    )
    limparResultadoArquivo()
  }

  const previa = dadosImportar ? preverMesclagem(dadosImportar) : null

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <h1 className="mb-6 font-sans text-xl font-semibold text-ink">Backup</h1>

      <section className="mb-6 rounded-xl border border-line p-5">
        <h2 className="mb-1 font-sans text-sm font-medium text-ink">
          Exportar
        </h2>
        <p className="mb-4 font-sans text-sm text-muted">
          Baixa um arquivo com todas as transações e categorias.
        </p>
        <Botao onClick={exportar} className="w-full">
          Exportar dados
        </Botao>
        {mensagemExport ? (
          <p className="mt-3 font-sans text-sm text-azul">{mensagemExport}</p>
        ) : null}
      </section>

      <section className="mb-6 rounded-xl border border-line p-5">
        <h2 className="mb-1 font-sans text-sm font-medium text-ink">
          Importar
        </h2>
        <p className="mb-4 font-sans text-sm text-muted">
          Escolha um arquivo exportado do No Azul (deste ou de outro
          dispositivo).
        </p>

        <input
          ref={inputArquivoRef}
          type="file"
          accept="application/json"
          onChange={aoSelecionarArquivo}
          className="hidden"
        />
        <Botao
          variante="contorno"
          onClick={() => inputArquivoRef.current?.click()}
          className="w-full"
        >
          Escolher arquivo
        </Botao>

        {erroArquivo ? (
          <p className="mt-3 font-sans text-sm text-vermelho">{erroArquivo}</p>
        ) : null}

        {mensagemImportar ? (
          <p className="mt-3 font-sans text-sm text-azul">{mensagemImportar}</p>
        ) : null}

        {previa ? (
          <div className="mt-4 border-t border-line pt-4">
            <p className="mb-3 font-sans text-sm text-ink">
              {previa.totalTransacoes} transações serão importadas
              {previa.transacoesExistentes > 0
                ? `, ${previa.transacoesExistentes} já existem`
                : ''}{' '}
              — continuar?
            </p>
            <Botao onClick={confirmarMesclagem} className="w-full">
              Mesclar
            </Botao>
            <p className="mt-2 font-sans text-xs text-muted">
              Junta com o que já está salvo. Não apaga nada.
            </p>

            <button
              type="button"
              onClick={() => setMostrarAvancado((v) => !v)}
              className="mt-4 font-sans text-xs text-muted underline underline-offset-2"
            >
              {mostrarAvancado ? 'Esconder' : 'Opções avançadas'}
            </button>

            {mostrarAvancado ? (
              <div className="mt-3 rounded-lg border border-vermelho/40 p-4">
                <p className="mb-1 font-sans text-sm font-medium text-vermelho">
                  Substituir tudo
                </p>
                <p className="mb-3 font-sans text-xs text-muted">
                  Apaga os dados atuais deste dispositivo e usa só o arquivo
                  importado. Não dá pra desfazer.
                </p>
                <label className="mb-3 block">
                  <span className="mb-1 block font-sans text-xs text-muted">
                    Digite {TEXTO_CONFIRMACAO} para habilitar
                  </span>
                  <input
                    type="text"
                    value={textoConfirmacao}
                    onChange={(e) => setTextoConfirmacao(e.target.value)}
                    placeholder={TEXTO_CONFIRMACAO}
                    className="w-full rounded-lg border border-line bg-paper px-3 py-2 font-sans text-ink outline-none focus:border-vermelho"
                  />
                </label>
                <Botao
                  variante="perigo"
                  disabled={textoConfirmacao !== TEXTO_CONFIRMACAO}
                  onClick={confirmarSubstituicao}
                  className="w-full"
                >
                  Substituir tudo
                </Botao>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-line p-5">
        <h2 className="mb-2 font-sans text-sm font-medium text-ink">
          Como levar o arquivo pra outro dispositivo
        </h2>
        <p className="font-sans text-sm text-muted">
          O arquivo exportado é só um JSON — leve como preferir: numa pasta de
          nuvem sincronizada (Drive, Dropbox...), mandando pra si mesmo por
          e-mail ou WhatsApp/Telegram, ou por cabo USB. Se escolher um app de
          mensagem, o arquivo passa pelos servidores dele até chegar no outro
          aparelho — isso é escolha sua, o No Azul não exige nem faz isso
          sozinho.
        </p>
      </section>
    </div>
  )
}
