import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About April Johnson | Anyly Studio',
  description:
    'April Johnson is a fine artist based in Glen Flora, Wisconsin with 18+ years of professional practice. BFA, University of Florida 2007. AA, Miami Dade College 2005. Exhibiting since 2004.',
  keywords: [
    'April Johnson artist', 'April Johnson BFA', 'University of Florida art', 'Miami Dade College',
    'Wisconsin fine artist', 'Glen Flora Wisconsin', 'pet portrait artist', 'commissioned artwork',
    'botanical paintings', 'landscape artist', '18 years fine art',
  ],
  openGraph: {
    title: 'About April Johnson | Anyly Studio',
    description:
      'Fine artist with 18+ years of professional practice. BFA University of Florida 2007 · AA Miami Dade College 2005 · Exhibiting since 2004.',
    url: 'https://anylystudio.com/about',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'April Johnson — Anyly Studio' }],
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About April Johnson | Anyly Studio',
    description: 'Fine artist · BFA UF 2007 · 18+ years · Glen Flora, Wisconsin',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://anylystudio.com/about' },
}

const credentials = [
  {
    label: 'Education',
    items: ['BFA — University of Florida, 2007', 'AA — Miami Dade College, 2005'],
  },
  {
    label: 'Practice',
    items: ['18+ years professional fine art', 'Commissions, originals & reproductions', 'Acrylic · Oil · Watercolor · Mixed Media'],
  },
  {
    label: 'Exhibitions',
    items: ['Exhibiting since 2004', 'Group & solo shows', 'Private collections nationwide'],
  },
  {
    label: 'Studio',
    items: ['Glen Flora, Wisconsin', 'Ships worldwide', 'Online gallery: anylystudio.com'],
  },
]

const practiceColumns = [
  {
    heading: 'Medium & Materials',
    body:
      'April works primarily in acrylic and oil on canvas, with additional studies in watercolor, gouache, and mixed media. Each piece begins with thorough reference work and compositional sketches before paint touches the surface.',
  },
  {
    heading: 'Commission Process',
    body:
      'Every commission begins with a detailed consultation. April works closely with collectors to understand their vision, preferred palette, and intended space — then translates those inputs into a piece built to last generations.',
  },
  {
    heading: 'Collectors',
    body:
      'April\'s work lives in private collections across the United States. Business clients receive formal invoicing and ACH payment options. For corporate or institutional inquiries, contact contact@anylystudio.com.',
  },
]

const timeline = [
  { year: '2004', event: 'First public exhibition' },
  { year: '2005', event: 'AA — Miami Dade College' },
  { year: '2007', event: 'BFA — University of Florida' },
  { year: '2010s', event: '18+ years of continuous studio practice' },
  { year: '2026', event: 'Anyly Studio launches online' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950">

      {/* Hero */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-16 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              The Artist
            </span>
            <span className="h-px w-16 bg-[#C9A959]" />
          </div>
          <h1
            className="text-center text-[clamp(3rem,7vw,5.5rem)] leading-tight text-[#2C2C2C] dark:text-white animate-fade-up"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            April Johnson
          </h1>
          <p
            className="text-center text-[#888] mt-3 text-lg max-w-lg mx-auto animate-fade-up delay-100"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Fine artist · 18+ years · Glen Flora, Wisconsin
          </p>
        </div>
      </section>

      {/* Two-column bio */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Bio text */}
          <div className="animate-fade-up">
            <h2
              className="text-3xl text-[#2C2C2C] dark:text-white mb-6"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
            >
              A Lifelong Practice
            </h2>
            <div
              className="space-y-5 text-[#555] dark:text-neutral-300 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              <p>
                April Johnson is a self-described visual storyteller whose relationship with paint
                began long before her formal education. Growing up immersed in the natural landscapes
                of the American South and Midwest, she developed an eye for the quiet drama in
                everyday subjects — the particular way afternoon light falls on a dog&apos;s coat, the
                architectural precision of a fern frond, the mood of water at the edge of dusk.
              </p>
              <p>
                She earned her Associate of Arts from Miami Dade College in 2005 before completing
                her Bachelor of Fine Arts at the University of Florida in 2007. Her academic
                training grounded an already intuitive practice in compositional rigor, color theory,
                and the historical lineage of Western painting. She has exhibited continuously since
                2004.
              </p>
              <p>
                Today April works from her studio in Glen Flora, Wisconsin, accepting commissions
                for pet portraits, botanical studies, landscapes, and large-scale statement pieces
                for residential and commercial spaces. Each commission is treated as a long-term
                collaboration — her goal is not simply to deliver a painting but to create something
                the collector will regard as irreplaceable.
              </p>
              <p>
                Business clients and institutions are welcome. Formal invoicing and ACH payment
                available via{' '}
                <a
                  href="mailto:contact@anylystudio.com"
                  className="text-[#C9A959] hover:underline"
                >
                  contact@anylystudio.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Portrait */}
          <div className="animate-fade-up delay-200">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8D5A3]/40 shadow-xl">
              <Image
                src="/about/april-johnson-studio.jpg"
                alt="April Johnson in her studio — Glen Flora, Wisconsin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Fallback overlay if image missing */}
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                <p
                  className="text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300, letterSpacing: '0.1em' }}
                >
                  April Johnson · Glen Flora, Wisconsin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials grid */}
      <section className="py-16 px-6 bg-[#2C2C2C] dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Credentials
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((c) => (
              <div key={c.label} className="border border-[#C9A959]/30 rounded-xl p-6">
                <h3
                  className="text-[#C9A959] text-xs tracking-[0.25em] uppercase mb-4"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  {c.label}
                </h3>
                <ul className="space-y-2">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="text-neutral-300 text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three practice columns */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center text-[clamp(2rem,4vw,3rem)] text-[#2C2C2C] dark:text-white mb-14"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            The Practice
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {practiceColumns.map((col, i) => (
              <div
                key={col.heading}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="h-px w-10 bg-[#C9A959] mb-5" />
                <h3
                  className="text-xl text-[#2C2C2C] dark:text-white mb-4"
                  style={{ fontFamily: 'var(--font-display), serif', fontWeight: 600 }}
                >
                  {col.heading}
                </h3>
                <p
                  className="text-[#666] dark:text-neutral-400 leading-relaxed text-sm"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {col.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-[#FAF7F2] dark:bg-neutral-900 border-y border-[#E8D5A3]/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Journey
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-[#C9A959]/30 hidden md:block" />

            <div className="grid md:grid-cols-5 gap-8 relative z-10">
              {timeline.map((t, i) => (
                <div key={t.year} className="flex flex-col items-center text-center md:items-center">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-[#C9A959] bg-[#FAF7F2] dark:bg-neutral-900 flex items-center justify-center mb-3 text-[#C9A959] shrink-0"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.65rem' }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-[#C9A959] text-xs tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                  >
                    {t.year}
                  </p>
                  <p
                    className="text-[#555] dark:text-neutral-400 text-xs leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                  >
                    {t.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-20 px-6 bg-[#2C2C2C] dark:bg-neutral-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-[clamp(2rem,4vw,3rem)] text-white mb-4"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            Work With April
          </h2>
          <p
            className="text-neutral-400 mb-8 text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Ready to commission an original piece? View the portfolio or start a commission inquiry.
            Business clients — invoicing and ACH available at{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              contact@anylystudio.com
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/commissions"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#C9A959] hover:bg-[#B8944A] text-white text-sm tracking-widest uppercase transition-colors rounded-md"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Start a Commission
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#C9A959]/60 hover:border-[#C9A959] text-[#C9A959] text-sm tracking-widest uppercase transition-colors rounded-md"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
