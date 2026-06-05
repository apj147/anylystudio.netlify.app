import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About April Johnson | Anyly Studio',
  description:
    'April Johnson is a fine artist based in Glen Flora, Wisconsin with 18+ years of professional practice. BFA, University of Florida 2007. AA, Miami Dade College 2005. Exhibiting since 2004.',
  keywords: [
    'April Johnson artist', 'April Johnson BFA', 'University of Florida art', 'Miami Dade College',
    'Wisconsin fine artist', 'Glen Flora Wisconsin', 'pet portrait artist', 'commissioned artwork',
  ],
  openGraph: {
    title: 'About April Johnson | Anyly Studio',
    description: 'Fine artist · BFA University of Florida 2007 · 18+ years · Glen Flora, Wisconsin.',
    url: 'https://anylystudio.com/about',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'April Johnson — Anyly Studio' }],
    type: 'profile',
  },
  alternates: { canonical: 'https://anylystudio.com/about' },
}

const credentials = [
  { label: 'Education', lines: ['BFA · University of Florida, 2007', 'AA · Miami Dade College, 2005'] },
  { label: 'Practice', lines: ['18+ years professional fine art', 'Acrylic · Oil · Watercolor · Mixed Media', 'Commissions & originals'] },
  { label: 'Exhibitions', lines: ['Exhibiting since 2004', 'Group & solo shows', 'Private collections nationwide'] },
  { label: 'Studio', lines: ['Glen Flora, Wisconsin', 'Ships worldwide', 'contact@anylystudio.com'] },
]

const practiceColumns = [
  {
    heading: 'Medium & Materials',
    body: 'April works primarily in acrylic and oil on canvas, with studies in watercolor, gouache, and mixed media. Each piece begins with thorough reference work and compositional sketches before paint touches the surface.',
  },
  {
    heading: 'Commission Process',
    body: 'Every commission begins with a consultation. April works closely with collectors to understand their vision, preferred palette, and intended space — then translates those inputs into a piece built to last generations.',
  },
  {
    heading: 'Collectors',
    body: 'April\'s work lives in private collections across the United States. Business clients receive formal invoicing and ACH payment options. For corporate or institutional inquiries, reach out at contact@anylystudio.com.',
  },
]

