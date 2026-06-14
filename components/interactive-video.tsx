'use client'

/*
 * InteractiveVideo — a living painting that moves ONLY while you touch it.
 *
 * At rest it's a still frame (poster). Hover (desktop) or press-and-hold
 * (touch) and the painting comes alive; release / move away and it freezes
 * on the current frame. No autoplay — motion is tied to the viewer's hand,
 * which is what makes it interactive. A soft "hold to bring it alive" hint
 * fades out while playing.
 */

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster?: string
  title: string
  caption?: string
  aspect?: 'square' | 'portrait'
  badge?: string
}

export function InteractiveVideo({ src, poster, title, caption, aspect = 'portrait', badge }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    const v = videoRef.current
    if (!v) return
    v.play().then(() => setPlaying(true)).catch(() => {})
  }
  const pause = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    setPlaying(false)
  }

  // If the finger lifts (or pointer is cancelled) anywhere, freeze.
  useEffect(() => {
    const stop = () => pause()
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    return () => {
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
    }
  }, [])

  const ratio = aspect === 'square' ? '1 / 1' : '9 / 16'

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden touch-none select-none cursor-pointer"
        style={{
          width: 'min(88vw, 460px)',
          aspectRatio: ratio,
          boxShadow: '0 40px 90px -30px rgba(0,0,0,.8), 0 0 0 12px #1a1a1a, 0 0 0 14px #caa85f',
        }}
        onPointerEnter={play}
        onPointerDown={(e) => { e.preventDefault(); play() }}
        onPointerLeave={pause}
        onPointerUp={pause}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* still-state hint + faint vignette so it reads as a paused painting */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: 'radial-gradient(80% 60% at 50% 50%, transparent 55%, rgba(0,0,0,0.28))' }}
        >
          <span className="rounded-full bg-black/55 backdrop-blur-sm px-4 py-2 text-[11px] tracking-widest uppercase text-amber-100">
            {badge ?? 'Hold to bring it alive'} ✦
          </span>
        </div>
      </div>
      <div className="mt-7 text-center max-w-md">
        <h3 className="text-2xl text-amber-50" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>{title}</h3>
        {caption && <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{caption}</p>}
        <p className="mt-3 text-xs text-amber-500/80">Touch &amp; hold — or hover — and the painting comes alive. Let go, and it rests.</p>
      </div>
    </div>
  )
}
