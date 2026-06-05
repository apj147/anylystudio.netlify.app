import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Mail, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Anyly Studio | Custom Artwork & Commissions',
  description:
    'Where Your Vision Becomes Art. Custom portraits, landscapes, botanical studies, abstract commissions and live-edge wood slab paintings by April Johnson in Glen Flora, Wisconsin.',
}

const services = [
  { n: '01', title: 'Custom Portraits', price: 'From $500', tag: 'Most Requested' },
  { n: '02', title: 'Abstract Commissions', price: 'From $750', tag: null },
  { n: '03', title: 'Landscape Paintings', price: 'From $650', tag: null },
  { n: '04', title: 'Botanical Studies', price: 'From $425', tag: null },
  { n: '05', title: 'Live-Edge Wood Slab', price: '$600 – $875', tag: 'Signature' },
  { n: '06', title: 'Pet Portraits', price: 'From $350', tag: null },
  { n: '07', title: 'Gift Commissions', price: 'From $400', tag: null },
  { n: '08', title: 'Large Scale Artwork', price: 'From $2,000', tag: 'Statement' },
  { n: '09', title: 'Commercial Projects', price: 'Contact for Quote', tag: null },
]

const process = [
  { num: '01', title: 'Consultation', desc: 'We discuss your vision, size requirements, and timeline before a single brushstroke.' },
  { num: '02', title: 'Proposal & Deposit', desc: 'A detailed proposal with pricing. Deposit secures your slot and begins the work.' },
  { num: '03', title: 'Creation', desc: 'April paints with regular progress updates. Your feedback shapes every stage.' },
  { num: '04', title: 'Delivery', desc: 'Your completed piece ships carefully packaged. Balance due on final approval.' },
]

