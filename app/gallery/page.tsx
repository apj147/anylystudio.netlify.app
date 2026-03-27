'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Nav } from '@/components/Nav'
import { ArrowRight, ExternalLink } from 'lucide-react'

const artworks = [
  {
    id: 1,
    title: 'Mixed Media Statement',
    category: 'Large Scale',
    medium: 'Mixed media on canvas',
    size: '48 × 60"',
    price: '$2,000+',
    priceNote: 'Large scale from $2,000',
    desc: 'A commanding statement piece built for homes, offices, and commercial spaces that demand bold visual presence and original character.',
    img: '/gallery/1.png',
    stripe: 'large',
    featured: true,
  },
  {
    id: 2,
    title: 'Custom Portrait',
    category: 'Portrait',
    medium: 'Oil on canvas',
    size: '20 × 24"',
    price: '$500+',
    priceNote: 'Custom portraits from $500',
    desc: 'Timeless portraiture capturing personality, emotion, and the unique essence of your subject — painted with warmth and precision.',
    img: '/gallery/2.png',
    stripe: 'portrait',
    featured: true,
  },
  {
    id: 3,
    title: 'Golden Retriever',
    category: 'Pet Portrait',
    medium: 'Oil on board',
    size: '12 × 16"',
    price: '$350+',
    priceNote: 'Pet portraits from $350',
    desc: 'A celebration of the bond between pet and family — painted with the joy and personality that makes each animal irreplaceable.',
    img: '/gallery/3.png',
    stripe: 'pet',
    featured: false,
  },
  {
    id: 4,
    title: 'Wisconsin Autumn',
    category: 'Landscape',
    medium: 'Oil on canvas',
    size: '24 × 36"',
    price: '$650+',
    priceNote: 'Landscapes from $650',
    desc: 'Rolling hills and fiery foliage — a love letter to Wisconsin rendered in warm autumnal light. Regional beauty captured forever.',
    img: '/gallery/4.png',
    stripe: 'landscape',
    featured: false,
  },
  {
    id: 5,
    title: 'Gold & Sage Abstract',
    category: 'Abstract',
    medium: 'Acrylic on canvas',
    size: '30 × 40"',
    price: '$750+',
    priceNote: 'Abstract commissions from $750',
    desc: 'Bold, expressive strokes in signature gold and sage — designed to anchor a room and reflect your personal aesthetic with confidence.',
    img: '/gallery/5.png',
    stripe: 'abstract',
    featured: true,
  },
  {
    id: 6,
    title: 'Winter Birch',
    category: 'Landscape',
    medium: 'Oil on linen',
    size: '18 × 24"',
    price: '$650+',
    priceNote: 'Landscapes from $650',
    desc: 'Serene birch trunks against a pale Wisconsin winter — stillness and silence made visible through careful observation and quiet brushwork.',
    img: '/gallery/6.png',
    stripe: 'landscape',
    featured: false,
  },
  {
    id: 7,
    title: 'Live-Edge Landscape',
    category: 'Live-Edge',
    medium: 'Acrylic on live-edge walnut',
    size: 'Unique slab',
    price: '$600–$875',
    priceNote: 'Live-edge slabs $600–$875',
    desc: 'Painted directly onto a natural walnut slab — the organic edge becomes part of the composition, where nature and art merge completely.',
    img: '/gallery/7.png',
    stripe: 'liveedge',
    featured: true,
  },
  {
    id: 8,
    title: 'Forest Floor Study',
    category: 'Botanical',
    medium: 'Gouache on paper',
    size: '11 × 14"',
    price: '$425+',
    priceNote: 'Botanical studies from $425',
    desc: 'Intricate detail from the forest floor — mosses, ferns, and fallen leaves rendered with patience and a naturalist\'s eye.',
    img: '/gallery/8.png',
    stripe: 'botanical',
    featured: false,
  },
  {
    id: 9,
    title: 'Botanical Still Life',
    category: 'Gift',
    medium: 'Watercolor on paper',
    size: '9 × 12"',
    price: '$400+',
    priceNote: 'Gift commissions from $400',
    desc: 'A gift-ready botanical still life — timeless, elegant, and personal. The kind of piece someone keeps on their wall for a lifetime.',
    img: '/gallery/9.png',
    stripe: 'gift',
    featured: false,
  },
]

