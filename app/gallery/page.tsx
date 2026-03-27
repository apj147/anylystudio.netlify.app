'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

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
  const handleBuyNow = async (art: (typeof artworks)[number]) => {
    if (!art.stripePriceId) return
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: art.stripePriceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/gallery`,
      }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
              Original Artworks
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(3rem,7vw,5rem)] leading-tight text-[#1A1A1A] dark:text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            The Gallery
          </h1>
          <p className="text-[#888] mt-4 max-w-md mx-auto" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
            Every piece is handcrafted to order. Commission your own or start a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art, i) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={art.img}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3
                      className="text-xl text-[#1A1A1A] dark:text-white leading-tight"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                    >
                      {art.title}
                    </h3>
                    <p className="text-amber-600 text-xs tracking-widest uppercase mt-0.5" style={{ fontFamily: 'DM Sans' }}>
                      {art.category}
                    </p>
                  </div>
                  <p className="text-[#C9A959] font-medium text-sm text-right" style={{ fontFamily: 'DM Sans' }}>
                    {art.displayPrice}
                  </p>
                </div>

                <p className="text-[#777] dark:text-neutral-400 text-sm mb-5 leading-relaxed line-clamp-2" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
                  {art.desc}
                </p>

                <div className="flex flex-col gap-2">
                  <Button asChild variant="default" size="sm" className="w-full">
                    <Link href={`/commission?art=${art.id}`}>
                      Commission Similar Piece
                    </Link>
                  </Button>

                  {art.stripePriceId ? (
                    <Button
                      onClick={() => handleBuyNow(art)}
                      size="sm"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-none tracking-widest uppercase text-xs"
                    >
                      Buy Now — Secure Stripe Checkout
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/#contact">Get Custom Quote</Link>
                    </Button>
                  )}
                </div>

                <p className="text-xs text-[#bbb] mt-3 text-center" style={{ fontFamily: 'DM Sans' }}>
                  Secure checkout · Instant invoice via Stripe
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
