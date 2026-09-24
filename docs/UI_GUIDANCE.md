# UI Guidance

Diretrizes visuais para landings deste esqueleto. Leia junto com o `PRD.md` do cliente.

## Princípios (sempre)

1. **Uma composição no primeiro viewport** — marca + 1 headline + 1 frase + 1 grupo de CTA + visual dominante.
2. **Marca em primeiro plano** — se remover o nav, ainda dá para saber de quem é o site.
3. **Hero full-bleed** — fundo/efeito de borda a borda; sem cards flutuando no hero.
4. **Uma função por seção** — um título, uma frase de apoio.
5. **Poucos cards** — só se forem necessários para interação.
6. **Movimento com intenção** — 2–3 animações com propósito (BlurFade, Typewriter, Particles…), não ruído.

## Tipografia

- Defina display ≠ corpo em `@theme` (`src/styles/main.css`).
- Evite stacks default como face principal de marca: Inter, Roboto, Arial, system-ui.
- O demo usa Syne + DM Sans + IBM Plex Mono — troque por cliente.

## Cor e clima

- Ajuste `--color-brand`, `--primary` e tokens shadcn em `main.css`.
- Evitar clichês: roxo/indigo genérico; cream + serif + terracotta “AI default”; glow; pills demais.

## Kits de UI

- Prefira componentes já em `src/components/` (ver README da pasta).
- Não sobrecarregue a página com todo o bank — escolha 2–4 efeitos.

## Contato

Botões claros para WhatsApp / e-mail / rede. Sem formulário server-side neste stack.

## Checklist antes de entregar

- [ ] Tokens de cor/fonte ajustados ao cliente
- [ ] Placeholders de texto/links removidos
- [ ] Contraste legível
- [ ] Mobile: CTAs usáveis com o polegar
- [ ] Sem chips/overlays decorativos soltos no hero
