'use client'

/*
 * RevealArtwork — Viktor Oddy's cursor-spotlight reveal, adapted for fine art.
 *
 * Two pixel-aligned images of the same painting are stacked. The BASE shows
 * normally; the REVEAL image is masked to a soft glowing circle that trails
 * the cursor / finger (eased lerp), so moving your hand "uncovers" the hidden
 * version underneath. Pure React + canvas mask — no libraries.
 *
 * No React state: the mask + hint are driven imperatively via refs in a rAF
 * loop, so nothing re-renders and clobbers the mask. Mechanic per the
 * fable5-animated-websites skill (radial-gradient mask, eased lerp 0.12).
 */

import { useEffect, useRef } from 'react'

type Props = {
  baseSrc: string
  revealSrc: string
  title: string
  caption?: string
  radius?: number
  aspect?: 'square' | 'portrait'
}

// 1×1 transparent GIF — initial mask so the reveal layer starts fully hidden.
const TRANSPARENT =
  'url("data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")'

export function RevealArtwork({ baseSrc, revealSrc, title, caption, radius = 200, aspect = 'square' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement>(null)
  const raw = useRef({ x: -9999, y: -9999 })
  const smooth = useRef({ x: -9999, y: -9999 })
  const active = useRef(false)
  const curR = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const revealDiv = revealRef.current
    const canvas = maskCanvasRef.current
    if (!wrap || !revealDiv || !canvas) return
    const ctx = canvas.getContext('2d')!

    const size = () => {
      const r = wrap.getBoundingClientRect()
      canvas.width = Math.max(2, Math.round(r.width))
      canvas.height = Math.max(2, Math.round(r.height))
    }
    size()
    const ro = new ResizeObserver(size); ro.observe(wrap)

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      raw.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      active.current = true
      if (badgeRef.current) badgeRef.current.style.opacity = '0'
    }
    const onLeave = () => { active.current = false }
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerdown', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('pointerup', onLeave)

    let raf = 0
    const loop = () => {
      smooth.current.x += (raw.current.x - smooth.current.x) * 0.12
      smooth.current.y += (raw.current.y - smooth.current.y) * 0.12

      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const target = active.current ? radius : 0
      curR.current += (target - curR.current) * 0.15

      if (curR.current > 1) {
        const x = smooth.current.x, y = smooth.current.y
        const g = ctx.createRadialGradient(x, y, 0, x, y, curR.current)
        g.addColorStop(0, 'rgba(255,255,255,1)')
        g.addColorStop(0.4, 'rgba(255,255,255,1)')
        g.addColorStop(0.6, 'rgba(255,255,255,0.75)')
        g.addColorStop(0.85, 'rgba(255,255,255,0.12)')
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, curR.current, 0, Math.PI * 2); ctx.fill()
      }

      const url = `url(${canvas.toDataURL()})`
      revealDiv.style.webkitMaskImage = url
      revealDiv.style.maskImage = url

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerdown', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.removeEventListener('pointerup', onLeave)
    }
  }, [radius])

  const ratio = aspect === 'square' ? '1 / 1' : '9 / 16'

  return (
    <div className="flex flex-col items-center">
      <div
        ref={wrapRef}
        className="relative overflow-hidden touch-none select-none cursor-crosshair"
        style={{
          width: 'min(88vw, 460px)', aspectRatio: ratio,
          boxShadow: '0 40px 90px -30px rgba(0,0,0,.8), 0 0 0 12px #1a1a1a, 0 0 0 14px #caa85f',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={baseSrc} alt={title} draggable={false} className="absolute inset-0 w-full h-full object-cover" />
        <div
          ref={revealRef}
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${revealSrc})`,
            WebkitMaskImage: TRANSPARENT, maskImage: TRANSPARENT,
            WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
          }}
        />
        <canvas ref={maskCanvasRef} className="hidden" />
        <div
          ref={badgeRef}
          className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/45 backdrop-blur-sm px-3 py-1 text-[11px] tracking-widest uppercase text-amber-100 transition-opacity duration-500"
        >
          ✦ Move your light across it
        </div>
      </div>
      <div className="mt-7 text-center max-w-md">
        <h3 className="text-2xl text-amber-50" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>{title}</h3>
        {caption && <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{caption}</p>}
        <p className="mt-3 text-xs text-amber-500/80">Move your cursor or finger across the painting — your light reveals the same forest after dark.</p>
      </div>
    </div>
  )
}
