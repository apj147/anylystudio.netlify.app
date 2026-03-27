import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Nav } from '@/components/Nav'
import {
  Palette,
  Sparkles,
  Mail,
  MapPin,
  ArrowRight,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Anyly Studio | Custom Artwork & Commissions',
  description:
    'Where Your Vision Becomes Art. Custom portraits, landscapes, botanical studies, abstract commissions and live-edge wood slab paintings by April Johnson in Ladysmith, Wisconsin.',
}

const services = [
  {
    icon: '🖼️',
    title: 'Custom Portraits',
    desc: 'Timeless portraits capturing personality, emotion, and the unique essence of your subject — painted with warmth and precision.',
    price: 'Starting at $500',
    tag: 'Most Requested',
  },
  {
    icon: '✨',
    title: 'Abstract Commissions',
    desc: 'Bold, expressive pieces designed to complement your space and reflect your personal aesthetic. No two are alike.',
    price: 'Starting at $750',
    tag: null,
  },
  {
    icon: '🗻',
    title: 'Landscape Paintings',
    desc: 'Breathtaking landscapes bringing the beauty of the natural world into your home — from rolling Wisconsin hills to sweeping panoramas.',
    price: 'Starting at $650',
    tag: null,
  },
  {
    icon: '🌿',
    title: 'Botanical Studies',
    desc: 'Elegant, detail-rich botanical artwork celebrating the intricate beauty of plants, florals, and the living world.',
    price: 'Starting at $425',
    tag: null,
  },
  {
    icon: '🪵',
    title: 'Live-Edge Wood Slab Paintings',
    desc: 'One-of-a-kind artwork painted directly on natural live-edge wood slabs — organic, bold, and completely unforgettable.',
    price: '$600 – $875',
    tag: 'Signature Piece',
  },
  {
    icon: '🐾',
    title: 'Pet Portraits',
    desc: 'Celebrate your furry family members with a portrait that captures their unique spirit and personality forever.',
    price: 'Starting at $350',
    tag: null,
  },
  {
    icon: '🎁',
    title: 'Gift Commissions',
    desc: 'Create a meaningful, one-of-a-kind gift for weddings, anniversaries, or any special occasion that deserves something extraordinary.',
    price: 'Starting at $400',
    tag: null,
  },
  {
    icon: '🖼️',
    title: 'Large Scale Artwork',
    desc: 'Statement pieces for homes, offices, and commercial spaces that demand attention and become the centerpiece of any room.',
    price: 'Starting at $2,000',
    tag: 'Statement',
  },
  {
    icon: '🏢',
    title: 'Commercial Projects',
    desc: 'Bespoke artwork for businesses, restaurants, hotels, and corporate collections. Every space deserves original art.',
    price: 'Contact for Quote',
    tag: null,
  },
]

const process = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We discuss your vision, preferences, size requirements, and timeline to ensure perfect alignment before a single brushstroke.',
  },
  {
    num: '02',
    title: 'Proposal & Deposit',
    desc: 'You receive a detailed proposal with timeline and pricing. A 50% deposit secures your commission and begins the creative process.',
  },
  {
    num: '03',
    title: 'Creation',
    desc: 'I bring your vision to life with progress updates and check-ins. Your feedback shapes every stage of the work.',
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'Your completed piece is carefully packaged and delivered. The remaining balance is due upon final approval.',
  },
]