const categories = ['All', 'Portrait', 'Abstract', 'Landscape', 'Botanical', 'Large Scale', 'Live-Edge', 'Pet Portrait', 'Gift']

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState<null | typeof artworks[0]>(null)

  const filtered =
    activeCategory === 'All'
      ? artworks
      : artworks.filter((a) => a.category === activeCategory)

  return (
    <>
      <Nav />

      {/* Header */}
      <div className="pt-32 pb-12 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40vw] h-full bg-[#C9A959]/5 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
              Anyly Studio
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h1
              className="text-[clamp(3rem,7vw,5.5rem)] text-[#FAF7F2] leading-none"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Gallery
            </h1>
            <p className="text-[#888] text-sm pb-3" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
              9 original works · Click any piece to commission a similar artwork
            </p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[68px] z-40 bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#E8D5A3]/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex-shrink-0 text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-[#C9A959] text-white shadow-sm'
                  : 'bg-white border border-[#E8D5A3] text-[#888] hover:border-[#C9A959] hover:text-[#C9A959]'
                }
              `}
              style={{ fontFamily: 'DM Sans', fontWeight: 500 }}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-2 opacity-60">
                  {artworks.filter(a => a.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main className="min-h-screen bg-[#FAF7F2] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <div
                key={art.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F0EBE3]"
              >
                {/* Image */}
                <div
                  className="relative aspect-[4/3] overflow-hidden cursor-zoom-in bg-[#F5F0E8]"
                  onClick={() => setLightbox(art)}
                >
                  <Image
                    src={art.img}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {art.featured && (
                    <div className="absolute top-3 left-3 bg-[#C9A959] text-white text-xs px-3 py-1 rounded-full tracking-widest uppercase" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                    <ExternalLink size={18} className="text-white/90" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3
                        className="text-xl text-[#1A1A1A] leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                      >
                        {art.title}
                      </h3>
                      <p className="text-xs tracking-widest uppercase text-[#C9A959] mt-0.5" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                        {art.category}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p
                        className="text-2xl text-[#1A1A1A]"
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
                      >
                        {art.price}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#aaa] mb-1" style={{ fontFamily: 'DM Sans' }}>
                    {art.medium} · {art.size}
                  </p>
                  <p className="text-sm text-[#777] leading-relaxed mt-3 mb-5" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                    {art.desc}
                  </p>

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/#contact?type=${art.stripe}`}>
                      Commission Similar Piece
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-[#bbb]" style={{ fontFamily: 'DM Sans' }}>
              No works in this category yet — check back soon.
            </div>
          )}

          {/* CTA banner */}
          <div className="mt-20 bg-[#1A1A1A] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A959]/10 via-transparent to-[#8B9A7D]/8" />
            <div className="relative">
              <p className="text-[#C9A959] text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
                Ready to Commission?
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] text-[#FAF7F2] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
                Your Vision, Brought to Life
              </h2>
              <p className="text-[#888] mb-8 max-w-lg mx-auto" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                Each piece is unique — priced by size, complexity, and medium. Start with a free consultation.
              </p>
              <Button asChild size="lg" variant="default">
                <Link href="/#contact">Start Your Commission</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-[#F5F0E8]">
              <Image src={lightbox.img} alt={lightbox.title} fill className="object-contain" sizes="800px" />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl text-[#1A1A1A]" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
                  {lightbox.title}
                </h3>
                <p className="text-sm text-[#999] mt-1" style={{ fontFamily: 'DM Sans' }}>
                  {lightbox.medium} · {lightbox.size}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl text-[#C9A959]" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                  {lightbox.price}
                </span>
                <Button asChild size="sm" variant="default">
                  <Link href={`/#contact?type=${lightbox.stripe}`} onClick={() => setLightbox(null)}>Commission</Link>
                </Button>
                <button onClick={() => setLightbox(null)} className="text-[#bbb] hover:text-[#2C2C2C] transition-colors text-2xl leading-none">×</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-[#FAF7F2] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-xl" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}>
            Anyly<span className="text-[#C9A959]">Studio</span>
          </Link>
          <p className="text-xs text-[#666]" style={{ fontFamily: 'DM Sans' }}>
            © {new Date().getFullYear()} Anyly Studio · April Johnson · Ladysmith, WI
          </p>
        </div>
      </footer>
    </>
  )
}
