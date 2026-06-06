import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { posts } from '@/lib/journal'

export const metadata: Metadata = {
  title: 'Journal | Anyly Studio — April Johnson',
  description:
    'Commission guides, studio notes, and art advice from April Johnson — how to take reference photos, choosing canvas sizes, what to expect from a commission.',
  keywords: [
    'art commission guide', 'pet portrait reference photos', 'how to commission a painting',
    'canvas size guide', 'April Johnson studio notes', 'commission advice Wisconsin artist',
  ],
  openGraph: {
    title: 'Journal | Anyly Studio',
    description: 'Commission guides and studio notes from April Johnson.',
    url: 'https://anylystudio.com/journal',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio Journal' }],
  },
  alternates: { canonical: 'https://anylystudio.com/journal' },
}

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div
          className="absolute right-0 bottom-0 text-[14rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none"
          style={{ ...D, fontWeight: 300 }}
        >
          Journal
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Studio Notes
            </span>
          </div>
          <h1
            className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            The<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Journal</em>
          </h1>
          <p className="text-[#9A9080] mt-6 max-w-md text-sm leading-relaxed animate-fade-up delay-200" style={{ ...B, fontWeight: 300 }}>
            Commission guides, studio observations, and practical advice from 18+ years
            of fine art practice.
          </p>
        </div>
      </section>

      {/* Post list */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-0 divide-y divide-[#C9A959]/10">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group block py-10 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase text-[#8B9A7D] border border-[#8B9A7D]/30 px-2.5 py-1 rounded-full"
                      style={{ ...B, fontWeight: 500 }}
                    >
                      {post.category}
                    </span>
                    <span className="text-[#4A4035] text-xs" style={B}>{post.readTime}</span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl text-[#F5F0E8] group-hover:text-[#C9A959] transition-colors duration-300 leading-tight mb-3"
                    style={{ ...D, fontWeight: 400 }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-[#9A9080] text-sm leading-relaxed max-w-xl" style={{ ...B, fontWeight: 300 }}>
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[#C9A959]/0 group-hover:text-[#C9A959] transition-colors duration-300 mt-2 md:mt-0">
                  <span className="text-[10px] tracking-widest uppercase hidden md:block" style={B}>Read</span>
                  <ArrowRight size={14} />
                </div>
              </div>
              <p className="text-[#4A4035] text-xs mt-4" style={B}>{post.formattedDate}</p>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-32 text-[#6A6055] text-sm" style={B}>
            First entry coming soon.
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#141414] border-t border-[#C9A959]/10 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[#9A9080] text-sm mb-6" style={{ ...B, fontWeight: 300 }}>
            Have a question not covered here? Email April directly — she responds within 24–48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@anylystudio.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Ask April <ArrowRight size={11} />
            </a>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 500 }}
            >
              Browse FAQ
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
