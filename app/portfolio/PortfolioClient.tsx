'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = ['All', 'Pet Portraits', 'Botanical', 'Landscape', 'Large Scale'] as const
type Category = typeof CATEGORIES[number]

const artworks = [
  {
    id: 1,
    title: 'Luna',
    category: 'Pet Portraits' as Category,
    medium: 'Acrylic on canvas',
    size: '16 × 20 in',
    year: 2024,
    status: 'commissioned' as const,
    img: '/portfolio/1.jpg',
  },
  {
    id: 2,
    title: 'Golden Study No. 3',
    category: 'Pet Portraits' as Category,
    medium: 'Acrylic on canvas',
    size: '11 × 14 in',
    year: 2025,
    status: 'available' as const,
    img: '/portfolio/2.jpg',
  },
  {
    id: 3,
    title: 'Wildflower Field',
    category: 'Botanical' as Category,
    medium: 'Watercolor on paper',
    size: '9 × 12 in',
    year: 2024,
    status: 'available' as const,
    img: '/portfolio/3.jpg',
  },
  {
    id: 4,
    title: 'Fern & Moss',
    category: 'Botanical' as Category,
    medium: 'Oil on board',
    size: '8 × 10 in',
    year: 2023,
    status: 'commissioned' as const,
    img: '/portfolio/4.jpg',
  },
  {
    id: 5,
    title: 'Northern Wisconsin',
    category: 'Landscape' as Category,
    medium: 'Oil on canvas',
    size: '18 × 24 in',
    year: 2025,
    status: 'available' as const,
    img: '/portfolio/5.jpg',
  },
  {
    id: 6,
    title: 'Lake at Dusk',
    category: 'Landscape' as Category,
    medium: 'Acrylic on canvas',
    size: '24 × 30 in',
    year: 2024,
    status: 'commissioned' as const,
    img: '/portfolio/6.jpg',
  },
  {
    id: 7,
    title: 'Heritage Oak',
    category: 'Large Scale' as Category,
    medium: 'Oil on canvas',
    size: '36 × 48 in',
    year: 2025,
    status: 'available' as const,
    img: '/portfolio/7.jpg',
  },
  {
    id: 8,
    title: 'Watershed',
    category: 'Large Scale' as Category,
    medium: 'Acrylic on canvas',
    size: '48 × 60 in',
    year: 2024,
    status: 'commissioned' as const,
    img: '/portfolio/8.jpg',
  },
]

export function PortfolioClient() {
  const [active, setActive] = useState<Category>('All')

  const filtered =
    active === 'All' ? artworks : artworks.filter((a) => a.category === active)

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Selected Works
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(3rem,7vw,5rem)] leading-tight text-[#2C2C2C] dark:text-white"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            Portfolio
          </h1>
          <p
            className="text-[#888] dark:text-neutral-400 mt-3 max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Original and commissioned work by April Johnson, 18+ years in practice.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-up delay-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs tracking-[0.18em] uppercase rounded-full border transition-all duration-200 ${
                active === cat
                  ? 'bg-[#C9A959] border-[#C9A959] text-white'
                  : 'border-[#C9A959]/40 text-[#2C2C2C] dark:text-neutral-300 hover:border-[#C9A959] hover:text-[#C9A959]'
              }`}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((art, i) => (
            <div
              key={art.id}
              className="group bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
            >
              {/* Image — 4:5 aspect */}
              <div className="relative overflow-hidden bg-[#E8D5A3]/40" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={art.img}
                  alt={`${art.title} — ${art.medium}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase ${
                      art.status === 'available'
                        ? 'bg-[#8B9A7D]/90 text-white'
                        : 'bg-[#2C2C2C]/80 text-[#C9A959]'
                    }`}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    {art.status === 'available' ? 'Available' : 'Commissioned'}
                  </span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-4">
                <h3
                  className="text-lg text-[#2C2C2C] dark:text-white leading-tight mb-1"
                  style={{ fontFamily: 'var(--font-display), serif', fontWeight: 600 }}
                >
                  {art.title}
                </h3>
                <p
                  className="text-[#8B9A7D] text-xs tracking-wider uppercase mb-2"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                >
                  {art.category}
                </p>
                <div
                  className="flex justify-between text-xs text-[#999] dark:text-neutral-500"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  <span>{art.medium}</span>
                  <span>{art.size}</span>
                </div>
                <div
                  className="text-xs text-[#bbb] dark:text-neutral-600 mt-1"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                >
                  {art.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#aaa]" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
            No works in this category yet.
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center border-t border-[#E8D5A3]/50 pt-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              Commission Your Own
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] text-[#2C2C2C] dark:text-white mb-4"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            Ready to begin your piece?
          </h2>
          <p
            className="text-[#888] dark:text-neutral-400 mb-8 max-w-md mx-auto text-sm"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Every commission is a collaboration. Reserve your slot and let&apos;s create
            something made for you.
          </p>
          <Link
            href="/commissions"
            className="inline-flex items-center justify-center px-10 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-white text-sm tracking-widest uppercase rounded-md transition-colors"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            Start a Commission
          </Link>
        </div>

      </div>
    </div>
  )
}
