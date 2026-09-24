# Product Requirements Document — Sonho de Papel

Preencha um PRD por cliente/freelance. Este arquivo orienta a IA e você
sobre *o que* construir — não *como* (veja `SDD.md` e `UI_GUIDANCE.md`).

## Identidade

| Campo | Valor |
| --- | --- |
| Nome do cliente / marca | Sonho de Papel |
| Área de atuação | Papelaria criativa / customização (Bíblias, encadernação, caixas, presentes, balões) |
| Público-alvo | Pessoas que buscam personalização afetiva: Bíblias, agendas, cadernos, presentes e lembrancinhas (forte vínculo com material religioso/devocional) |
| Tom de voz | Acolhedor, carinhoso, delicado — “voz baixa”, nunca apelativo |
| Idioma do site | pt-BR |

## Objetivo da landing

O visitante deve entender que a Sonho de Papel é uma papelaria afetiva e personalizada, e deve **abrir o catálogo** e/ou **chamar no WhatsApp** / seguir no Instagram — um hub central (estilo linktree/bio).

## Conteúdo obrigatório

- [x] Nome / marca em destaque (hero)
- [x] Headline + frase de apoio
- [x] Contato (WhatsApp / Instagram)
- [x] CTA principal: **Catálogo** (PDF)
- [ ] (Opcional) Serviços / sobre — só se couber sem virar one-page longa; preferência é lista curta de links

## Contatos a linkar

| Canal | URL / número |
| --- | --- |
| WhatsApp | https://wa.me/5511937102749 |
| E-mail | — |
| Instagram | https://instagram.com/cristasonhodepapel |
| Catálogo | `/catalogo.pdf` (ver decisão abaixo) |
| Outro | — |

## Domínio

| Campo | Valor |
| --- | --- |
| URL desejada | sonhodepapelartes.com.br |
| Quem compra / renova o domínio | A confirmar (cliente / freelancer) |
| Já possui domínio? | Sim (sonhodepapelartes.com.br) |

## Formato do site

**Presença / linktree (bio site)** — não one-page com muitas seções.

Prioridade dos botões (ordem sugerida):

1. Catálogo 2025 (mais importante)
2. WhatsApp
3. Instagram

Opcional depois: atalhos por serviço (Bíblias, Encadernação, etc.) se não poluir.

## Catálogo PDF — análise e decisão

Arquivos:
- `public/catalogo.pdf` — versão **otimizada** para o site (~11 MB, 22 páginas) — usar no CTA
- `public/catalogo-original.pdf` — original (~50 MB), local only (gitignored)
- Direção visual PDF — local only (gitignored); não versionar no GitHub

Compressão: skill `.cursor/skills/compress-pdf-catalog/` (script `scripts/compress_pdf.py`).

## Tipografia

| Fonte | Uso no site |
| --- | --- |
| Aroma Vintage | Headline (`font-accent` + TypingAnimation) — webfont local em `public/fonts/` (não há no Google Fonts); fallback Playfair Display via GF |
| Aileron | Nome da marca / títulos (`font-display`) — CDN jsDelivr |
| Calibri | Corpo (`font-sans`) — CDN Carlito + `Calibri` no stack |

### Opções

| Opção | Prós | Contras | Encaixa no linktree? |
| --- | --- | --- | --- |
| **A. Abrir em nova aba** (`target="_blank"` → `/catalogo.pdf`) | Simples; desktop usa o visualizador do browser; usuário “folheia” | Em mobile o comportamento varia (viewer nativo ou download); arquivo grande demora | **Sim — preferido após comprimir** |
| **B. Forçar download** (`download`) | Intenção clara de “levar o PDF” | Mesmo peso de rede; no iOS o `download` costuma só abrir; menos “ver na hora” | Ok como secundário (“Baixar catálogo”) |
| **C. Embed / viewer na própria página** | Controle visual | Pesado, ruim em mobile, foge do formato linktree | **Não** |
| **D. Hospedar fora** (Drive / Dropbox / R2) + link externo | Alivia o repo e o Pages | Dependência externa; UX menos “do site” | Plano B se o PDF continuar grande |
| **E. Comprimir / otimizar o PDF** | Melhora qualquer opção A–D | Precisa de um passo de produção | **Obrigatório antes do deploy** |

### Recomendação

1. ~~Comprimir o catálogo~~ **Feito** — ver skill `compress-pdf-catalog`; `catalogo.pdf` otimizado (original local).
2. No linktree: **um botão “Catálogo” que abre em nova aba** (`rel="noopener noreferrer"`). É o padrão que melhor combina “ver agora” + simplicidade estática no GitHub Pages.
3. Se quiser reforço: segundo link menor “Baixar PDF” (mesmo arquivo) — opcional, não necessário no MVP.
4. **Não** embutir viewer na página.
5. Se após compressão ainda ficar grande demais para o repo: hospedar o PDF otimizado fora e manter só o link no botão.

### Critério de aceite do catálogo

- [ ] PDF otimizado versionado (ou URL externa estável)
- [ ] Botão Catálogo abre o PDF em nova aba e funciona no mobile
- [ ] Tempo de abertura aceitável em 4G

## Direção visual (resumo para UI)

Fonte: `public/Sonho de Papel - Direção visual.pdf`

| Token | Hex | Uso |
| --- | --- | --- |
| Creme papel | `#FFF8F3` | Fundo principal |
| Amarelo manteiga | `#F5D77A` | Destaque da marca (fundos/molduras/detalhes) |
| Verde broto | `#B8E76B` (claro `#E3F3C8`) | Toques / fitas |
| Rosa framboesa | `#F05F83` | Detalhe pequeno (ícone, coração) |
| Grafite suave | `#6B6B68` (títulos `#3A3737`) | Texto |

Clima: aconchego (creme, textura de papel), delicadeza, leveza — uma ideia por “bloco”. Tipografia e tokens: ajustar em `src/styles/main.css` na personalização.

Slogan da marca (direção visual): **feito com carinho, um a um**.

## Fora de escopo (padrão)

- Login / área do cliente
- Carrinho / pagamento online
- CMS / painel admin
- Formulário com backend (Pages é estático)
- Mensalidade de hospedagem (usa GitHub Pages)
- Viewer PDF embutido na página

## Critérios de aceite

- [ ] Mobile e desktop legíveis (clima creme / acolhedor)
- [ ] Links WhatsApp, Instagram e Catálogo funcionando
- [ ] HTTPS no domínio sonhodepapelartes.com.br (ou URL *.github.io enquanto DNS sobe)
- [ ] Textos e imagens do cliente no lugar dos placeholders
- [ ] Deploy via GitHub Actions ok
- [ ] Catálogo acessível sem travar o fluxo principal do bio site

## Referências

- Sites / fotos / cores que o cliente gostou: direção visual Letz Studio; @insumoscomamor, @ateliedacriativa, @prunellaprojects
- Conteúdo bruto: `public/catalogo.pdf` (Quem somos + serviços + preços); tagline “feito com carinho, um a um”
