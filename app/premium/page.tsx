import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, Download, Lock, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Premium | Anyly Studio',
  description: 'Premium wallpapers painted in April Johnson\'s signature style. New drops every week, yours to keep forever.',
}

const plans = [
  {
    name: 'Free',
    price: null,
    yearlyPrice: null,
    tagline: 'For art lovers',
    features: [
      'Browse the full gallery',
      'Commission original artwork',
      'Starting at $350',
    ],
    cta: 'View Gallery',
    href: '/gallery',
    highlight: false,
    variant: 'outline' as const,
  },
  {
    name: 'Premium',
    price: '$4.99',
    yearlyPrice: '$39.99',
    tagline: 'For collectors',
    features: [
      'Full wallpaper library (100+ pieces)',
      '4K download resolution',
      'New drops every week',
      'Set as wallpaper on any device',
    ],
    cta: 'Start Premium',
    href: '#',
    highlight: true,
    variant: 'default' as const,
  },
  {
    name: 'Pro',
    price: '$9.99',
    yearlyPrice: '$79.99',
    tagline: 'For true patrons',
    features: [
      'Everything in Premium',
      'Commission priority queue',
      '48hr early access to new drops',
      '1 AI custom wallpaper/month',
      'Behind-the-scenes studio content',
    ],
    cta: 'Go Pro',
    href: '#',
    highlight: false,
    variant: 'default' as const,
  },
]

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, cancel anytime from your account settings. No questions asked.',
  },
  {
    q: 'What devices work?',
    a: 'Any device — iPhone, Android, Mac, PC, tablet. Downloads work everywhere.',
  },
  {
    q: 'How do I download?',
    a: 'After subscribing, click any wallpaper to download the full 4K resolution file instantly.',
  },
  {
    q: 'How often are new wallpapers added?',
    a: 'New drops every week, automatically added to your library the moment they\'re published.',
  },
]

