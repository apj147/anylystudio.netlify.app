import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ | Anyly Studio — April Johnson',
  description:
    'Frequently asked questions about commissioning original artwork from April Johnson — process, pricing, payment, shipping, and business clients.',
  keywords: [
    'art commission FAQ', 'how to commission painting', 'pet portrait commission questions',
    'April Johnson FAQ', 'custom artwork pricing', 'commission deposit refund',
    'Wisconsin artist commission', 'how long does a commission take',
  ],
  openGraph: {
    title: 'FAQ | Anyly Studio',
    description: 'Everything you need to know about commissioning original artwork from April Johnson.',
    url: 'https://anylystudio.com/faq',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio FAQ' }],
  },
  alternates: { canonical: 'https://anylystudio.com/faq' },
}

const categories = [
  {
    label: 'Commission Process',
    slug: 'process',
    faqs: [
      {
        q: 'How do I start a commission?',
        a: 'Begin at the Commissions page — pay the $150 deposit to reserve your slot, then sign the commission agreement. Once the agreement is received, April schedules your piece and begins the consultation.',
      },
      {
        q: 'How long does a commission take?',
        a: 'Most commissions deliver within 60–120 days from the start of work, depending on complexity, size, and current queue depth. You\'ll receive a timeline estimate in your commission agreement.',
      },
      {
        q: 'Do I get to see the piece before it\'s finalized?',
        a: 'Yes. April shares progress photos at key stages — typically after the initial block-in and again before the final detail pass. Revisions are addressed before the finishing layers are applied.',
      },
      {
        q: 'Can I request changes after seeing progress photos?',
        a: 'Minor compositional and color adjustments during the progress phase are included. Significant changes to the original brief may affect the timeline and final pricing — these are discussed before any extra work begins.',
      },
      {
        q: 'What if I\'m not happy with the finished piece?',
        a: 'April works closely with every client throughout the process to prevent surprises. If there is a specific issue with the finished work that falls outside the agreed brief, she will discuss options including targeted revisions. Commission agreements outline the full policy.',
      },
    ],
  },
  {
    label: 'Pricing & Payment',
    slug: 'pricing',
    faqs: [
      {
        q: 'What does a commission cost?',
        a: 'Pricing depends on subject matter, medium, and size. Pet portraits start at $350 (11×14). Landscapes from $650. Large-scale statement pieces from $2,000. The $150 deposit holds your slot and applies toward the total balance.',
      },
      {
        q: 'Is the $150 deposit refundable?',
        a: 'No — the deposit is non-refundable per the commission policy. It compensates for the time reserved in the queue and the initial consultation. Full terms are at /terms.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'Online payments via Whop (card, Apple Pay, Google Pay). Business clients may request ACH or formal invoice — contact contact@anylystudio.com for those arrangements.',
      },
      {
        q: 'When is the remaining balance due?',
        a: 'The balance is due upon final approval of the finished piece, before shipping. You\'ll receive a final preview and invoice at that stage.',
      },
    ],
  },
  {
    label: 'Shipping & Delivery',
    slug: 'shipping',
    faqs: [
      {
        q: 'Do you ship internationally?',
        a: 'Yes — Anyly Studio ships worldwide. Shipping cost is calculated based on destination and piece size and is invoiced separately at the time of delivery.',
      },
      {
        q: 'How is the artwork packaged?',
        a: 'Canvas paintings ship rolled in a protective tube or stretched on a frame, depending on size and client preference. Board and paper works are flat-packed with acid-free interleaving. All shipments are insured.',
      },
      {
        q: 'Does every piece come with a certificate of authenticity?',
        a: 'Yes. Every commissioned original ships with a hand-signed certificate of authenticity documenting the title, medium, dimensions, date of completion, and the collector\'s name.',
      },
    ],
  },
  {
    label: 'Business Clients',
    slug: 'business',
    faqs: [
      {
        q: 'Do you work with businesses, restaurants, or hotels?',
        a: 'Yes. April accepts commercial commissions for hospitality, corporate, and institutional clients. These projects are handled with formal proposals, milestone billing, and detailed delivery documentation.',
      },
      {
        q: 'Can you issue a formal invoice and accept ACH?',
        a: 'Yes. Business clients may request formal invoicing (net terms negotiable) and ACH payment. Email contact@anylystudio.com to begin a business inquiry.',
      },
      {
        q: 'Do you handle large multi-piece or ongoing projects?',
        a: 'Yes — retainer arrangements for ongoing series or large installations are available. Contact April directly to discuss scope and scheduling.',
      },
    ],
  },
  {
    label: 'About the Work',
    slug: 'work',
    faqs: [
      {
        q: 'What mediums do you work in?',
        a: 'Primarily acrylic and oil on canvas. April also works in watercolor, gouache, and mixed media. Medium selection depends on the subject, scale, and your preferences — it\'s part of the initial consultation.',
      },
      {
        q: 'Can you paint in a specific style or match a reference artist?',
        a: 'April works in her own voice, developed over 18+ years of practice. She will consider style references to understand your aesthetic preferences, but commissions result in original April Johnson paintings, not imitations of other artists.',
      },
      {
        q: 'What sizes are available?',
        a: 'Any size. Common ranges are 8×10 to 16×20 for portraits and botanicals; 18×24 to 24×30 for landscapes; 36×48 and larger for statement pieces. Custom dimensions are always available.',
      },
      {
        q: 'Can I commission a painting as a gift?',
        a: 'Yes — gift commissions are among the most meaningful pieces April creates. See the Gift Commissions page for guidance on ordering and presenting a commission as a gift.',
      },
    ],
  },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute right-0 bottom-0 text-[16rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none" style={{ ...D, fontWeight: 300 }}>
          FAQ
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Frequently Asked
            </span>
          </div>
          <h1
            className="text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            Questions &<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Answers</em>
          </h1>
          <p className="text-[#9A9080] mt-6 max-w-md text-sm leading-relaxed animate-fade-up delay-200" style={{ ...B, fontWeight: 300 }}>
            Everything about commissions, pricing, shipping, and working with April.
            Don&apos;t see your question?{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              Email directly.
            </a>
          </p>
        </div>
      </section>

      {/* Jump links */}
      <section className="px-6 py-4 bg-[#141414] border-y border-[#C9A959]/10 sticky top-[72px] z-40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-1 overflow-x-auto">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="shrink-0 px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-[#6A6055] hover:text-[#C9A959] transition-colors rounded"
              style={{ ...B, fontWeight: 500 }}
            >
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* FAQ categories */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {categories.map((cat, ci) => (
          <section key={cat.slug} id={cat.slug} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <h2
                className="text-2xl md:text-3xl text-[#F5F0E8]"
                style={{ ...D, fontWeight: 400 }}
              >
                {cat.label}
              </h2>
              <div className="flex-1 h-px bg-[#C9A959]/15" />
            </div>
            <div className="space-y-0 divide-y divide-[#C9A959]/10">
              {cat.faqs.map((faq, fi) => (
                <div
                  key={fi}
                  className="py-8 animate-fade-up"
                  style={{ animationDelay: `${(ci * 100) + (fi * 60)}ms`, animationFillMode: 'both' }}
                >
                  <h3
                    className="text-lg md:text-xl text-[#F5F0E8] mb-4 leading-tight"
                    style={{ ...D, fontWeight: 600 }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA strip */}
      <section className="py-16 px-6 bg-[#141414] border-t border-[#C9A959]/10 text-center">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-2xl md:text-3xl text-[#F5F0E8] mb-4"
            style={{ ...D, fontWeight: 400 }}
          >
            Still have questions?
          </h2>
          <p className="text-[#9A9080] text-sm mb-8" style={{ ...B, fontWeight: 300 }}>
            Email April directly — she responds within 24–48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@anylystudio.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Email April <ArrowRight size={11} />
            </a>
            <Link
              href="/commissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 500 }}
            >
              Start a Commission
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
