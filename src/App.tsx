import { ArrowUpRight, BookOpen, Heart } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import ClickEffects from "@/components/handmade/click-effects";
import { ScrapbookDoodles } from "@/components/handmade/scrapbook-doodles";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const BRAND = "#F05F83";
const WA_NUMBER = "5511937102749";
const WA_TEXT =
  "Olá! Vim pelo site da Sonho de Papel e gostaria de mais informações.";

type LinkItem = {
  id: string;
  label: string;
  hint: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  primary: boolean;
};

const LINKS: LinkItem[] = [
  {
    id: "catalogo",
    label: "Catálogo",
    hint: "Ver produtos e valores",
    href: "/catalogo.pdf",
    icon: BookOpen,
    primary: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    hint: "Fale com a gente",
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`,
    icon: WhatsAppIcon,
    primary: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    hint: "@cristasonhodepapel",
    href: "https://www.instagram.com/cristasonhodepapel/",
    icon: InstagramIcon,
    primary: false,
  },
];

function LinkContent({
  label,
  hint,
  icon: Icon,
  primary,
}: Pick<LinkItem, "label" | "hint" | "icon" | "primary">) {
  return (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-brand shadow-[inset_0_0_0_1px_rgb(240_95_131_/_18%)]">
        <Icon className={cn("size-5", primary && "cta-nudge")} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[0.95rem] font-semibold tracking-tight text-ink">
          {label}
        </span>
        <span className="block text-sm text-ink-muted">{hint}</span>
      </span>
      <ArrowUpRight
        className="cta-arrow size-4 shrink-0 text-ink-muted"
        aria-hidden
      />
    </>
  );
}

function BottomWave() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-full w-full"
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 52C240 8 480 100 720 52s480-44 720 0v88H0z"
        fill="var(--color-blush)"
      />
      <path
        d="M0 70C240 26 480 118 720 70s480-44 720 0"
        fill="none"
        stroke="var(--color-brand)"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="6 7"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="paper-bg relative flex min-h-[100svh] flex-col overflow-hidden text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-butter focus:px-3 focus:py-2 focus:text-ink"
      >
        Ir para o conteúdo
      </a>

      <ClickEffects color={BRAND} effectSize={72} duration={0.45} />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg
          className="absolute -left-10 -top-6 w-56 sm:w-72"
          viewBox="0 0 220 180"
        >
          <path
            d="M0 0h220c-14 52-62 66-104 96C76 124 44 158 0 170z"
            fill="var(--color-sprout-soft)"
          />
        </svg>
        <svg
          className="absolute -right-12 top-16 w-40 sm:w-56"
          viewBox="0 0 160 160"
        >
          <path
            d="M160 8c-40-6-78 10-96 42-16 30-6 66 22 84 26 16 56 14 74 4z"
            fill="var(--color-blush)"
            fillOpacity="0.7"
          />
        </svg>
      </div>

      <ScrapbookDoodles />

      <main
        id="conteudo"
        className="relative z-10 mx-auto flex w-full max-w-[26rem] flex-1 flex-col items-center justify-center px-6 pb-10 pt-16 text-center"
      >
        <BlurFade delay={0.04} inView>
          <div className="animate-float-soft">
            <figure className="relative w-44 -rotate-3 sm:w-48">
              <img
                src="/logo.webp"
                alt="Logo Sonho de Papel — Papelaria Criativa"
                width={480}
                height={480}
                className="logo-sticker aspect-square w-full"
                decoding="async"
                fetchPriority="high"
              />
              <span
                className="washi absolute -top-1 left-1/2 h-6 w-20 -translate-x-1/2 rotate-6 bg-sprout-soft/90"
                aria-hidden
              />
              <Heart
                className="absolute bottom-3 right-1 size-5 rotate-12 fill-blush text-brand"
                strokeWidth={1.8}
                aria-hidden
              />
            </figure>
          </div>
        </BlurFade>

        <BlurFade delay={0.14} inView>
          <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.24em] text-ink-muted">
            Sonho de Papel · Papelaria Criativa
          </p>
        </BlurFade>

        <BlurFade delay={0.22} inView className="mt-3 w-full">
          <h1 className="font-accent text-[2.15rem] leading-[1.1] text-brand sm:text-[2.5rem]">
            Feito com{" "}
            <span className="relative inline-block">
              carinho,
              <svg
                className="absolute -bottom-1.5 left-0 h-2.5 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 6C20 1 35 9 50 5s30-3 48 1"
                  fill="none"
                  stroke="var(--color-sprout)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
            <br />
            um a um
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView className="mt-4 w-full max-w-xs">
          <p className="text-base leading-relaxed text-balance text-ink-muted">
            Bíblias, agendas, caixas e presentes personalizados — tudo para
            realizar sonhos em papel.
          </p>
        </BlurFade>

        <nav
          className="mt-9 flex w-full flex-col items-stretch gap-4"
          aria-label="Links principais"
        >
          {LINKS.map(({ id, label, hint, href, icon, primary }, i) => (
            <BlurFade key={id} delay={0.4 + i * 0.08} inView>
              {primary ? (
                <div className="cta-float">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    type={id === "catalogo" ? "application/pdf" : undefined}
                    className="cta cta-primary stitch group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left"
                  >
                    <span className="cta-ping" aria-hidden />
                    <span className="cta-ping cta-ping-delay" aria-hidden />
                    <LinkContent
                      label={label}
                      hint={hint}
                      icon={icon}
                      primary
                    />
                  </a>
                </div>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta cta-soft stitch group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left"
                >
                  <span className="cta-soft-fill" aria-hidden />
                  <LinkContent
                    label={label}
                    hint={hint}
                    icon={icon}
                    primary={false}
                  />
                </a>
              )}
            </BlurFade>
          ))}
        </nav>
      </main>

      <footer className="relative z-10 h-28 sm:h-32">
        <BottomWave />
        <p className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-1.5 text-xs text-ink-muted">
          Feito com
          <Heart className="size-3 fill-brand text-brand" aria-hidden />· Sonho
          de Papel · {year}
        </p>
      </footer>
    </div>
  );
}