const previewImages = [
  { src: '/gallery/1.png', alt: 'Custom Portrait', locked: false },
  { src: '/gallery/2.png', alt: 'Abstract Commission', locked: false },
  { src: '/gallery/3.png', alt: 'Landscape Painting', locked: false },
  { src: '/gallery/4.png', alt: 'Botanical Study', locked: true },
  { src: '/gallery/5.png', alt: 'Live-Edge Wood Slab', locked: true },
  { src: '/gallery/6.png', alt: 'Pet Portrait', locked: true },
]

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[60vw] h-[60vh] rounded-full bg-[#C9A959]/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] rounded-full bg-[#8B9A7D]/12 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif', fontWeight: 500 }}
            >
              Studio Collection
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] leading-[0.92] tracking-[-0.02em] text-[#1A1A1A] dark:text-white mb-6"
            style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 400 }}
          >
            The Studio<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Collection</em>
          </h1>

          <p
            className="text-lg text-[#666] dark:text-neutral-400 max-w-xl mx-auto leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif', fontWeight: 300 }}
          >
            Premium wallpapers painted in April Johnson&apos;s signature style.
            New drops every week, yours to keep forever.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A959] hover:bg-[#A8883A] text-[#1A1A1A] text-sm font-medium tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Sparkles size={15} />
              Get Premium — $4.99/mo
            </a>
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#8B9A7D] text-[#8B9A7D] hover:bg-[#8B9A7D] hover:text-white text-sm font-medium tracking-widest uppercase transition-all duration-300"
            >
              Go Pro — $9.99/mo
            </a>
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS ── */}
      <section id="plans" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] dark:text-white mb-3"
              style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Choose Your Plan
            </h2>
            <p className="text-[#888] text-sm" style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif', fontWeight: 300 }}>
              Save 33% with an annual subscription
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-[#1A1A1A] text-white shadow-2xl ring-2 ring-[#C9A959] scale-105'
                    : 'bg-white dark:bg-neutral-900 shadow-md'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#C9A959] text-[#1A1A1A] text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className="text-xs tracking-[0.25em] uppercase mb-2"
                    style={{
                      fontFamily: 'var(--font-body), DM Sans, sans-serif',
                      color: plan.highlight ? '#C9A959' : '#8B9A7D',
                      fontWeight: 500,
                    }}
                  >
                    {plan.tagline}
                  </p>
                  <h3
                    className={`text-3xl mb-1 ${plan.highlight ? 'text-white' : 'text-[#1A1A1A] dark:text-white'}`}
                    style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 600 }}
                  >
                    {plan.name}
                  </h3>

                  {plan.price ? (
                    <div>
                      <div className="flex items-baseline gap-1 mt-3">
                        <span className={`text-4xl font-semibold ${plan.highlight ? 'text-[#C9A959]' : 'text-[#1A1A1A] dark:text-white'}`}>
                          {plan.price}
                        </span>
                        <span className={`text-sm ${plan.highlight ? 'text-neutral-400' : 'text-[#999]'}`}>/month</span>
                      </div>
                      <p className={`text-xs mt-1 ${plan.highlight ? 'text-neutral-400' : 'text-[#aaa]'}`}
                        style={{ fontFamily: 'var(--font-body)' }}>
                        or {plan.yearlyPrice}/year — save 33%
                      </p>
                    </div>
                  ) : (
                    <p className={`text-2xl font-medium mt-3 ${plan.highlight ? 'text-white' : 'text-[#1A1A1A] dark:text-white'}`}>
                      Free
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif', fontWeight: 300 }}>
                      <Check
                        size={15}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: plan.highlight ? '#C9A959' : '#8B9A7D' }}
                      />
                      <span className={plan.highlight ? 'text-neutral-300' : 'text-[#555] dark:text-neutral-400'}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`text-center py-3 px-6 text-xs font-medium tracking-widest uppercase transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-[#C9A959] text-[#1A1A1A] hover:bg-[#A8883A]'
                      : plan.name === 'Pro'
                      ? 'bg-[#8B9A7D] text-white hover:bg-[#6B7A5D]'
                      : 'border border-[#C9A959] text-[#C9A959] hover:bg-[#C9A959] hover:text-[#1A1A1A]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIEW GRID ── */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12 bg-[#C9A959]" />
              <span
                className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
              >
                The Library
              </span>
              <span className="h-px w-12 bg-[#C9A959]" />
            </div>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] dark:text-white"
              style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 400 }}
            >
              100+ Pieces & Growing
            </h2>
            <p className="text-[#888] mt-3 text-sm" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              Premium subscribers unlock every piece at 4K resolution
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewImages.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    img.locked ? 'blur-sm scale-110' : ''
                  }`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {!img.locked && (
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <Download size={20} className="text-[#1A1A1A]" />
                    </div>
                  </div>
                )}

                {img.locked && (
                  <div className="absolute inset-0 bg-[#1A1A1A]/30 flex flex-col items-center justify-center gap-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <Lock size={20} className="text-[#1A1A1A]" />
                    </div>
                    <span
                      className="bg-[#C9A959] text-[#1A1A1A] text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Premium
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#plans"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A959] hover:bg-[#A8883A] text-[#1A1A1A] text-sm font-medium tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              <Sparkles size={14} />
              Unlock the Full Library
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#FAF7F2] dark:bg-neutral-950">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] dark:text-white"
              style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Questions
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-[#E8D5A3]/60 dark:divide-neutral-800">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <p
                  className="text-lg text-[#1A1A1A] dark:text-white mb-2"
                  style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 600 }}
                >
                  {faq.q}
                </p>
                <p
                  className="text-[#666] dark:text-neutral-400 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif', fontWeight: 300 }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-24 bg-[#1A1A1A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vh] rounded-full bg-[#C9A959]/8 blur-[120px]" />
        </div>

        <div className="max-w-2xl mx-auto px-6 relative">
          <h2
            className="text-[clamp(2.5rem,6vw,4.5rem)] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display), Cormorant Garamond, serif', fontWeight: 400 }}
          >
            Your art.<br />
            Your walls.<br />
            <em className="text-[#C9A959]">Your style.</em>
          </h2>
          <p
            className="text-neutral-400 mb-10 max-w-sm mx-auto"
            style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif', fontWeight: 300 }}
          >
            Join the Studio Collection and own a piece of every painting.
          </p>
          <a
            href="#plans"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#C9A959] hover:bg-[#A8883A] text-[#1A1A1A] text-sm font-medium tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Sparkles size={15} />
            Subscribe Now
          </a>
        </div>
      </section>

    </div>
  )
}
