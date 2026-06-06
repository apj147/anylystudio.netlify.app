import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commission an Original Work | Anyly Studio',
  description:
    'Commission a custom original painting from April Johnson — pet portraits, botanicals, landscapes, and large-scale pieces. Secure your slot with a $150 deposit.',
  openGraph: {
    title: 'Commission an Original Work | Anyly Studio',
    description: 'Custom paintings by April Johnson. Deposit to secure your slot. Ships worldwide.',
    url: 'https://anylystudio.com/commissions',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio Commissions' }],
    type: 'website',
  },
  alternates: { canonical: 'https://anylystudio.com/commissions' },
}

const steps = [
  { n: '01', title: 'Submit Inquiry & Reserve Slot', body: 'Complete the commission inquiry and pay the $150 non-refundable deposit to secure your place in the queue.' },
  { n: '02', title: 'Sign Commission Agreement', body: 'You\'ll receive an agreement outlining scope, timeline, medium, and delivery terms. Work begins only after your signature.' },
  { n: '03', title: 'Submit Reference Photos', body: 'Send reference images, preferred size, color notes, and any compositional preferences. The more detail, the better the result.' },
  { n: '04', title: 'April Paints — Progress Updates', body: 'April works through the piece in stages and sends progress photos for review. Revisions addressed before the final layer.' },
  { n: '05', title: 'Final Piece Ships', body: 'Your finished painting ships carefully packaged with a certificate of authenticity, care card, and signed documentation.' },
]

