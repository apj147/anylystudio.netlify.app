'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = ['All', 'Pet Portraits', 'Botanical', 'Landscape', 'Large Scale'] as const
type Category = typeof CATEGORIES[number]

const artworks = [
  { id: 1, title: 'Luna', category: 'Pet Portraits' as Category, medium: 'Acrylic on canvas', size: '16 × 20 in', year: 2024, status: 'commissioned' as const, img: '/portfolio/1.jpg' },
  { id: 2, title: 'Golden Study No. 3', category: 'Pet Portraits' as Category, medium: 'Acrylic on canvas', size: '11 × 14 in', year: 2025, status: 'available' as const, img: '/portfolio/2.jpg' },
  { id: 3, title: 'Wildflower Field', category: 'Botanical' as Category, medium: 'Watercolor on paper', size: '9 × 12 in', year: 2024, status: 'available' as const, img: '/portfolio/3.jpg' },
  { id: 4, title: 'Fern & Moss', category: 'Botanical' as Category, medium: 'Oil on board', size: '8 × 10 in', year: 2023, status: 'commissioned' as const, img: '/portfolio/4.jpg' },
  { id: 5, title: 'Northern Wisconsin', category: 'Landscape' as Category, medium: 'Oil on canvas', size: '18 × 24 in', year: 2025, status: 'available' as const, img: '/portfolio/5.jpg' },
  { id: 6, title: 'Lake at Dusk', category: 'Landscape' as Category, medium: 'Acrylic on canvas', size: '24 × 30 in', year: 2024, status: 'commissioned' as const, img: '/portfolio/6.jpg' },
  { id: 7, title: 'Heritage Oak', category: 'Large Scale' as Category, medium: 'Oil on canvas', size: '36 × 48 in', year: 2025, status: 'available' as const, img: '/portfolio/7.jpg' },
  { id: 8, title: 'Watershed', category: 'Large Scale' as Category, medium: 'Acrylic on canvas', size: '48 × 60 in', year: 2024, status: 'commissioned' as const, img: '/portfolio/8.jpg' },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export function PortfolioClient() {
  const [active, setActive] = useState<Category>('All')
  const filtered = active === 'All' ? artworks : artworks.filter((a) => a.category === active)

  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <div className="relative pt-24 pb-16 px-6 overflow-hidden">

        {/* Giant background label */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 text-[14rem] leading-none text-[#FAF7F2]/[0.018] select-none pointer-events-none whitespace-nowrap pl-4"
          style={{ ...D, fontWeight: 300 }}
        >
          Portfolio
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Selected Works
            </span>
          </div>
          <h1
            className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            Portfolio
          </h1>
          <p
            className="text-[#9A9080] mt-5 max-w-md text-sm leading-relaxed animate-fade-up delay-200"
            style={{ ...B, fontWeight: 300 }}
          >
            Original and commissioned work by April Johnson — 18+ years in practice,
            exhibiting since 2004.
          </p>
        </div>
      </div>

      {/* Category filter — minimal text tabs */}
      <div className="sticky top-[72px] z-40 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#C9A959]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 py-2 text-[10px] tracking-[0.3em] uppercase transition-all duration-200 rounded ${
                active === cat
                  ? 'text-[#C9A959] border-b border-[#C9A959]'
                  : 'text-[#6A6055] hover:text-[#C9A959]/70'
              }`}
              style={{ ...B, fontWeight: active === cat ? 600 : 400 }}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-[10px] text-[#4A4035] shrink-0" style={B}>
            {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
          </span>
        </div>
      </div>

      {/* Editorial masonry grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-32 text-[#6A6055] text-sm" style={B}>
            No works in this category yet.
          </div>
        ) : (
          <div
            style={{ columns: '2 340px', columnGap: '12px' }}
          >
            {filtered.map((art, i) => (
              <div
                key={art.id}
                className="group relative overflow-hidden rounded-lg animate-fade-up"
                style={{
                  breakInside: 'avoid',
                  marginBottom: '12px',
                  animationDelay: `${i * 60}ms`,
                  animationFillMode: 'both',
                  aspectRatio: i % 3 === 0 ? '4/5' : i % 3 === 1 ? '3/4' : '5/6',
                }}
              >
                {/* Image */}
                <Image
                  src={art.img}
                  alt={`${art.title} — ${art.medium}`}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 3 ? 'eager' : 'lazy'}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Gold border reveal on hover */}
                <div className="absolute inset-0 border border-[#C9A959]/0 group-hover:border-[#C9A959]/30 transition-all duration-500 rounded-lg" />

                {/* Badge — top right */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded text-[9px] tracking-[0.25em] uppercase backdrop-blur-sm ${
                      art.status === 'available'
                        ? 'bg-[#8B9A7D]/80 text-white'
                        : 'bg-[#0D0D0D]/70 text-[#C9A959] border border-[#C9A959]/30'
                    }`}
                    style={{ ...B, fontWeight: 500 }}
                  >
                    {art.status === 'available' ? 'Available' : 'Commissioned'}
                  </span>
                </div>

                {/* Info — slides up on hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <h3
                    className="text-xl text-[#F5F0E8] leading-tight mb-1"
                    style={{ ...D, fontWeight: 600 }}
                  >
                    {art.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A959] mb-2" style={{ ...B, fontWeight: 500 }}>
                    {art.category}
                  </p>
                  <div className="flex items-center gap-2 text-[#9A9080] text-xs" style={B}>
                    <span>{art.medium}</span>
                    <span className="w-px h-3 bg-[#C9A959]/30" />
                    <span>{art.size}</span>
                    <span className="w-px h-3 bg-[#C9A959]/30" />
                    <span>{art.year}</span>
                  </div>
                </div>

                {/* Year — visible always, top left */}
                <div className="absolute top-3 left-3 opacity-60 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[10px] text-[#9A9080]" style={B}>{art.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="border-t border-[#C9A959]/10 py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Commission Your Own
            </span>
            <span className="h-px w-14 bg-[#C9A959]" />
          </div>
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] text-[#F5F0E8] mb-4 leading-tight"
            style={{ ...D, fontWeight: 400 }}
          >
            Ready to begin your piece?
          </h2>
          <p className="text-[#9A9080] mb-10 text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
            Every commission is a collaboration built around your vision.
            Reserve your slot and let&apos;s create something made to last.
          </p>
          <Link
            href="/commissions"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-xs tracking-[0.25em] uppercase transition-colors rounded"
            style={{ ...B, fontWeight: 600 }}
          >
            Start a Commission
          </Link>
        </div>
      </div>
    </div>
  )
}
