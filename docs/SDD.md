# Software Design Document

Visão técnica do esqueleto **React Landpage Template** para landings freelance.

## Stack

| Camada | Escolha | Motivo |
| --- | --- | --- |
| UI | React 19 + TypeScript | Componentes animados e composição moderna |
| Estilo | Tailwind CSS v4 + shadcn tokens | Utilitários + `@theme` |
| Motion | Magic UI + Originkit + handmade | Banco local; Originkit pré-baixado |
| Build | Vite | Dev rápido, `dist/` estático para Pages |
| Deploy | GitHub Pages + Actions | Hospedagem sem mensalidade |
| Contato | Links externos (wa.me, mailto, redes) | Sem backend |

## Arquitetura

```
código-fonte (repo)
  → npm run build (local ou GitHub Actions)
  → pasta dist/ (HTML/CSS/JS/assets)
  → artifact → GitHub Pages
  → URL github.io ou domínio do cliente
```

## Estrutura de pastas

```
/
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx                 # landing demo (placeholders)
│   ├── styles/main.css         # Tailwind + tokens
│   ├── lib/utils.ts
│   └── components/
│       ├── ui/                 # shadcn + Magic UI
│       ├── originkit/          # bank Originkit
│       └── handmade/           # componentes próprios
├── public/
├── docs/
├── components.json             # shadcn (+ registry @magicui)
├── originkit.components.json
├── .github/workflows/deploy.yml
└── vite.config.ts
```

## Regras de design técnico

1. Site 100% estático após o build.
2. Sem `node_modules` em produção — só o conteúdo de `dist/`.
3. `base` do Vite: `./` por padrão (repo Pages e domínio custom).
4. Originkit: versionar componentes no template; não commitar `.originkit/`.
5. Magic UI / shadcn: starter no template; fetch sob demanda no projeto.

## Domínio

Ver `DEPLOY.md`.

## Extensões futuras (opcional)

- React Router → lembrar fallback SPA no Pages (`404.html`)
- Formulário → Formspree / similar
- Host alternativo → Cloudflare Pages consome o mesmo `dist/`