const faqs = [
  { q: 'How long does a commission take?', a: 'Most pieces deliver within 60–120 days depending on complexity and current slot availability.' },
  { q: 'Do you work with business clients?', a: 'Yes. Formal invoicing and ACH payment available. Email contact@anylystudio.com.' },
  { q: 'What do I need to provide?', a: 'Reference photos, preferred size and medium, and a signed commission agreement before work begins.' },
  { q: 'Is the deposit refundable?', a: 'No. The deposit is non-refundable per our commission policy. Review full terms at /terms.' },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function CommissionsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">

        {/* Giant watermark */}
        <div
          className="absolute right-0 bottom-0 text-[18rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none"
          style={{ ...D, fontWeight: 300 }}
        >
          Commission
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] rounded-full bg-[#C9A959]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative text-center">

          {/* Slot availability banner */}
          {process.env.NEXT_PUBLIC_SLOTS_OPEN && (
            <div className="inline-flex items-center gap-2 border border-[#8B9A7D]/40 bg-[#8B9A7D]/10 rounded-full px-4 py-2 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-[#8B9A7D] animate-pulse" />
              <span className="text-[#8B9A7D] text-[10px] tracking-[0.25em] uppercase" style={{ ...B, fontWeight: 500 }}>
                {process.env.NEXT_PUBLIC_SLOTS_OPEN} commission {Number(process.env.NEXT_PUBLIC_SLOTS_OPEN) === 1 ? 'slot' : 'slots'} available this quarter
              </span>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Original Works
            </span>
            <span className="h-px w-14 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(3rem,9vw,8rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            Commission an<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Original Work</em>
          </h1>
          <p
            className="text-[#9A9080] mt-8 text-sm leading-relaxed max-w-lg mx-auto animate-fade-up delay-200"
            style={{ ...B, fontWeight: 300 }}
          >
            Every piece is painted by hand, built around your vision, and delivered
            with a certificate of authenticity. 18+ years in practice.
          </p>
          <div className="mt-10 animate-fade-up delay-300">
            <a
              href="https://whop.com/anyly-studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Reserve Your Slot — $150 Deposit <ArrowRight size={11} />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-6 bg-[#141414]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              How It Works
            </span>
          </div>

          <div className="space-y-0 divide-y divide-[#C9A959]/10">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="group grid md:grid-cols-[6rem_1fr] gap-4 md:gap-10 py-10 animate-fade-up"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
              >
                {/* Number */}
                <div
                  className="text-[4rem] md:text-[5rem] leading-none text-[#C9A959]/12 group-hover:text-[#C9A959]/25 transition-colors duration-500 select-none mt-1"
                  style={{ ...D, fontWeight: 300 }}
                >
                  {step.n}
                </div>

                {/* Content */}
                <div className="pt-2">
                  <h3
                    className="text-xl md:text-2xl text-[#F5F0E8] mb-3 group-hover:text-[#C9A959] transition-colors duration-300"
                    style={{ ...D, fontWeight: 400 }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CARDS ── */}
      <section className="py-20 px-6 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-14 justify-center">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Get Started
            </span>
            <span className="h-px w-14 bg-[#C9A959]" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Card A — Deposit (highlighted) */}
            <div className="relative border border-[#C9A959]/50 rounded-xl p-8 flex flex-col overflow-hidden group hover:border-[#C9A959] transition-colors duration-300">
              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#C9A959]/10 rounded-bl-3xl" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#C9A959] mb-5"
                style={{ ...B, fontWeight: 500 }}
              >
                Reserve Your Slot
              </span>
              <h3
                className="text-2xl md:text-3xl text-[#F5F0E8] mb-2 leading-tight"
                style={{ ...D, fontWeight: 400 }}
              >
                Custom Commission<br />Deposit
              </h3>
              <p
                className="text-[3rem] text-[#C9A959] leading-none mt-3 mb-1"
                style={{ ...D, fontWeight: 300 }}
              >
                $150
              </p>
              <p className="text-[#6A6055] text-xs mb-6" style={{ ...B, fontWeight: 300 }}>
                Non-refundable · Holds your commission slot
              </p>
              <p className="text-[#9A9080] text-sm leading-relaxed flex-1 mb-8" style={{ ...B, fontWeight: 300 }}>
                Secure your place in the commission queue. This deposit is applied toward
                your total balance and confirms your intent to commission an original work.
                Non-refundable per commission policy.
              </p>
              <a
                href="https://whop.com/anyly-studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
                style={{ ...B, fontWeight: 600 }}
              >
                Pay Deposit & Reserve Slot <ArrowRight size={11} />
              </a>
            </div>

            {/* Card B — Pet Portrait */}
            <div className="border border-[#C9A959]/15 hover:border-[#C9A959]/40 rounded-xl p-8 flex flex-col transition-colors duration-300">
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#8B9A7D] mb-5"
                style={{ ...B, fontWeight: 500 }}
              >
                Full Commission
              </span>
              <h3
                className="text-2xl md:text-3xl text-[#F5F0E8] mb-2 leading-tight"
                style={{ ...D, fontWeight: 400 }}
              >
                16 × 20 Pet Portrait<br />
                <span className="text-xl text-[#9A9080]">Acrylic on canvas</span>
              </h3>
              <p
                className="text-[2.5rem] text-[#C9A959] leading-none mt-3 mb-1"
                style={{ ...D, fontWeight: 300 }}
              >
                From $350
              </p>
              <p className="text-[#6A6055] text-xs mb-6" style={{ ...B, fontWeight: 300 }}>
                Gallery-wrapped canvas · Certificate of authenticity
              </p>
              <p className="text-[#9A9080] text-sm leading-relaxed flex-1 mb-8" style={{ ...B, fontWeight: 300 }}>
                A hand-painted 16 × 20 pet portrait in acrylic on gallery-wrapped canvas.
                Includes progress updates, certificate of authenticity, and worldwide shipping.
              </p>
              <a
                href="https://whop.com/anyly-studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C9A959]/50 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
                style={{ ...B, fontWeight: 500 }}
              >
                Begin Commission <ArrowRight size={11} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-[#141414]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              FAQ
            </span>
          </div>

          <div className="space-y-0 divide-y divide-[#C9A959]/10">
            {faqs.map((faq, i) => (
              <div key={i} className="py-8">
                <h4
                  className="text-xl text-[#F5F0E8] mb-4"
                  style={{ ...D, fontWeight: 600 }}
                >
                  {faq.q}
                </h4>
                <p className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section className="py-10 px-6 bg-[#0D0D0D] border-t border-[#C9A959]/10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#6A6055] text-xs leading-relaxed" style={B}>
            All commissions require a signed agreement. Work begins only after agreement is received.{' '}
            <Link href="/terms" className="text-[#C9A959] hover:underline inline-flex items-center gap-1">
              Review full commission terms <ArrowRight size={10} />
            </Link>
          </p>
        </div>
      </section>

    </div>
  )
}
