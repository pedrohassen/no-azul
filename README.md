# No Azul

Controle pessoal de receitas e despesas — webapp instalável (PWA), **sem backend**,
com todos os dados guardados só no aparelho de quem usa.

> **Projeto conceito de portfólio.** Construído pelo Pedro Hasse Niemczewski pra uso
> pessoal de verdade — não é trabalho de cliente nem produto com suporte.

## Por que sem backend

Dado financeiro é sensível. Em vez de servidor + banco de dados + login, os dados ficam
só no `localStorage` do navegador: nunca trafegam pela rede, não existe conta pra
invadir, não existe banco de terceiro pra vazar. A troca: sem sincronização automática
entre dispositivos — a transferência é manual, por arquivo (exportar/importar), e sem
backup próprio, perder o aparelho é perder os dados. Ver `CLAUDE.md` (fora deste repo)
pra mais detalhe da decisão.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (tokens em `src/styles/theme.css`)
- PWA (`vite-plugin-pwa`) — instalável, funciona offline
- Fonte self-hosted (Inter Tight)
- Sem backend, sem API, sem banco de dados externo

## Desenvolvimento

```bash
npm install
npm run dev        # servidor local
npm run build      # build de produção -> dist/
npm run preview    # serve o build
npm run lint       # oxlint
npm run format     # prettier --write .
```

## Deploy

Vercel, deploy automático: push na `main` publica produção, cada Pull Request gera uma
URL de preview.

## Licença

MIT — ver [LICENSE](LICENSE). Sem ressalva de conteúdo pessoal (diferente de outros
projetos do autor): não há dado do Pedro embutido neste repositório — os dados
financeiros reais vivem só no navegador de quem usa, nunca são commitados.