const timeline = [
  { year: '2004', event: 'First public exhibition' },
  { year: '2005', event: 'AA — Miami Dade College' },
  { year: '2007', event: 'BFA — University of Florida' },
  { year: '2010s', event: '18+ years continuous practice' },
  { year: '2026', event: 'Anyly Studio online' },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* ── SPLIT INTRO ── */}
      <section className="min-h-[92vh] grid md:grid-cols-[1fr_45%] relative overflow-hidden">

        {/* Left — text */}
        <div className="flex flex-col justify-end px-8 md:px-16 pt-28 pb-16 relative z-10">

          {/* Giant background letter */}
          <div
            className="absolute bottom-0 left-0 text-[20rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none"
            style={{ ...D, fontWeight: 300 }}
          >
            A
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <span className="h-px w-14 bg-[#C9A959]" />
              <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                The Artist
              </span>
            </div>

            <h1
              className="text-[clamp(4rem,10vw,8.5rem)] leading-[0.86] tracking-[-0.025em] text-[#F5F0E8] animate-fade-up delay-100"
              style={{ ...D, fontWeight: 300 }}
            >
              April<br />
              <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Johnson</em>
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-8 animate-fade-up delay-200">
              <span className="text-[#9A9080] text-sm" style={B}>Fine artist</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A959]/50" />
              <span className="text-[#9A9080] text-sm" style={B}>18+ years</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A959]/50" />
              <span className="text-[#9A9080] text-sm" style={B}>Glen Flora, Wisconsin</span>
            </div>

            <div className="flex gap-4 mt-10 animate-fade-up delay-300">
              <Link
                href="/commissions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
                style={{ ...B, fontWeight: 600 }}
              >
                Commission <ArrowRight size={11} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
                style={{ ...B, fontWeight: 500 }}
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Right — full-height portrait */}
        <div className="relative min-h-[50vh] md:min-h-full">
          <Image
            src="/about/april-johnson-studio.jpg"
            alt="April Johnson — artist, Glen Flora Wisconsin"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Gradient blend left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/10 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
        </div>
      </section>

      {/* ── BIO ── */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1fr] gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-[#C9A959]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                A Lifelong Practice
              </span>
            </div>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] mb-8 leading-tight"
              style={{ ...D, fontWeight: 400 }}
            >
              Where every mark<br />
              <em style={{ fontStyle: 'italic', color: '#C9A959' }}>is intentional</em>
            </h2>
          </div>
          <div>
            <div className="space-y-5 text-[#555] leading-relaxed text-sm" style={{ ...B, fontWeight: 300 }}>
              <p>
                April Johnson is a fine artist whose relationship with paint began long before
                her formal education. Growing up immersed in the natural landscapes of the
                American South and Midwest, she developed an eye for the quiet drama in
                everyday subjects — the way afternoon light falls on a dog&apos;s coat, the
                architectural precision of a fern frond, the mood of water at dusk.
              </p>
              <p>
                She earned her Associate of Arts from Miami Dade College in 2005 before
                completing her Bachelor of Fine Arts at the University of Florida in 2007.
                Her academic training grounded an already intuitive practice in compositional
                rigor, color theory, and the historical lineage of Western painting. She has
                exhibited continuously since 2004.
              </p>
              <p>
                Today April works from her studio in Glen Flora, Wisconsin, accepting
                commissions for pet portraits, botanical studies, landscapes, and large-scale
                statement pieces for residential and commercial spaces. Business clients and
                institutions are welcome — formal invoicing and ACH payment available via{' '}
                <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
                  contact@anylystudio.com
                </a>.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="mt-10 pl-5 border-l-2 border-[#C9A959]">
              <p
                className="text-xl text-[#1A1A1A] leading-relaxed"
                style={{ ...D, fontStyle: 'italic', fontWeight: 400 }}
              >
                &ldquo;The best commissions feel like collaborations.
                I want to paint what&apos;s already in your mind.&rdquo;
              </p>
              <cite className="block mt-3 text-[10px] tracking-[0.3em] uppercase text-[#C9A959] not-italic" style={{ ...B, fontWeight: 500 }}>
                — April Johnson
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ── */}
      <section className="py-20 px-6 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Credentials
            </span>
            <span className="h-px w-14 bg-[#C9A959]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#C9A959]/10">
            {credentials.map((c) => (
              <div key={c.label} className="px-8 py-2 first:pl-0 last:pr-0">
                <h3
                  className="text-[10px] tracking-[0.35em] uppercase text-[#C9A959] mb-5"
                  style={{ ...B, fontWeight: 500 }}
                >
                  {c.label}
                </h3>
                <ul className="space-y-2">
                  {c.lines.map((line) => (
                    <li
                      key={line}
                      className="text-[#9A9080] text-sm leading-relaxed"
                      style={{ ...B, fontWeight: 300 }}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE ── */}
      <section className="py-24 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] mb-16"
            style={{ ...D, fontWeight: 400 }}
          >
            The Practice
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {practiceColumns.map((col, i) => (
              <div
                key={col.heading}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="h-px w-10 bg-[#C9A959] mb-6" />
                <h3
                  className="text-xl text-[#1A1A1A] mb-4"
                  style={{ ...D, fontWeight: 600 }}
                >
                  {col.heading}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                  {col.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 px-6 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-16 justify-center">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Journey
            </span>
            <span className="h-px w-14 bg-[#C9A959]" />
          </div>

          <div className="relative">
            {/* Gold timeline line */}
            <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A959]/30 to-transparent hidden md:block" />

            <div className="space-y-0">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className={`relative flex items-center gap-8 py-8 animate-fade-up ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
                >
                  {/* Year side */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <p
                      className="text-[2.5rem] leading-none text-[#C9A959]/20"
                      style={{ ...D, fontWeight: 300 }}
                    >
                      {t.year}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full border-2 border-[#C9A959] bg-[#0D0D0D] shrink-0 relative z-10" />

                  {/* Event side */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <p className="text-[#F5F0E8] text-sm" style={{ ...B, fontWeight: 400 }}>
                      {t.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className="py-20 px-6 bg-[#141414] border-t border-[#C9A959]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] text-[#F5F0E8] mb-4 leading-tight"
            style={{ ...D, fontWeight: 400 }}
          >
            Work With April
          </h2>
          <p className="text-[#9A9080] mb-10 text-sm leading-relaxed max-w-md mx-auto" style={{ ...B, fontWeight: 300 }}>
            Ready to commission an original piece? View the portfolio or begin a
            commission inquiry. Business clients — invoicing and ACH available at{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              contact@anylystudio.com
            </a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/commissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Start a Commission <ArrowRight size={11} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 500 }}
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
