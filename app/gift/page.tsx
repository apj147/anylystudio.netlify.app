import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gift a Commission | Anyly Studio — Original Art as a Gift',
  description:
    'Give a custom painting by April Johnson. Pet portraits, botanicals, landscapes — one-of-a-kind gifts for birthdays, anniversaries, memorials, and weddings. Starting at $150 deposit.',
  keywords: [
    'art gift commission', 'custom painting as gift', 'pet portrait gift', 'memorial pet portrait',
    'anniversary painting gift', 'birthday art commission', 'unique gift original art',
    'Wisconsin artist gift', 'commission painting for someone else',
  ],
  openGraph: {
    title: 'Gift a Commission | Anyly Studio',
    description: 'Give original art. Custom paintings by April Johnson — pet portraits, botanicals, landscapes. One-of-a-kind gifts.',
    url: 'https://anylystudio.com/gift',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Gift a Commission — Anyly Studio' }],
  },
  alternates: { canonical: 'https://anylystudio.com/gift' },
}

const occasions = [
  { icon: '🐾', label: 'Pet Memorial', desc: 'Honor a beloved companion with a portrait that preserves them forever.' },
  { icon: '💍', label: 'Anniversary', desc: 'A painting of a cherished place, moment, or subject — made for someone you love.' },
  { icon: '🎂', label: 'Birthday', desc: 'The gift that stands out from every other. Something they\'ll keep for life.' },
  { icon: '🌸', label: 'Wedding', desc: 'Commission a portrait of the couple, their venue, or a botanical from the ceremony.' },
  { icon: '🏡', label: 'New Home', desc: 'A landscape of their new town, neighborhood, or a place that matters to them.' },
  { icon: '🎓', label: 'Retirement', desc: 'Mark a life\'s work with a statement piece. Something worthy of the moment.' },
]

const steps = [
  { n: '01', title: 'Pay the deposit', body: 'The $150 deposit secures a commission slot under your name. You\'ll choose the subject, size, and medium on behalf of the recipient.' },
  { n: '02', title: 'Provide the details', body: 'After payment, share reference photos, any notes about the recipient\'s taste, and the subject you\'d like painted. April handles the rest.' },
  { n: '03', title: 'Present the gift early', body: 'April sends progress photos as the piece develops — which you can share with the recipient if you\'d like them to follow along, or keep as a surprise until delivery.' },
  { n: '04', title: 'It arrives ready to hang', body: 'The finished piece ships with a certificate of authenticity and a handwritten note to the recipient if requested.' },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function GiftPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] rounded-full bg-[#C9A959]/6 blur-[140px]" />
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <Heart size={12} className="text-[#C9A959]" fill="#C9A959" />
            <span className="h-px w-14 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] tracking-[-0.025em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            Give Art That<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Lasts a Lifetime</em>
          </h1>
          <p className="text-[#9A9080] mt-8 text-sm leading-relaxed max-w-md mx-auto animate-fade-up delay-200" style={{ ...B, fontWeight: 300 }}>
            A custom painting is the rare gift that means more with every passing year.
            Commission an original work for someone who deserves something irreplaceable.
          </p>
          <div className="mt-10 animate-fade-up delay-300">
            <a
              href="https://whop.com/anyly-studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Gift a Commission — $150 to Begin <ArrowRight size={11} />
            </a>
          </div>
          <p className="text-[#6A6055] text-xs mt-4" style={B}>
            Non-refundable deposit · Applied toward total balance
          </p>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 px-6 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Perfect For
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {occasions.map((occ, i) => (
              <div
                key={occ.label}
                className="border border-[#C9A959]/10 hover:border-[#C9A959]/30 rounded-xl p-6 transition-colors duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="text-2xl mb-3">{occ.icon}</div>
                <h3
                  className="text-lg text-[#F5F0E8] mb-2"
                  style={{ ...D, fontWeight: 600 }}
                >
                  {occ.label}
                </h3>
                <p className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                  {occ.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works as a gift */}
      <section className="py-20 px-6 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Gifting a Commission
            </span>
          </div>
          <div className="divide-y divide-[#C9A959]/10">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="group grid md:grid-cols-[5rem_1fr] gap-6 py-10 animate-fade-up"
                style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
              >
                <div
                  className="text-[4rem] leading-none text-[#C9A959]/12 group-hover:text-[#C9A959]/25 transition-colors duration-500 select-none"
                  style={{ ...D, fontWeight: 300 }}
                >
                  {step.n}
                </div>
                <div className="pt-2">
                  <h3
                    className="text-xl text-[#F5F0E8] mb-3"
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

      {/* Pull quote */}
      <section className="py-20 px-6 bg-[#141414] text-center">
        <div className="max-w-2xl mx-auto">
          <div className="h-px w-16 bg-[#C9A959]/40 mx-auto mb-10" />
          <blockquote
            className="text-[clamp(1.5rem,3.5vw,2.5rem)] text-[#F5F0E8] leading-[1.3]"
            style={{ ...D, fontStyle: 'italic', fontWeight: 300 }}
          >
            &ldquo;She painted my parents&apos; dog after he passed. My mom
            cried for twenty minutes. Nothing would have meant more.&rdquo;
          </blockquote>
          <p className="text-[#C9A959] text-[10px] tracking-[0.3em] uppercase mt-6" style={{ ...B, fontWeight: 500 }}>
            — Jennifer R., Nashville TN · Gift Commission
          </p>
          <div className="h-px w-16 bg-[#C9A959]/40 mx-auto mt-10" />
        </div>
      </section>

      {/* FAQ teaser + CTA */}
      <section className="py-20 px-6 bg-[#0D0D0D] border-t border-[#C9A959]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl text-[#F5F0E8] mb-4"
            style={{ ...D, fontWeight: 400 }}
          >
            Have questions before gifting?
          </h2>
          <p className="text-[#9A9080] text-sm mb-10 leading-relaxed" style={{ ...B, fontWeight: 300 }}>
            See the full FAQ or email April directly — she responds within 24–48 hours
            and can help you choose the right size, medium, and subject for your recipient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://whop.com/anyly-studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Gift a Commission <ArrowRight size={11} />
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 500 }}
            >
              Read the FAQ
            </Link>
          </div>
          <p className="text-[#6A6055] text-xs mt-6" style={B}>
            Questions?{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              contact@anylystudio.com
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