const galleryPreviews = [
  { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=90&fit=crop', label: 'Portrait', wide: true },
  { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=90&fit=crop', label: 'Abstract', wide: false },
  { src: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=90&fit=crop', label: 'Landscape', wide: false },
  { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=90&fit=crop', label: 'Botanical', wide: false },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="min-h-screen relative overflow-hidden bg-[#0D0D0D] grain">

        {/* Subtle ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] rounded-full bg-[#C9A959]/5 blur-[140px] pointer-events-none" />

        <div className="relative min-h-screen grid md:grid-cols-[1fr_42%]">

          {/* Left — Text */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-28 relative z-10">

            <div className="flex items-center gap-3 mb-10 animate-fade-up">
              <span className="h-px w-14 bg-[#C9A959]" />
              <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={B}>
                Custom Artwork & Commissions
              </span>
            </div>

            <h1
              className="text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.86] tracking-[-0.03em] text-[#F5F0E8] animate-fade-up delay-100"
              style={{ ...D, fontWeight: 300 }}
            >
              Where<br />
              Your<br />
              Vision<br />
              <em
                className="block text-[#C9A959] not-italic"
                style={{ ...D, fontStyle: 'italic', fontWeight: 400 }}
              >
                Becomes<br />Art
              </em>
            </h1>

            <p
              className="text-[#9A9080] mt-10 mb-10 max-w-sm leading-relaxed text-sm animate-fade-up delay-200"
              style={{ ...B, fontWeight: 300 }}
            >
              Handcrafted commissions by April Johnson — 18+ years in practice.
              Pet portraits, landscapes, botanicals, and large-scale statements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Link
                href="/commissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-xs tracking-[0.2em] uppercase transition-colors rounded"
                style={{ ...B, fontWeight: 600 }}
              >
                Commission a Piece <ArrowRight size={13} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-xs tracking-[0.2em] uppercase transition-colors rounded"
                style={{ ...B, fontWeight: 500 }}
              >
                View Portfolio
              </Link>
            </div>

            <div
              className="flex items-center gap-3 mt-10 text-[#6A6055] text-[11px] tracking-widest animate-fade-up delay-400"
              style={B}
            >
              <MapPin size={12} className="text-[#C9A959]" />
              <span>Glen Flora, Wisconsin</span>
              <span className="w-1 h-1 rounded-full bg-[#C9A959]/50" />
              <span>Ships Worldwide</span>
            </div>
          </div>

          {/* Right — Hero image, bleeds to edge */}
          <div className="hidden md:block relative">
            <Image
              src="/hero.webp"
              alt="Original artwork by April Johnson"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="42vw"
              quality={85}
            />
            {/* Gradient blend left edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/30 to-transparent" />

            {/* Artist badge */}
            <div className="absolute bottom-10 left-6 border border-[#C9A959]/30 rounded-lg px-5 py-3 bg-[#0D0D0D]/80 backdrop-blur-sm">
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A959]" style={B}>
                Available for Commissions
              </p>
              <p className="text-[#F5F0E8] text-xl mt-1" style={{ ...D, fontWeight: 400 }}>April Johnson</p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-8 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-[#C9A959]/50" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#6A6055] rotate-90 mt-2" style={B}>Scroll</span>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="absolute -top-5 -left-5 w-40 h-40 border border-[#C9A959]/25 rounded-2xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                <Image
                  src="/about/april-johnson-studio.jpg"
                  alt="April Johnson — Anyly Studio, Glen Flora Wisconsin"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#C9A959] text-[#0D0D0D] px-6 py-4 rounded-xl shadow-xl">
                <p className="text-3xl leading-none" style={{ ...D, fontWeight: 600 }}>18+</p>
                <p className="text-[10px] tracking-[0.3em] uppercase mt-0.5 opacity-80" style={{ ...B, fontWeight: 600 }}>Years in Practice</p>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-7 order-1 md:order-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                  About April
                </span>
              </div>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-[#1A1A1A]"
                style={{ ...D, fontWeight: 400 }}
              >
                Art That<br />
                <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Tells Your Story</em>
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                <p>
                  Based in Glen Flora, Wisconsin with a BFA from the University of Florida
                  (2007) and an AA from Miami Dade College (2005), April has spent 18+ years
                  building a practice rooted in observation, craft, and collaboration.
                </p>
                <p>
                  Whether it&apos;s a pet portrait that captures spirit, a botanical study
                  painted from life, or a large-scale statement piece — every commission
                  begins with listening and ends with something irreplaceable.
                </p>
                <p className="text-[#1A1A1A]" style={{ ...D, fontSize: '1.15rem', fontStyle: 'italic' }}>
                  &ldquo;The best commissions feel like collaborations. I want to paint
                  what&apos;s already in your mind.&rdquo;
                </p>
                <p className="text-[#C9A959] text-xs tracking-[0.3em] uppercase" style={{ ...B, fontWeight: 500 }}>
                  — April Johnson
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#2C2C2C] border-b border-[#C9A959] pb-0.5 text-sm hover:text-[#C9A959] transition-colors"
                style={{ ...B, fontWeight: 500 }}
              >
                Full biography <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-24 bg-[#0D0D0D] grain relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                  Selected Works
                </span>
              </div>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] text-[#F5F0E8]"
                style={{ ...D, fontWeight: 400 }}
              >
                From the Studio
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden md:inline-flex items-center gap-2 text-[#C9A959] text-xs tracking-widest uppercase hover:gap-3 transition-all"
              style={{ ...B, fontWeight: 500 }}
            >
              Full Gallery <ArrowRight size={13} />
            </Link>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 auto-rows-[220px]">
            {/* Wide tall card */}
            <Link href="/gallery" className="group relative col-span-2 md:col-span-7 row-span-2 overflow-hidden rounded-xl">
              <Image src={galleryPreviews[0].src} alt={galleryPreviews[0].label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 58vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 border border-[#C9A959]/0 group-hover:border-[#C9A959]/40 transition-all duration-500 inset-0 absolute rounded-xl" />
              <div className="absolute bottom-5 left-5">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A959] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={B}>{galleryPreviews[0].label}</span>
              </div>
            </Link>
            {/* Three smaller cards */}
            {galleryPreviews.slice(1).map((img, i) => (
              <Link key={i} href="/gallery" className="group relative col-span-1 md:col-span-5 overflow-hidden rounded-xl">
                <Image src={img.src} alt={img.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 42vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A959]" style={B}>{img.label}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[#C9A959] text-xs tracking-widest uppercase"
              style={{ ...B, fontWeight: 500 }}
            >
              Full Gallery <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-[#0D0D0D] border-t border-[#C9A959]/10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                  What I Create
                </span>
              </div>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] text-[#F5F0E8] leading-[1.05]"
                style={{ ...D, fontWeight: 400 }}
              >
                Commission<br />
                <em style={{ fontStyle: 'italic', color: '#C9A959' }}>Services</em>
              </h2>
            </div>
            <p className="text-[#9A9080] text-sm leading-relaxed max-w-md self-end" style={{ ...B, fontWeight: 300 }}>
              Every piece is one-of-a-kind, crafted around your vision. Accepting commissions
              for private collectors and business clients.
            </p>
          </div>

          {/* Service list */}
          <div className="divide-y divide-[#C9A959]/10">
            {services.map((s, i) => (
              <div
                key={i}
                className="group flex items-center justify-between py-5 hover:bg-[#C9A959]/5 -mx-4 px-4 transition-colors duration-200 cursor-default rounded"
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <span
                    className="text-[#C9A959]/40 group-hover:text-[#C9A959]/80 transition-colors text-sm leading-none tabular-nums"
                    style={{ ...D, fontWeight: 300 }}
                  >
                    {s.n}
                  </span>
                  <h3
                    className="text-lg md:text-xl text-[#F5F0E8] group-hover:text-[#C9A959] transition-colors duration-300"
                    style={{ ...D, fontWeight: 400 }}
                  >
                    {s.title}
                  </h3>
                  {s.tag && (
                    <span
                      className="hidden md:inline-block text-[9px] tracking-[0.3em] uppercase border border-[#C9A959]/40 text-[#C9A959] px-2.5 py-1 rounded-full"
                      style={{ ...B, fontWeight: 500 }}
                    >
                      {s.tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#C9A959] text-sm" style={{ ...B, fontWeight: 400 }}>{s.price}</span>
                  <ArrowRight size={14} className="text-[#C9A959]/0 group-hover:text-[#C9A959]/60 transition-colors duration-300" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/commissions"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-xs tracking-[0.2em] uppercase transition-colors rounded"
              style={{ ...B, fontWeight: 600 }}
            >
              Start a Commission <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-28 bg-[#141414] relative overflow-hidden">

        {/* Giant watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] leading-none text-[#C9A959]/[0.025] select-none pointer-events-none"
          style={{ ...D, fontWeight: 300 }}
        >
          Process
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-[#C9A959]" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                How It Works
              </span>
            </div>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] text-[#F5F0E8]"
              style={{ ...D, fontWeight: 400 }}
            >
              The Creative Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#C9A959]/10">
            {process.map((step, i) => (
              <div key={i} className="relative p-8 lg:pl-10">
                <div
                  className="text-[4.5rem] leading-none text-[#C9A959]/15 mb-6 select-none"
                  style={{ ...D, fontWeight: 300 }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-xl text-[#F5F0E8] mb-3"
                  style={{ ...D, fontWeight: 600 }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#9A9080] leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Left */}
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                  Let&apos;s Create Together
                </span>
              </div>
              <h2
                className="text-[clamp(2.5rem,5vw,3.5rem)] text-[#1A1A1A] leading-tight"
                style={{ ...D, fontWeight: 400 }}
              >
                Start Your<br />
                <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Commission</em>
              </h2>
              <p className="text-[#666] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                Ready to bring your vision to life? Tell me about your project and I&apos;ll
                respond within 24–48 hours with a personalized proposal.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-sm text-[#555]">
                  <Mail size={14} className="text-[#C9A959] shrink-0" />
                  <span style={B}>contact@anylystudio.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#555]">
                  <MapPin size={14} className="text-[#C9A959] shrink-0" />
                  <span style={B}>Glen Flora, Wisconsin · Ships Worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#555]">
                  <Star size={14} className="text-[#C9A959] shrink-0" />
                  <span style={B}>$150 deposit to reserve slot · Balance on completion</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form action="/api/contact" method="POST" className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[#999] block mb-2" style={{ ...B, fontWeight: 500 }}>Name</label>
                  <input
                    type="text" name="name" required
                    placeholder="Your name"
                    className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#ccc] focus:outline-none focus:border-[#C9A959] transition-colors"
                    style={B}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-[0.3em] uppercase text-[#999] block mb-2" style={{ ...B, fontWeight: 500 }}>Email</label>
                  <input
                    type="email" name="email" required
                    placeholder="your@email.com"
                    className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#ccc] focus:outline-none focus:border-[#C9A959] transition-colors"
                    style={B}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[#999] block mb-2" style={{ ...B, fontWeight: 500 }}>Commission Type</label>
                <select
                  name="type"
                  className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A959] transition-colors"
                  style={B}
                >
                  <option value="">Select a service...</option>
                  <option value="portrait">Custom Portrait — from $500</option>
                  <option value="abstract">Abstract Commission — from $750</option>
                  <option value="landscape">Landscape Painting — from $650</option>
                  <option value="botanical">Botanical Study — from $425</option>
                  <option value="liveedge">Live-Edge Wood Slab — $600–$875</option>
                  <option value="pet">Pet Portrait — from $350</option>
                  <option value="gift">Gift Commission — from $400</option>
                  <option value="large">Large Scale Artwork — from $2,000</option>
                  <option value="commercial">Commercial Project — Contact for Quote</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] tracking-[0.3em] uppercase text-[#999] block mb-2" style={{ ...B, fontWeight: 500 }}>Your Vision</label>
                <textarea
                  name="message" rows={5} required
                  placeholder="Describe your vision, size preferences, timeline, and any reference inspiration..."
                  className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#ccc] focus:outline-none focus:border-[#C9A959] transition-colors resize-none"
                  style={B}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#FAF7F2] text-xs tracking-[0.2em] uppercase transition-colors rounded"
                style={{ ...B, fontWeight: 500 }}
              >
                Send Commission Request <ArrowRight size={13} />
              </button>

              <p className="text-xs text-center text-[#bbb]" style={B}>
                I respond within 24–48 hours · No obligation consultation
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
