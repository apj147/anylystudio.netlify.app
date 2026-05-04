import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BuyButton } from '@/components/buy-button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery | Anyly Studio',
  description: 'Browse 9 categories of original artwork by April Johnson — portraits, abstracts, landscapes, botanical studies, pet portraits & more.',
}

const artworks = [
  {
    id: 1,
    title: 'Custom Portraits',
    category: 'Portrait',
    displayPrice: 'Starting at $500',
    desc: 'Timeless portraits capturing personality, emotion, and the unique essence of your subject.',
    img: '/gallery/1.png',
    stripePriceId: 'price_1TCrRQHDqY3jqf0NlIyep1Tw',
  },
  {
    id: 2,
    title: 'Abstract Commissions',
    category: 'Abstract',
    displayPrice: 'Starting at $750',
    desc: 'Bold, expressive pieces designed to complement your space and reflect your personal aesthetic.',
    img: '/gallery/2.png',
    stripePriceId: 'price_1TCrRUHDqY3jqf0Nxm3qdFdq',
  },
  {
    id: 3,
    title: 'Landscape Paintings',
    category: 'Landscape',
    displayPrice: 'Starting at $650',
    desc: 'Breathtaking landscapes bringing the beauty of the natural world into your home.',
    img: '/gallery/3.png',
    stripePriceId: 'price_1TD9aWHDqY3jqf0NdXTXIEqu',
  },
  {
    id: 4,
    title: 'Botanical Studies',
    category: 'Botanical',
    displayPrice: 'Starting at $425',
    desc: 'Elegant, detail-rich botanical artwork celebrating the intricate beauty of plants.',
    img: '/gallery/4.png',
    stripePriceId: 'price_1TD9abHDqY3jqf0NVcAGlNkv',
  },
  {
    id: 5,
    title: 'Live-Edge Wood Slab Paintings',
    category: 'Wood Slab',
    displayPrice: '$600 – $875',
    desc: 'One-of-a-kind artwork painted directly on natural live-edge wood slabs.',
    img: '/gallery/5.png',
    stripePriceId: 'price_1TCrRXHDqY3jqf0N7pPL6AOB',
  },
  {
    id: 6,
    title: 'Pet Portraits',
    category: 'Pet',
    displayPrice: 'Starting at $350',
    desc: 'Celebrate your furry family members with a portrait that captures their unique spirit.',
    img: '/gallery/6.png',
    stripePriceId: 'price_1TCrRKHDqY3jqf0NKhvGDETi',
  },
  {
    id: 7,
    title: 'Gift Commissions',
    category: 'Gift',
    displayPrice: 'Starting at $400',
    desc: 'Create a meaningful, one-of-a-kind gift for weddings, anniversaries, or any special occasion.',
    img: '/gallery/7.png',
    stripePriceId: 'price_1TCrRNHDqY3jqf0Nqssg9RSf',
  },
  {
    id: 8,
    title: 'Large Scale Artwork',
    category: 'Large Scale',
    displayPrice: 'Starting at $2,000',
    desc: 'Statement pieces for homes, offices, and commercial spaces.',
    img: '/gallery/8.png',
    stripePriceId: 'price_1TCrRbHDqY3jqf0NVNepaalD',
  },
  {
    id: 9,
    title: 'Commercial Projects',
    category: 'Commercial',
    displayPrice: 'Contact for Quote',
    desc: 'Bespoke artwork for businesses, restaurants, hotels, and corporate collections.',
    img: '/gallery/9.png',
    stripePriceId: null,
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header — CSS animation, no framer-motion */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Original Artworks
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(3rem,7vw,5rem)] leading-tight text-[#1A1A1A] dark:text-white"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            The Gallery
          </h1>
          <p className="text-[#888] mt-4 max-w-md mx-auto" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            Every piece is handcrafted to order. Commission your own or start a conversation.
          </p>
        </div>

        {/* Grid — CSS stagger animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art, i) => (
            <div
              key={art.id}
              className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={art.img}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  loading={i < 3 ? 'eager' : 'lazy'}
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className="text-xl text-[#1A1A1A] dark:text-white leading-tight"
                      style={{ fontFamily: 'var(--font-display), serif', fontWeight: 600 }}
                    >
                      {art.title}
                    </h3>
                    <p className="text-amber-600 text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                      {art.category}
                    </p>
                  </div>
                  <p className="text-[#C9A959] font-medium text-sm text-right" style={{ fontFamily: 'var(--font-body)' }}>
                    {art.displayPrice}
                  </p>
                </div>

                <p className="text-[#777] dark:text-neutral-400 text-sm mb-5 leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                  {art.desc}
                </p>

                <div className="flex flex-col gap-2">
                  <Button asChild variant="default" size="sm" className="w-full">
                    <Link href={`/commission?art=${art.id}`}>
                      Commission Similar Piece
                    </Link>
                  </Button>

                  {art.stripePriceId ? (
                    <BuyButton priceId={art.stripePriceId} artId={art.id} />
                  ) : (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/#contact">Get Custom Quote</Link>
                    </Button>
                  )}
                </div>

                <p className="text-xs text-[#bbb] mt-3 text-center" style={{ fontFamily: 'var(--font-body)' }}>
                  Secure checkout · Instant invoice
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
