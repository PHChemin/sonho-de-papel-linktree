# React Landpage Template

Esqueleto para landings freelance com **Vite + React + TypeScript + Tailwind CSS v4**, motion (Magic UI / Originkit) e deploy gratuito no **GitHub Pages**.

Irmão HTML-only: [github-landpage-template](https://github.com/PHChemin/github-landpage-template).

## Stack

| Camada | Escolha |
| --- | --- |
| UI | React 19 + TypeScript |
| Estilo | Tailwind v4 (`@tailwindcss/vite`) + tokens shadcn |
| Motion bank | Magic UI (via shadcn) + Originkit (pré-baixado) + handmade |
| Build | Vite → `dist/` estático |
| Deploy | GitHub Actions → GitHub Pages |

```
código (React, Tailwind, deps)
        │
        ▼  vite build
     dist/  (HTML/CSS/JS prontos)
        │
        ▼  Actions
  GitHub Pages (site no ar)
```

## Começar

```bash
npm install
npm run dev
```

Abra o endereço do terminal (geralmente `http://localhost:5173`).

### Checklist de personalização

1. Preencha `docs/CLIENT_BRIEF.md` e `docs/PRD.md`.
2. Ajuste tokens/cores em `src/styles/main.css`.
3. Troque textos, links e CTAs em `src/App.tsx` (e `index.html` title/description).
4. Coloque logo/fotos em `public/` se precisar.
5. `npm run build` → `npm run preview`.
6. Deploy: `docs/DEPLOY.md`.

Contato só via links (`wa.me`, `mailto:`, redes) — Pages é estático.

## Banco de componentes

Código já versionado no repo (sem fetch no dia a dia do cliente):

| Origem | Pasta | Política |
| --- | --- | --- |
| **Originkit** | `src/components/originkit/` | **Salvar no template** (limite free ~3 fetches/dia) |
| **Magic UI / shadcn** | `src/components/ui/` | Starter set no template; no projeto: `npx shadcn add @magicui/<nome>` |
| **Handmade** | `src/components/handmade/` | Seus efeitos (ex.: `ClickEffects`) |

Detalhes: [`src/components/README.md`](src/components/README.md).

### Adicionar mais componentes

```bash
# Magic UI / shadcn (sem limite diário típico)
npx shadcn@latest add @magicui/<nome>
npx shadcn@latest add button

# Originkit — preferir crescer o banco no template nos dias calmos
npx originkit login
npx originkit add <nome>
```

Config: `components.json` (shadcn + registry `@magicui`) e `originkit.components.json`.

> Não commite a pasta `.originkit/` (login/cache local). Já está no `.gitignore`.

## Docs (humano + IA)

| Arquivo | Uso |
| --- | --- |
| [docs/CLIENT_BRIEF.md](docs/CLIENT_BRIEF.md) | Respostas rápidas do cliente |
| [docs/PRD.md](docs/PRD.md) | Requisitos do projeto |
| [docs/SDD.md](docs/SDD.md) | Decisão técnica / arquitetura |
| [docs/UI_GUIDANCE.md](docs/UI_GUIDANCE.md) | Regras de design |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Pages, Actions e domínio custom |

## Deploy

1. Publique o repo no GitHub (ou use *Use this template*).
2. **Settings → Pages → Source → GitHub Actions**.
3. Push na `main` (workflow `.github/workflows/deploy.yml`).
4. Se CSS/JS quebrarem em `user.github.io/repo/`, descomente `VITE_BASE_PATH` no workflow.
5. Domínio: `docs/DEPLOY.md`.

## Scripts

```bash
npm run dev       # desenvolvimento
npm run build     # gera dist/
npm run preview   # testa o build localmente
```

## Segurança / o que NÃO versionar

- `.env` / secrets / API keys
- `.originkit/` (credenciais/cache do CLI)
- `node_modules/`, `dist/`
- Dados reais do cliente (WhatsApp, e-mail) até o fork do projeto — este template usa **placeholders**