export default function Home() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="min-h-screen relative overflow-hidden flex items-center pt-24 pb-16 bg-[#FAF7F2]">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[60vw] h-[60vh] rounded-full bg-[#C9A959]/8 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] rounded-full bg-[#8B9A7D]/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vh] rounded-full bg-[#C17F59]/6 blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span
                  className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
                >
                  Custom Artwork & Commissions
                </span>
              </div>

              <h1
                className="text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.92] tracking-[-0.02em] text-[#1A1A1A]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                Where Your<br />
                Vision<br />
                <em className="text-[#C9A959] not-italic" style={{ fontStyle: 'italic' }}>Becomes Art</em>
              </h1>

              <p
                className="text-lg text-[#666] max-w-md leading-relaxed"
                style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}
              >
                Transforming ideas into stunning, one-of-a-kind artwork.
                From portraits to abstract pieces, every commission is crafted
                with passion and precision.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" variant="default">
                  <Link href="/#contact">
                    Start Your Commission
                    <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#999]" style={{ fontFamily: 'DM Sans' }}>
                <MapPin size={14} className="text-[#C9A959]" />
                <span>Ladysmith, Wisconsin · Commission worldwide</span>
              </div>
            </div>

            {/* Right — hero image */}
            <div
              className="relative opacity-0 animate-fade-up delay-200"
              style={{ animationFillMode: 'forwards' }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#C9A959]/20 to-[#8B9A7D]/15 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=90&fit=crop"
                  alt="Anyly Studio — Custom Artwork by April Johnson"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 bg-[#FAF7F2]/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-lg">
                  <p className="text-xs tracking-widest uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans' }}>
                    Available for Commissions
                  </p>
                  <p className="font-display text-lg text-[#1A1A1A] mt-0.5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    April Johnson
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-48 h-48 border border-[#C9A959]/30 rounded-2xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                <Image
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=90&fit=crop"
                  alt="April Johnson — Artist, Anyly Studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#C9A959] text-white px-6 py-4 rounded-xl shadow-lg">
                <p className="text-2xl font-display" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                  9+ Years
                </p>
                <p className="text-xs tracking-widest uppercase opacity-80" style={{ fontFamily: 'DM Sans' }}>
                  Creating Art
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                  About April
                </span>
              </div>
              <h2
                className="text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#1A1A1A]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                Art That<br />
                <em style={{ fontStyle: 'italic', color: '#C9A959' }}>Tells Your Story</em>
              </h2>
              <div className="space-y-4 text-[#555] leading-relaxed" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                <p>
                  Welcome to Anyly Studio, where creativity meets craftsmanship.
                  Based in Ladysmith, Wisconsin, I specialize in creating custom artwork
                  that captures the essence of your vision.
                </p>
                <p>
                  Every piece I create is a collaboration between artist and client.
                  Whether you&apos;re looking for a portrait that captures a precious moment,
                  an abstract piece that speaks to your soul, or a custom commission for
                  a special occasion — I pour my heart into every brushstroke.
                </p>
                <p className="italic text-[#2C2C2C]" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
                  &ldquo;Art isn&apos;t just what I do — it&apos;s who I am. Let&apos;s create
                  something beautiful together.&rdquo;
                </p>
                <p className="text-[#C9A959] tracking-widest text-sm uppercase" style={{ fontWeight: 500 }}>
                  — April Johnson
                </p>
              </div>
              <Button asChild variant="outline" size="lg">
                <Link href="/gallery">Browse My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A959]" />
                <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                  Selected Works
                </span>
              </div>
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] text-[#1A1A1A]"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                From the Studio
              </h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/gallery" className="flex items-center gap-2">
                View All <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80&fit=crop', label: 'Custom Portrait' },
              { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80&fit=crop', label: 'Abstract' },
              { src: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=500&q=80&fit=crop', label: 'Landscape' },
              { src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&q=80&fit=crop', label: 'Botanical' },
            ].map((img, i) => (
              <Link
                key={i}
                href="/gallery"
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm tracking-widest uppercase" style={{ fontFamily: 'DM Sans' }}>
                    {img.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="dark" size="lg">
              <Link href="/gallery">Explore Full Gallery — 9 Artworks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#C9A959]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                What I Create
              </span>
              <span className="h-px w-12 bg-[#C9A959]" />
            </div>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] text-[#1A1A1A]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Commission Services
            </h2>
            <p className="text-[#888] max-w-xl mx-auto" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
              Every piece is one-of-a-kind, crafted with care and built around your vision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="service-card-hover relative group bg-[#FAF7F2] rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#E8D5A3]"
              >
                {s.tag && (
                  <span className="absolute top-4 right-4 text-xs bg-[#C9A959] text-white px-3 py-1 rounded-full tracking-wider uppercase" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                    {s.tag}
                  </span>
                )}
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3
                  className="text-xl mb-2 text-[#1A1A1A]"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#777] leading-relaxed mb-4" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                  {s.desc}
                </p>
                <p className="text-[#C9A959] font-medium text-sm tracking-wide" style={{ fontFamily: 'DM Sans' }}>
                  {s.price}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Button asChild size="lg" variant="default">
              <Link href="/#contact">
                Start a Commission <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-28 bg-[#1A1A1A] text-[#FAF7F2] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vh] rounded-full bg-[#C9A959]/6 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] rounded-full bg-[#8B9A7D]/8 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#C9A959]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                How It Works
              </span>
              <span className="h-px w-12 bg-[#C9A959]" />
            </div>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] text-[#FAF7F2]"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              The Creative Process
            </h2>
            <p className="text-[#888] max-w-xl mx-auto" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
              A seamless journey from concept to completed masterpiece
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-[#C9A959]/20 z-0" />
                )}
                <div className="relative z-10">
                  <div
                    className="text-[#C9A959] text-5xl mb-4 leading-none"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
                  >
                    {step.num}
                  </div>
                  <h3
                    className="text-xl text-[#FAF7F2] mb-3"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                    {step.desc}
                  </p>
                </div>
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
                <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                  Let&apos;s Create Together
                </span>
              </div>
              <h2
                className="text-[clamp(2.5rem,5vw,3.5rem)] text-[#1A1A1A] leading-tight"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                Start Your<br />
                <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Commission</em>
              </h2>
              <p className="text-[#666]" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                Ready to bring your vision to life? Tell me about your project
                and I&apos;ll get back to you within 24–48 hours with a personalized proposal.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-[#555]">
                  <Mail size={16} className="text-[#C9A959] flex-shrink-0" />
                  <span style={{ fontFamily: 'DM Sans' }}>hello@anylystudio.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#555]">
                  <MapPin size={16} className="text-[#C9A959] flex-shrink-0" />
                  <span style={{ fontFamily: 'DM Sans' }}>Ladysmith, Wisconsin · Ships Worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#555]">
                  <Star size={16} className="text-[#C9A959] flex-shrink-0" />
                  <span style={{ fontFamily: 'DM Sans' }}>50% deposit to begin · Balance on delivery</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              action="/api/contact"
              method="POST"
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-widest uppercase text-[#999] block mb-2" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#bbb] focus:outline-none focus:border-[#C9A959] transition-colors"
                    placeholder="Your name"
                    style={{ fontFamily: 'DM Sans' }}
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-[#999] block mb-2" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#bbb] focus:outline-none focus:border-[#C9A959] transition-colors"
                    placeholder="your@email.com"
                    style={{ fontFamily: 'DM Sans' }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-[#999] block mb-2" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                  Commission Type
                </label>
                <select
                  name="type"
                  className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] focus:outline-none focus:border-[#C9A959] transition-colors"
                  style={{ fontFamily: 'DM Sans' }}
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
                <label className="text-xs tracking-widest uppercase text-[#999] block mb-2" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                  Tell Me About Your Vision
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-white border border-[#E8D5A3] rounded-lg px-4 py-3 text-sm text-[#2C2C2C] placeholder:text-[#bbb] focus:outline-none focus:border-[#C9A959] transition-colors resize-none"
                  placeholder="Describe your vision, size preferences, timeline, and any reference images or inspiration you have..."
                  style={{ fontFamily: 'DM Sans' }}
                />
              </div>

              <Button type="submit" variant="default" size="lg" className="w-full">
                Send Commission Request
                <ArrowRight size={16} />
              </Button>

              <p className="text-xs text-center text-[#bbb]" style={{ fontFamily: 'DM Sans' }}>
                I respond within 24–48 hours · No obligation consultation
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1A1A1A] text-[#FAF7F2] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p
              className="text-2xl mb-1"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
            >
              Anyly<span className="text-[#C9A959]">Studio</span>
            </p>
            <p className="text-xs text-[#666] tracking-widest uppercase" style={{ fontFamily: 'DM Sans' }}>
              Ladysmith, Wisconsin
            </p>
          </div>
          <div className="flex gap-8 text-xs text-[#888] tracking-widest uppercase" style={{ fontFamily: 'DM Sans' }}>
            <Link href="/gallery" className="hover:text-[#C9A959] transition-colors">Gallery</Link>
            <Link href="/#services" className="hover:text-[#C9A959] transition-colors">Services</Link>
            <Link href="/#contact" className="hover:text-[#C9A959] transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-[#666]" style={{ fontFamily: 'DM Sans' }}>
            © {new Date().getFullYear()} Anyly Studio · April Johnson
          </p>
        </div>
      </footer>
    </>
  )
}
