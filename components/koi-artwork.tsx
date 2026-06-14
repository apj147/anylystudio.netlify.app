'use client'

/*
 * KoiArtwork — golden koi that swim around your finger.
 *
 * Over a painting of a woman touching a pond, a school of luminous koi swim in
 * the water. They orbit a target point in lazy circles; move the cursor / drag
 * a finger across the water and the school follows, circling wherever you
 * point. A glowing golden ripple blooms from each touch, echoing the painting.
 * Pure canvas — no libraries. Respects prefers-reduced-motion (static image).
 */

import { useEffect, useRef } from 'react'

type Props = {
  imageSrc: string
  videoSrc?: string
  title: string
  caption?: string
}

type Fish = {
  x: number; y: number; vx: number; vy: number
  R: number; dir: number; speed: number; size: number; phase: number; hue: number
}
type Ripple = { x: number; y: number; r: number; life: number }

export function KoiArtwork({ imageSrc, videoSrc, title, caption }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0
    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = r.width; H = r.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(wrap)

    // water occupies the lower portion of the painting
    const waterTop = () => H * 0.30
    const defaultTarget = () => ({ x: W * 0.5, y: H * 0.58 })

    const N = reduce ? 0 : 14
    const fish: Fish[] = Array.from({ length: N }, (_, i) => ({
      x: W * (0.2 + ((i * 37) % 60) / 100),
      y: H * (0.45 + ((i * 23) % 45) / 100),
      vx: 0, vy: 0,
      R: 42 + (i % 5) * 22,
      dir: i % 2 === 0 ? 1 : -1,
      speed: 1.5 + ((i * 7) % 10) / 12,
      size: 13 + ((i * 11) % 9),
      phase: (i * 0.9) % (Math.PI * 2),
      hue: 36 + ((i * 13) % 18),
    }))

    const ripples: Ripple[] = []
    let pointer = { x: 0, y: 0, active: false, t: -9999 }

    const drawFish = (f: Fish, t: number) => {
      const ang = Math.atan2(f.vy, f.vx)
      const wig = Math.sin(t * 6 + f.phase) * 0.35
      ctx.save()
      ctx.translate(f.x, f.y)
      ctx.rotate(ang)
      ctx.shadowColor = `hsla(${f.hue},90%,55%,0.9)`
      ctx.shadowBlur = 14
      // body
      const grad = ctx.createLinearGradient(-f.size, 0, f.size, 0)
      grad.addColorStop(0, `hsl(${f.hue},85%,42%)`)
      grad.addColorStop(0.5, `hsl(${f.hue + 8},95%,60%)`)
      grad.addColorStop(1, `hsl(${f.hue + 14},98%,72%)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, f.size, f.size * 0.42, 0, 0, Math.PI * 2)
      ctx.fill()
      // tail (wiggles)
      ctx.save()
      ctx.translate(-f.size * 0.9, 0)
      ctx.rotate(wig)
      ctx.fillStyle = `hsla(${f.hue + 10},95%,65%,0.92)`
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-f.size * 0.9, -f.size * 0.5)
      ctx.lineTo(-f.size * 0.7, 0)
      ctx.lineTo(-f.size * 0.9, f.size * 0.5)
      ctx.closePath(); ctx.fill()
      ctx.restore()
      // side fins
      ctx.fillStyle = `hsla(${f.hue + 6},95%,68%,0.6)`
      ctx.beginPath()
      ctx.ellipse(f.size * 0.1, f.size * 0.32, f.size * 0.4, f.size * 0.16, 0.6 + wig, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    let raf = 0, t = 0
    const loop = () => {
      t += 0.016
      ctx.clearRect(0, 0, W, H)

      const pActive = pointer.active && t - pointer.t < 0.4 && pointer.y > waterTop()
      const dt = pActive ? pointer : defaultTarget()
      const tx = dt.x, ty = dt.y

      // golden ripple at the default fingertip (gentle) + at touches
      if (!pActive && Math.sin(t * 1.3) > 0.985) ripples.push({ x: tx, y: ty, r: 4, life: 1 })

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += 1.6; rp.life -= 0.012
        if (rp.life <= 0) { ripples.splice(i, 1); continue }
        ctx.save()
        ctx.globalAlpha = Math.max(0, rp.life) * 0.7
        ctx.strokeStyle = 'rgba(255,224,150,0.9)'
        ctx.lineWidth = 1.4
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
        // sparkle dots
        for (let s = 0; s < 6; s++) {
          const a = (s / 6) * Math.PI * 2 + rp.r * 0.05
          ctx.fillStyle = `rgba(255,238,180,${Math.max(0, rp.life) * 0.8})`
          ctx.beginPath()
          ctx.arc(rp.x + Math.cos(a) * rp.r, rp.y + Math.sin(a) * rp.r, 1.1, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      for (const f of fish) {
        let dx = f.x - tx, dy = f.y - ty
        let dist = Math.hypot(dx, dy) || 0.001
        // tangential (circling) + radial correction toward orbit radius R
        const tangx = (-dy / dist) * f.dir
        const tangy = (dx / dist) * f.dir
        const radial = dist - f.R
        const radx = (-dx / dist) * radial * 0.05
        const rady = (-dy / dist) * radial * 0.05
        const dvx = tangx * f.speed + radx
        const dvy = tangy * f.speed + rady
        const steer = pActive ? 0.08 : 0.045
        f.vx += (dvx - f.vx) * steer
        f.vy += (dvy - f.vy) * steer
        f.x += f.vx; f.y += f.vy

        // keep fish in the water band
        const top = waterTop() + f.size
        if (f.y < top) { f.y = top; f.vy += 0.4 }
        if (f.y > H - f.size) { f.y = H - f.size; f.vy -= 0.4 }
        if (f.x < f.size) { f.x = f.size; f.vx += 0.4 }
        if (f.x > W - f.size) { f.x = W - f.size; f.vx -= 0.4 }

        drawFish(f, t)
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const at = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top, active: true, t }
    }
    const onMove = (e: PointerEvent) => { at(e) }
    const onDown = (e: PointerEvent) => {
      at(e)
      const r = wrap.getBoundingClientRect()
      const y = e.clientY - r.top
      if (y > waterTop()) ripples.push({ x: e.clientX - r.left, y, r: 4, life: 1 })
    }
    const onLeave = () => { pointer.active = false }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerdown', onDown)
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerdown', onDown)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div
        ref={wrapRef}
        className="relative touch-none cursor-pointer select-none rounded-sm overflow-hidden"
        style={{
          width: 'min(88vw, 460px)', aspectRatio: '2 / 3',
          boxShadow: '0 40px 90px -30px rgba(0,0,0,.8), 0 0 0 12px #1a1a1a, 0 0 0 14px #caa85f',
        }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={imageSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={imageSrc} alt={title} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        )}
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/45 backdrop-blur-sm px-3 py-1 text-[11px] tracking-widest uppercase text-amber-100">
          ✦ Point into the water
        </div>
      </div>
      <div className="mt-7 text-center max-w-md">
        <h3 className="text-2xl text-amber-50" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>{title}</h3>
        {caption && <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{caption}</p>}
        <p className="mt-3 text-xs text-amber-500/80">Move your finger across the water — the koi follow, circling where you point.</p>
      </div>
    </div>
  )
}
