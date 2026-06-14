import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { LivingArtwork } from '@/components/living-artwork'
import { RippleArtwork } from '@/components/ripple-artwork'

export const metadata: Metadata = {
  title: 'The Living Gallery | Anyly Studio',
  description:
    'Where April Johnson’s paintings breathe. An interactive gallery of living artworks — move, tilt, and watch the canvas come alive.',
  openGraph: {
    title: 'The Living Gallery | Anyly Studio',
    description: 'April Johnson’s paintings, brought to life. Move and watch the canvas breathe.',
    url: 'https://anylystudio.com/living',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Living Gallery — Anyly Studio' }],
    type: 'website',
  },
  alternates: { canonical: 'https://anylystudio.com/living' },
}

export default function LivingGalleryPage() {
  return (
    <main className="bg-neutral-950 text-neutral-100 min-h-screen overflow-hidden">
      {/* Ambient hero */}
      <section className="relative px-6 pt-20 pb-10 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(201,169,89,0.18), transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-amber-400/90 mb-6">
            <Sparkles size={14} /> The Living Gallery
          </p>
          <h1
            className="text-5xl sm:text-6xl leading-[1.05] text-amber-50"
            style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
          >
            Paintings that breathe
          </h1>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Every Anyly Studio piece begins as oil and canvas. Here, a few of them wake up.
            Move your cursor across the frame — or tilt your phone — and watch the light shift,
            the air drift, and the brushwork stir. Still a painting. Just alive.
          </p>
        </div>
      </section>

      {/* Centerpiece living artwork */}
      <section className="relative px-6 py-12">
        <LivingArtwork
          videoSrc="/living/forest-alive.mp4"
          poster="/gallery/1.png"
          title="Golden Hour, Northwoods"
          caption="Oil on canvas, brought to life. The same birch path you'd hang on your wall — here it keeps the sun moving through the trees."
        />
      </section>

      {/* Touch-reactive painting */}
      <section className="relative px-6 py-16 border-t border-neutral-900">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-amber-400/90 mb-4">
            <Sparkles size={14} /> Reach in
          </p>
          <h2 className="text-4xl sm:text-5xl text-amber-50 leading-tight" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>
            Touch the painting
          </h2>
          <p className="mt-5 text-neutral-400 leading-relaxed">
            This one answers back. Drag your finger or cursor across the canvas and the surface
            ripples like a disturbed reflection — and leaves shake loose and fall wherever you press.
          </p>
        </div>
        <RippleArtwork
          imageSrc="/gallery/1.png"
          title="Northwoods, disturbed"
          caption="The same forest — but now the paint moves under your hand."
        />
      </section>

      {/* How it works */}
      <section className="relative px-6 py-16 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {[
            { n: '01', t: 'A real painting', d: 'It starts as an original April Johnson work — acrylic and oil, by hand, in Glen Flora.' },
            { n: '02', t: 'Brought to life', d: 'The captured canvas is animated so the light, air, and texture move — without losing a single brushstroke.' },
            { n: '03', t: 'Yours to own', d: 'Love the living version? The original — or a fine-art print — can hang in your home. Commissions welcome.' },
          ].map((s) => (
            <div key={s.n}>
              <div className="text-amber-500/70 text-sm tracking-widest mb-3">{s.n}</div>
              <h4 className="text-lg text-amber-50 mb-2" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>{s.t}</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(201,169,89,0.15), transparent 70%)' }}
        />
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-3xl text-amber-50 mb-4" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>
            Want your own living piece?
          </h2>
          <p className="text-neutral-400 mb-8">
            Commission an original, then receive a living version of it to share — a one-of-a-kind
            way to show the world the art on your wall.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-6 py-3 transition-colors">
              Commission a Piece <ArrowRight size={16} />
            </Link>
            <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-neutral-700 hover:border-amber-500 px-6 py-3 text-neutral-200 transition-colors">
              Browse the Gallery
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
