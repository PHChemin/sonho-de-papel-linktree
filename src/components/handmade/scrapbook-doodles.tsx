import { useMemo, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

const INK = '#6B6B68'
const RASPBERRY = '#F05F83'
const BLUSH = '#F7DDE3'
const BLUSH_DEEP = '#EFC2CD'
const BUTTER = '#F5D77A'
const SPROUT = '#B8E76B'
const SPROUT_SOFT = '#E3F3C8'

type Kind =
  | 'sparkle'
  | 'sparkle-outline'
  | 'star'
  | 'heart'
  | 'tape-pink'
  | 'tape-green'
  | 'stitch'
  | 'button'
  | 'pencil'
  | 'dots'
  | 'bow'

const stroke = {
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function Tape({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 64 22">
      <path
        d="M3 0h58l3 3.7-3 3.6 3 3.7-3 3.7 3 3.6-3 3.7H3l-3-3.7 3-3.6-3-3.7 3-3.7-3-3.6z"
        fill={color}
        opacity={0.9}
      />
      <path
        d="M14 0v22M26 0v22M38 0v22M50 0v22"
        stroke="#fff"
        strokeOpacity={0.45}
        strokeWidth={1.2}
      />
    </svg>
  )
}

const SHAPES: Record<Kind, { width: number; node: ReactNode }> = {
  sparkle: {
    width: 26,
    node: (
      <svg viewBox="0 0 40 40">
        <path d="M20 3Q20 20 37 20Q20 20 20 37Q20 20 3 20Q20 20 20 3Z" fill={BUTTER} />
      </svg>
    ),
  },
  'sparkle-outline': {
    width: 22,
    node: (
      <svg viewBox="0 0 40 40">
        <path d="M20 4Q20 20 36 20Q20 20 20 36Q20 20 4 20Q20 20 20 4Z" stroke={RASPBERRY} {...stroke} />
      </svg>
    ),
  },
  star: {
    width: 28,
    node: (
      <svg viewBox="0 0 40 40">
        <path
          d="M20 5l3.8 10 10.5.4-8.1 6.6 2.8 10.2-9-5.9-9 5.9 2.8-10.2-8.1-6.6 10.5-.4z"
          stroke={RASPBERRY}
          {...stroke}
        />
      </svg>
    ),
  },
  heart: {
    width: 28,
    node: (
      <svg viewBox="0 0 40 40">
        <path
          d="M20 33C9 25 5 18 8.5 12.5 11.5 8 17 8.5 20 13c3-4.5 8.5-5 11.5-.5C35 18 31 25 20 33z"
          {...stroke}
          fill={BLUSH}
          stroke={RASPBERRY}
        />
      </svg>
    ),
  },
  'tape-pink': { width: 66, node: <Tape color={BLUSH_DEEP} /> },
  'tape-green': { width: 60, node: <Tape color={SPROUT_SOFT} /> },
  stitch: {
    width: 72,
    node: (
      <svg viewBox="0 0 72 40">
        <path
          d="M4 30C14 8 24 36 34 18S54 6 68 20"
          stroke={INK}
          strokeOpacity={0.55}
          strokeDasharray="3 5"
          {...stroke}
        />
      </svg>
    ),
  },
  button: {
    width: 28,
    node: (
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="14" fill={SPROUT_SOFT} stroke={SPROUT} strokeWidth={1.6} />
        <circle cx="20" cy="20" r="9.5" fill="none" stroke={SPROUT} strokeWidth={1} strokeDasharray="2 2.5" />
        <g fill={INK} fillOpacity={0.55}>
          <circle cx="16.8" cy="16.8" r="1.7" />
          <circle cx="23.2" cy="16.8" r="1.7" />
          <circle cx="16.8" cy="23.2" r="1.7" />
          <circle cx="23.2" cy="23.2" r="1.7" />
        </g>
      </svg>
    ),
  },
  pencil: {
    width: 30,
    node: (
      <svg viewBox="0 0 24 24">
        <path
          d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5zM15 5l4 4"
          stroke={INK}
          {...stroke}
          strokeWidth={1.3}
        />
      </svg>
    ),
  },
  dots: {
    width: 30,
    node: (
      <svg viewBox="0 0 40 40">
        <circle cx="10" cy="14" r="3" fill={RASPBERRY} fillOpacity={0.7} />
        <circle cx="24" cy="10" r="2.2" fill={BUTTER} />
        <circle cx="28" cy="26" r="3.2" fill={SPROUT} fillOpacity={0.8} />
      </svg>
    ),
  },
  bow: {
    width: 36,
    node: (
      <svg viewBox="0 0 40 40">
        <path
          d="M20 19c-7-8-13-6-12.5-.5S14 26 20 19zm0 0c7-8 13-6 12.5-.5S26 26 20 19z"
          {...stroke}
          fill={BLUSH}
          stroke={RASPBERRY}
        />
        <path d="M20 19l-5 13M20 19l5 13" stroke={RASPBERRY} {...stroke} />
        <circle cx="20" cy="19" r="2.2" fill={RASPBERRY} />
      </svg>
    ),
  },
}

const KINDS = Object.keys(SHAPES) as Kind[]

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Placed = {
  kind: Kind
  x: number
  y: number
  rotate: number
  duration: number
  delay: number
}

type Zone = { x: [number, number]; y: [number, number] }

/**
 * Desktop: side gutters beside the content column.
 * Mobile: around the polaroid at the top, then peeking in from the screen
 * edges — the copy spans almost the full width there.
 */
const ZONES: Record<'desktop' | 'mobile', Zone[]> = {
  desktop: [
    { x: [3, 22], y: [4, 88] },
    { x: [78, 97], y: [4, 88] },
  ],
  mobile: [
    { x: [5, 22], y: [3, 24] },
    { x: [78, 95], y: [3, 24] },
    { x: [0, 3], y: [30, 86] },
    { x: [97, 100], y: [30, 86] },
  ],
}

function layout(
  seed: number,
  count: number,
  variant: keyof typeof ZONES,
): Placed[] {
  const rand = mulberry32(seed)
  const kinds = [...KINDS].sort(() => rand() - 0.5)
  const zones = ZONES[variant]
  const placed: Placed[] = []

  for (let tries = 0; placed.length < count && tries < 800; tries++) {
    const zone = zones[placed.length % zones.length]!
    const x = zone.x[0] + rand() * (zone.x[1] - zone.x[0])
    const y = zone.y[0] + rand() * (zone.y[1] - zone.y[0])
    const crowded = placed.some(
      (p) => Math.abs(p.x - x) < 12 && Math.abs(p.y - y) < 12,
    )
    if (crowded) continue

    placed.push({
      kind: kinds[placed.length % kinds.length]!,
      x,
      y,
      rotate: Math.round(rand() * 50 - 25),
      duration: 7 + rand() * 5,
      delay: -rand() * 8,
    })
  }

  return placed
}

type ScrapbookDoodlesProps = {
  /** Change to reshuffle the figures. */
  seed?: number
  count?: number
  mobileCount?: number
  className?: string
}

export function ScrapbookDoodles({
  seed = 20250924,
  count = 16,
  mobileCount = 10,
  className,
}: ScrapbookDoodlesProps) {
  const items = useMemo(
    () => [
      ...layout(seed, count, 'desktop').map((p) => ({ ...p, only: 'max-sm:hidden' })),
      ...layout(seed + 1, mobileCount, 'mobile').map((p) => ({ ...p, only: 'sm:hidden' })),
    ],
    [seed, count, mobileCount],
  )

  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} aria-hidden>
      {items.map(({ kind, x, y, rotate, duration, delay, only }, i) => (
        <span
          key={`${kind}-${i}`}
          className={cn(
            'doodle block',
            kind.startsWith('sparkle') && 'doodle-twinkle',
            only,
          )}
          style={
            {
              left: `${x}%`,
              top: `${y}%`,
              width: SHAPES[kind].width,
              '--r': `${rotate}deg`,
              '--dur': `${duration}s`,
              '--delay': `${delay}s`,
            } as CSSProperties
          }
        >
          {SHAPES[kind].node}
        </span>
      ))}
    </div>
  )
}
