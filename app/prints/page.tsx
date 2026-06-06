import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fine Art Prints | Anyly Studio — April Johnson',
  description:
    'Fine art giclée prints of original paintings by April Johnson. Museum-quality printing on archival paper. Landscapes, botanicals, and large-scale works.',
  keywords: [
    'fine art prints', 'giclée prints', 'April Johnson prints', 'botanical art print',
    'landscape painting print', 'Wisconsin artist prints', 'archival art prints',
  ],
  openGraph: {
    title: 'Fine Art Prints | Anyly Studio',
    description: 'Museum-quality giclée prints of original paintings by April Johnson.',
    url: 'https://anylystudio.com/prints',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio Prints' }],
  },
  alternates: { canonical: 'https://anylystudio.com/prints' },
}

const prints = [
  { id: 1, title: 'Northern Wisconsin', category: 'Landscape', img: '/portfolio/5.jpg', sizes: ['8×10', '11×14', '16×20'], basePrice: 35 },
  { id: 2, title: 'Wildflower Field Study', category: 'Botanical', img: '/portfolio/3.jpg', sizes: ['5×7', '8×10', '11×14'], basePrice: 28 },
  { id: 3, title: 'Heritage Oak', category: 'Large Scale', img: '/portfolio/7.jpg', sizes: ['11×14', '16×20', '20×24'], basePrice: 48 },
  { id: 4, title: 'Lake at Dusk', category: 'Landscape', img: '/portfolio/6.jpg', sizes: ['8×10', '11×14', '16×20'], basePrice: 38 },
  { id: 5, title: 'Fern & Moss', category: 'Botanical', img: '/portfolio/4.jpg', sizes: ['5×7', '8×10', '11×14'], basePrice: 25 },
  { id: 6, title: 'Watershed', category: 'Large Scale', img: '/portfolio/8.jpg', sizes: ['16×20', '20×24', '24×30'], basePrice: 55 },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function PrintsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute right-0 bottom-0 text-[13rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none" style={{ ...D, fontWeight: 300 }}>
          Prints
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Fine Art Prints
            </span>
          </div>
          <h1
            className="text-[clamp(3rem,8vw,7rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            Fine Art<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Prints</em>
          </h1>
          <p className="text-[#9A9080] mt-6 max-w-lg text-sm leading-relaxed animate-fade-up delay-200" style={{ ...B, fontWeight: 300 }}>
            Museum-quality giclée prints on archival cotton rag paper. Each print is made to order,
            reviewed by April before shipping, and arrives with a certificate of authenticity.
          </p>
        </div>
      </section>

      {/* Launch banner */}
      <div className="bg-[#141414] border-y border-[#C9A959]/15 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#9A9080] text-sm" style={B}>
            <span className="text-[#C9A959]">Print shop launching soon.</span>{' '}
            Email your order now and we&apos;ll fulfill it manually — or join the list to be notified at launch.
          </p>
          <a
            href="mailto:contact@anylystudio.com?subject=Print Order"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.2em] uppercase rounded transition-colors"
            style={{ ...B, fontWeight: 600 }}
          >
            Order via Email <ArrowRight size={10} />
          </a>
        </div>
      </div>

      {/* Prints grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prints.map((print, i) => (
            <div
              key={print.id}
              className="group bg-[#141414] border border-[#C9A959]/10 hover:border-[#C9A959]/30 rounded-xl overflow-hidden transition-colors duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#1A1A1A]" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={print.img}
                  alt={print.title}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 3 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#8B9A7D] mb-2" style={{ ...B, fontWeight: 500 }}>
                  {print.category}
                </p>
                <h3 className="text-xl text-[#F5F0E8] mb-3" style={{ ...D, fontWeight: 400 }}>
                  {print.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {print.sizes.map((size) => (
                    <span
                      key={size}
                      className="text-[10px] text-[#9A9080] border border-[#C9A959]/15 rounded px-2 py-0.5"
                      style={B}
                    >
                      {size}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[#C9A959] text-lg" style={{ ...D, fontWeight: 400 }}>
                    From ${print.basePrice}
                  </p>
                  <a
                    href={`mailto:contact@anylystudio.com?subject=Print Order: ${print.title}`}
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#C9A959] hover:text-[#B8944A] transition-colors"
                    style={{ ...B, fontWeight: 500 }}
                  >
                    Order <ArrowRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Print spec section */}
      <section className="py-16 px-6 bg-[#141414] border-t border-[#C9A959]/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Print Specifications
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { heading: 'Paper', body: 'Hahnemühle Photo Rag 308gsm — 100% cotton rag, acid-free, archival quality. Rated 100+ year longevity under museum conditions.' },
              { heading: 'Printing', body: 'Giclée printing using 12-color pigment inks. Each print is color-matched to the original and reviewed by April before it ships.' },
              { heading: 'Packaging', body: 'Flat-packed between acid-free interleaving sheets in a rigid board mailer. Prints over 11×14 ship in a telescoping tube.' },
            ].map((spec) => (
              <div key={spec.heading}>
                <div className="h-px w-8 bg-[#C9A959] mb-4" />
                <h3 className="text-lg text-[#F5F0E8] mb-3" style={{ ...D, fontWeight: 600 }}>{spec.heading}</h3>
                <p className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>{spec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0D0D0D] border-t border-[#C9A959]/10 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl text-[#F5F0E8] mb-3" style={{ ...D, fontWeight: 400 }}>
            Want an original instead?
          </h2>
          <p className="text-[#9A9080] text-sm mb-8" style={{ ...B, fontWeight: 300 }}>
            Prints are reproductions of existing work. For something made specifically for you,
            commission an original piece.
          </p>
          <Link
            href="/commissions"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
            style={{ ...B, fontWeight: 600 }}
          >
            Commission an Original <ArrowRight size={11} />
          </Link>
        </div>
      </section>

    </div>
  )
}
