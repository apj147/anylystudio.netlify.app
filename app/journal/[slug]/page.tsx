import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { getPost, getAllSlugs, posts } from '@/lib/journal'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Not Found | Anyly Studio' }
  return {
    title: `${post.title} | Anyly Studio Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://anylystudio.com/journal/${post.slug}`,
      siteName: 'Anyly Studio',
      type: 'article',
      publishedTime: post.date,
      authors: ['April Johnson'],
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
    alternates: { canonical: `https://anylystudio.com/journal/${post.slug}` },
  }
}

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const currentIndex = posts.findIndex((p) => p.slug === slug)
  const prev = posts[currentIndex - 1]
  const next = posts[currentIndex + 1]

  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="pt-24 pb-12 px-6 border-b border-[#C9A959]/10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[#6A6055] hover:text-[#C9A959] text-[10px] tracking-[0.3em] uppercase mb-10 transition-colors"
            style={B}
          >
            <ArrowLeft size={11} /> Journal
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-[9px] tracking-[0.3em] uppercase text-[#8B9A7D] border border-[#8B9A7D]/30 px-2.5 py-1 rounded-full"
              style={{ ...B, fontWeight: 500 }}
            >
              {post.category}
            </span>
            <span className="text-[#4A4035] text-xs" style={B}>{post.readTime}</span>
          </div>

          <h1
            className="text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[#F5F0E8] mb-6"
            style={{ ...D, fontWeight: 400 }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A959]/20 flex items-center justify-center">
              <span className="text-[#C9A959] text-xs" style={{ ...D, fontWeight: 600 }}>AJ</span>
            </div>
            <div>
              <p className="text-[#F5F0E8] text-sm" style={{ ...B, fontWeight: 500 }}>April Johnson</p>
              <p className="text-[#6A6055] text-xs" style={B}>{post.formattedDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2
                  className="text-xl md:text-2xl text-[#F5F0E8] mb-4 mt-10 first:mt-0"
                  style={{ ...D, fontWeight: 600 }}
                >
                  {section.heading}
                </h2>
              )}
              <p className="text-[#9A9080] text-base leading-[1.85]" style={{ ...B, fontWeight: 300 }}>
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Author note */}
        <div className="mt-16 pt-10 border-t border-[#C9A959]/15">
          <p className="text-[#6A6055] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
            <span className="text-[#C9A959]">April Johnson</span> is a fine artist based in Glen Flora, Wisconsin
            with 18+ years of professional practice. She accepts commissions for pet portraits, landscapes,
            botanicals, and large-scale pieces.{' '}
            <Link href="/commissions" className="text-[#C9A959] hover:underline">
              Commission a painting →
            </Link>
          </p>
        </div>
      </article>

      {/* Prev / Next */}
      {(prev || next) && (
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <div className="border-t border-[#C9A959]/10 pt-10 grid sm:grid-cols-2 gap-6">
            {prev && (
              <Link href={`/journal/${prev.slug}`} className="group">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A4035] mb-2 flex items-center gap-2" style={B}>
                  <ArrowLeft size={10} /> Previous
                </p>
                <p className="text-[#F5F0E8] group-hover:text-[#C9A959] transition-colors text-sm leading-snug" style={{ ...D, fontWeight: 400 }}>
                  {prev.title}
                </p>
              </Link>
            )}
            {next && (
              <Link href={`/journal/${next.slug}`} className="group text-right sm:ml-auto">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A4035] mb-2 flex items-center justify-end gap-2" style={B}>
                  Next <ArrowRight size={10} />
                </p>
                <p className="text-[#F5F0E8] group-hover:text-[#C9A959] transition-colors text-sm leading-snug" style={{ ...D, fontWeight: 400 }}>
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
