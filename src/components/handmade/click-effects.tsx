import { useEffect, useRef } from 'react'

type ClickEffectsProps = {
  color?: string
  effectSize?: number
  duration?: number
  className?: string
}

/** Particle burst on click — pass the client accent color. */
export default function ClickEffects({
  color = '#0f6b5c',
  effectSize = 80,
  duration = 0.4,
  className = '',
}: ClickEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    type Particle = {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      max: number
      r: number
    }

    const particles: Particle[] = []
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (x: number, y: number) => {
      const count = 16
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35
        const speed = 1.4 + Math.random() * (effectSize / 45)
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          max: duration,
          r: 1.5 + Math.random() * 2,
        })
      }
    }

    const onClick = (e: MouseEvent) => {
      spawn(e.clientX, e.clientY)
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.96
        p.vy *= 0.96
        p.life -= 1 / 60 / p.max
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
    }
  }, [color, duration, effectSize])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
