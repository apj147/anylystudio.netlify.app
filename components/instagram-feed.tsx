// Instagram feed component.
// To activate: set INSTAGRAM_ACCESS_TOKEN in Vercel env vars.
// Get a token at: https://developers.facebook.com/docs/instagram-basic-display-api
// Then create /app/api/instagram/route.ts to proxy the feed server-side.
// Until then, this renders a static fallback linking to Instagram.

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const INSTAGRAM_HANDLE = 'anylystudio' // Update when Instagram account is set up

const fallbackPreviews = [
  { src: '/portfolio/1.jpg', alt: 'Pet portrait commission' },
  { src: '/portfolio/3.jpg', alt: 'Botanical watercolor' },
  { src: '/portfolio/5.jpg', alt: 'Northern Wisconsin landscape' },
  { src: '/portfolio/7.jpg', alt: 'Heritage Oak large scale' },
  { src: '/portfolio/2.jpg', alt: 'Portrait commission' },
  { src: '/portfolio/6.jpg', alt: 'Lake at dusk' },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export function InstagramFeed() {
  return (
    <section className="py-20 px-6 bg-[#141414]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-14 bg-[#C9A959]" />
              <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
                From the Studio
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl text-[#F5F0E8]" style={{ ...D, fontWeight: 400 }}>
              Follow the Work
            </h2>
          </div>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-[#C9A959] text-[10px] tracking-widest uppercase hover:gap-3 transition-all"
            style={{ ...B, fontWeight: 500 }}
          >
            @{INSTAGRAM_HANDLE} <ArrowRight size={11} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {fallbackPreviews.map((item, i) => (
            <a
              key={i}
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-[#1A1A1A]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </a>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C9A959] text-[10px] tracking-widest uppercase"
            style={{ ...B, fontWeight: 500 }}
          >
            Follow @{INSTAGRAM_HANDLE} <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </section>
  )
}
