'use client'

/*
 * LivingArtwork — an interactive "living painting".
 *
 * A still painting (poster) that breathes: a looping video plays inside an
 * ornate gold frame, the frame tilts in 3D to follow the cursor (or device
 * tilt on phones), a cursor spotlight glides across the canvas, and gold dust
 * motes drift through the air. A "Bring to life / Still" toggle lets the
 * viewer witness the static piece wake up. Respects prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from 'react'

type Props = {
  videoSrc: string
  poster: string
  title: string
  caption?: string
  className?: string
}

export function LivingArtwork({ videoSrc, poster, title, caption, className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const [alive, setAlive] = useState(true)
  const [loaded, setLoaded] = useState(false)

  // 3D tilt — follows cursor on desktop, device orientation on phones
  useEffect(() => {
    const card = cardRef.current
    const wrap = wrapRef.current
    const spot = spotRef.current
    if (!card || !wrap) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let raf = 0
    let tx = 0, ty = 0, cx = 0, cy = 0 // target + current

    const render = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      card.style.transform = `rotateY(${cx}deg) rotateX(${-cy}deg)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width // 0..1
      const py = (e.clientY - r.top) / r.height
      tx = (px - 0.5) * 16
      ty = (py - 0.5) * 16
      if (spot) {
        spot.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,243,204,0.35), transparent 55%)`
      }
    }
    const onLeave = () => { tx = 0; ty = 0; if (spot) spot.style.background = 'transparent' }
    const onTilt = (e: DeviceOrientationEvent) => {
      tx = Math.max(-12, Math.min(12, (e.gamma ?? 0) / 3))
      ty = Math.max(-12, Math.min(12, ((e.beta ?? 0) - 45) / 3))
    }

    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    window.addEventListener('deviceorientation', onTilt)
    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [])

  // Gold dust motes drifting over the frame
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0
    const resize = () => {
      const r = wrap.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const N = 46
    const motes = Array.from({ length: N }, (_, i) => ({
      x: (i * 97.13) % 1, y: (i * 53.7) % 1, // deterministic seeds (no Math.random at init)
      r: 0.6 + ((i * 7) % 10) / 7,
      vy: 0.04 + ((i * 13) % 10) / 240,
      vx: ((i % 5) - 2) / 900,
      ph: (i * 0.7) % (Math.PI * 2),
    }))

    let raf = 0, t = 0
    const tick = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        m.y -= m.vy * 0.01
        m.x += m.vx + Math.sin(t + m.ph) * 0.0006
        if (m.y < -0.05) { m.y = 1.05; m.x = (m.x + 0.37) % 1 }
        const tw = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.6 + m.ph))
        const px = m.x * w, py = m.y * h
        const g = ctx.createRadialGradient(px, py, 0, px, py, m.r * 4)
        g.addColorStop(0, `rgba(255,240,200,${0.85 * tw})`)
        g.addColorStop(1, 'rgba(255,240,200,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(px, py, m.r * 4, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (alive) { v.pause() } else { v.play().catch(() => {}) }
    setAlive(!alive)
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={wrapRef}
        className="relative"
        style={{ perspective: '1200px', width: 'min(90vw, 540px)' }}
      >
        <div
          ref={cardRef}
          className="relative rounded-sm transition-shadow duration-500"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            padding: '18px',
            background: 'linear-gradient(135deg,#3a2c12,#caa85f 18%,#f4e3b0 30%,#a8843a 52%,#6b4f1e 70%,#e8d5a3 88%,#2c2008)',
            boxShadow: '0 40px 80px -30px rgba(0,0,0,.7), 0 0 0 1px rgba(0,0,0,.3) inset',
          }}
        >
          {/* inner mat */}
          <div className="relative overflow-hidden bg-black" style={{ boxShadow: '0 0 30px rgba(0,0,0,.6) inset' }}>
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setLoaded(true)}
              className="block w-full h-auto"
              style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
            />
            {/* cursor spotlight */}
            <div ref={spotRef} className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-[background] duration-200" />
            {/* gold dust */}
            <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
            {/* subtle vignette + glass sheen */}
            <div className="pointer-events-none absolute inset-0" style={{ boxShadow: '0 0 120px rgba(0,0,0,.55) inset' }} />
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,.18) 48%, transparent 56%)' }} />

            {/* living badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-sm px-3 py-1 text-[11px] tracking-widest uppercase text-amber-100">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${alive ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-400'}`} />
              {alive ? 'Living Artwork' : 'Still'}
            </div>
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center text-amber-100/70 text-sm">Waking the canvas…</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-7 text-center max-w-md">
        <h3 className="text-2xl text-charcoal dark:text-amber-100" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>
          {title}
        </h3>
        {caption && <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{caption}</p>}
        <button
          onClick={toggle}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-500 px-5 py-2 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white transition-colors"
        >
          {alive ? '❚❚  Hold still' : '✦  Bring it to life'}
        </button>
      </div>
    </div>
  )
}
