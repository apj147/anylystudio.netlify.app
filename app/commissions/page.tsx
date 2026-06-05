import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Commission an Original Work | Anyly Studio',
  description:
    'Commission a custom original painting from April Johnson — pet portraits, botanicals, landscapes, and large-scale pieces. Secure your slot with a $150 deposit.',
  keywords: [
    'commission original painting', 'custom artwork commission', 'pet portrait commission',
    'April Johnson commissions', 'Wisconsin artist commission', 'buy original art',
    'custom painting deposit',
  ],
  openGraph: {
    title: 'Commission an Original Work | Anyly Studio',
    description:
      'Commission a custom painting from April Johnson. Pet portraits, botanicals, landscapes & large-scale pieces. Deposit to secure your slot.',
    url: 'https://anylystudio.com/commissions',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio — Commission Original Artwork' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commission an Original Work | Anyly Studio',
    description: 'Custom paintings by April Johnson. Secure your slot with a $150 deposit.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://anylystudio.com/commissions' },
}

const steps = [
  {
    n: '01',
    title: 'Submit Inquiry & Reserve Slot',
    body: 'Complete the commission inquiry form and pay the $150 non-refundable deposit to secure your place in the queue.',
  },
  {
    n: '02',
    title: 'Sign Commission Agreement',
    body: 'You\'ll receive a commission agreement outlining scope, timeline, medium, and delivery terms. Work begins only after your signature.',
  },
  {
    n: '03',
    title: 'Submit Reference Photos',
    body: 'Send your reference images, preferred size, color notes, and any compositional preferences. The more detail, the better the outcome.',
  },
  {
    n: '04',
    title: 'April Paints — Progress Updates',
    body: 'April works through the piece in stages and sends you progress photos for review. Revisions are addressed before the final layer.',
  },
  {
    n: '05',
    title: 'Final Piece Ships',
    body: 'Your finished painting ships carefully packed with a certificate of authenticity, care card, and signed documentation.',
  },
]

const products = [
  {
    tag: 'Reserve Your Slot',
    title: 'Custom Commission Deposit',
    price: '$150',
    priceNote: 'Non-refundable · Holds your slot',
    description:
      'Secure your place in the commission queue. This deposit is applied toward your total balance and confirms your intent to commission an original work. Non-refundable per commission policy.',
    cta: 'Pay Deposit & Reserve Slot',
    href: 'https://whop.com/anyly-studio/',
    highlight: true,
  },
  {
    tag: 'Full Commission',
    title: '16 × 20 Pet Portrait',
    price: 'Starting at $350',
    priceNote: 'Acrylic on canvas · Certificate of authenticity',
    description:
      'A hand-painted 16 × 20 pet portrait in acrylic on gallery-wrapped canvas. Includes progress updates, certificate of authenticity, and worldwide shipping.',
    cta: 'Begin Commission',
    href: 'https://whop.com/anyly-studio/',
    highlight: false,
  },
]

const faqs = [
  {
    q: 'How long does a commission take?',
    a: 'Most pieces deliver within 60–120 days depending on complexity and current slot availability.',
  },
  {
    q: 'Do you work with business clients?',
    a: 'Yes. Formal invoicing and ACH payment available. Email contact@anylystudio.com.',
  },
  {
    q: 'What do I need to provide?',
    a: 'Reference photos, preferred size and medium, and a signed commission agreement before work begins.',
  },
  {
    q: 'Is the deposit refundable?',
    a: 'No. The deposit is non-refundable per our commission policy. Review full terms at /terms.',
  },
]

export default function CommissionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950">

      {/* Hero */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-16 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Original Works
            </span>
            <span className="h-px w-16 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(2.5rem,6vw,5rem)] leading-tight text-[#2C2C2C] dark:text-white animate-fade-up"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            Commission an Original Work
          </h1>
          <p
            className="text-[#888] dark:text-neutral-400 mt-4 text-lg max-w-xl mx-auto animate-fade-up delay-100"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Every piece is painted by hand, built around your vision, and delivered with
            a certificate of authenticity.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-16 px-6 bg-white dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              How It Works
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>

          <div className="space-y-0 divide-y divide-[#E8D5A3]/50 dark:divide-neutral-800">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="flex gap-8 py-8 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div
                  className="shrink-0 text-[#C9A959] leading-none mt-1"
                  style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400, fontSize: '2.5rem' }}
                >
                  {step.n}
                </div>
                <div>
                  <h3
                    className="text-xl text-[#2C2C2C] dark:text-white mb-2"
                    style={{ fontFamily: 'var(--font-display), serif', fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[#666] dark:text-neutral-400 text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Get Started
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((p) => (
              <div
                key={p.title}
                className={`rounded-2xl border p-8 flex flex-col ${
                  p.highlight
                    ? 'border-[#C9A959] bg-[#2C2C2C] dark:bg-neutral-900'
                    : 'border-[#E8D5A3]/60 bg-white dark:bg-neutral-900'
                }`}
              >
                <span
                  className={`text-xs tracking-[0.25em] uppercase mb-4 ${
                    p.highlight ? 'text-[#C9A959]' : 'text-[#8B9A7D]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  {p.tag}
                </span>
                <h3
                  className={`text-2xl mb-1 ${
                    p.highlight ? 'text-white' : 'text-[#2C2C2C] dark:text-white'
                  }`}
                  style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-[#C9A959] text-xl font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {p.price}
                </p>
                <p
                  className={`text-xs mb-6 ${
                    p.highlight ? 'text-neutral-400' : 'text-[#999]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {p.priceNote}
                </p>
                <p
                  className={`text-sm leading-relaxed mb-8 flex-1 ${
                    p.highlight ? 'text-neutral-300' : 'text-[#666] dark:text-neutral-400'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {p.description}
                </p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-6 py-3 text-sm tracking-widest uppercase rounded-md transition-colors ${
                    p.highlight
                      ? 'bg-[#C9A959] hover:bg-[#B8944A] text-white'
                      : 'border border-[#C9A959] text-[#C9A959] hover:bg-[#C9A959]/10'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white dark:bg-neutral-900 border-t border-[#E8D5A3]/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              FAQ
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>

          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-[#E8D5A3]/50 pb-8 last:border-0 last:pb-0">
                <h4
                  className="text-lg text-[#2C2C2C] dark:text-white mb-3"
                  style={{ fontFamily: 'var(--font-display), serif', fontWeight: 600 }}
                >
                  {faq.q}
                </h4>
                <p
                  className="text-[#666] dark:text-neutral-400 text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 px-6 bg-[#2C2C2C] dark:bg-neutral-950 text-center">
        <div className="max-w-2xl mx-auto">
          <p
            className="text-neutral-400 text-sm leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            All commissions require a signed agreement. Work begins only after agreement is received.{' '}
            <Link href="/terms" className="text-[#C9A959] hover:underline">
              Review full commission terms →
            </Link>
          </p>
        </div>
      </section>

    </div>
  )
}
