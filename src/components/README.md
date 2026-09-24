# Component bank

Inventário do que já vem no template. Amplie aos poucos; no cliente, prefira o que já está aqui.

## Originkit (`originkit/ui/`) — bank no template

| Component | File | Notes |
| --- | --- | --- |
| Typewriter | `typewriter.tsx` | Usado no demo `App.tsx` |
| GlitchText | `glitch-text.tsx` | Disponível; não usado no demo |

Cresça este banco no template (`npx originkit add …`) para não gastar a cota free em projetos.

## Magic UI / shadcn / Aceternity (`ui/`)

| Component | File | Source |
| --- | --- | --- |
| Button | `button.tsx` | shadcn/ui |
| Accordion | `accordion.tsx` | shadcn/ui |
| Sheet | `sheet.tsx` | shadcn/ui |
| Carousel | `carousel.tsx` | shadcn/ui (Embla) |
| Particles | `particles.tsx` | Magic UI |
| RetroGrid | `retro-grid.tsx` | Magic UI |
| ShimmerButton | `shimmer-button.tsx` | Magic UI |
| InteractiveHoverButton | `interactive-hover-button.tsx` | Magic UI |
| AnimatedGradientText | `animated-gradient-text.tsx` | Magic UI |
| BlurFade | `blur-fade.tsx` | Magic UI |
| TypingAnimation | `typing-animation.tsx` | Magic UI |
| DotPattern | `dot-pattern.tsx` | Magic UI |
| Marquee | `marquee.tsx` | Magic UI |
| Dock | `dock.tsx` | Magic UI |
| BentoGrid / BentoCard | `bento-grid.tsx` | Magic UI |
| NumberTicker | `number-ticker.tsx` | Magic UI |
| Lens | `lens.tsx` | Magic UI |
| MagicCard | `magic-card.tsx` | Magic UI |
| StickyScroll | `sticky-scroll-reveal.tsx` | Aceternity UI |
| ParallaxHeroImages | `parallax-hero-images.tsx` | Aceternity UI |

Mais sob demanda:

```bash
npx shadcn@latest add @magicui/<nome>
npx shadcn@latest add @aceternity/<nome>
npx shadcn@latest add <nome>
```

Registries em `components.json`: `@magicui`, `@aceternity`.

## Handmade (`handmade/`)

| Component | File |
| --- | --- |
| ClickEffects | `click-effects.tsx` |

## Util

- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
