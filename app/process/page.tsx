import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Painting Process | Anyly Studio — April Johnson',
  description:
    'Go behind the canvas. See how April Johnson builds a commission from reference consultation to finished piece — sketch, block-in, detail, and final varnish.',
  keywords: [
    'painting process', 'how to paint a portrait', 'commission process steps',
    'April Johnson painting', 'before and after painting', 'oil painting process',
    'acrylic portrait process',
  ],
  openGraph: {
    title: 'The Painting Process | Anyly Studio',
    description: 'How April Johnson builds a commission from reference to finished piece.',
    url: 'https://anylystudio.com/process',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://anylystudio.com/process' },
}

const stages = [
  {
    n: '01',
    title: 'Reference Review & Consultation',
    body: 'Every commission starts with conversation. April reviews the client\'s reference photos, asks about the intended space, preferred mood, and any compositional notes. This stage often reveals details — a particular quality of light, a telling gesture — that shape every decision that follows.',
    note: 'What clients receive: a composition proposal and confirmation of size, medium, and estimated timeline before a brushstroke is made.',
    img: '/portfolio/1.jpg',
  },
  {
    n: '02',
    title: 'Compositional Sketch',
    body: 'The image is mapped in pencil or charcoal on the prepared surface. Proportions, values, and the major light/shadow relationships are established here. For complex multi-subject pieces, a tonal study may be completed on paper first.',
    note: 'This is the structural foundation of the painting. Changes requested at this stage cost nothing — changes requested after paint is applied cost time.',
    img: '/portfolio/3.jpg',
  },
  {
    n: '03',
    title: 'Color Block-In',
    body: 'Thin, diluted color is applied across the entire canvas to establish the major temperature relationships and tonal structure. The goal is not detail but harmony — making sure the overall color logic of the piece is correct before committing to heavier paint.',
    note: 'A progress photo is sent to the client at this stage. This is the easiest moment to course-correct on color direction.',
    img: '/portfolio/5.jpg',
  },
  {
    n: '04',
    title: 'Detail Pass',
    body: 'With the foundation established, April builds specificity — the texture of fur, the planes of a face, the edge quality of leaves against sky. This stage typically takes the longest and is where the piece transforms from a study into a painting.',
    note: 'A second progress photo is sent before the final layer. This is the last opportunity for targeted revisions.',
    img: '/portfolio/7.jpg',
  },
  {
    n: '05',
    title: 'Finishing & Quality Review',
    body: 'Final glazes, corrections, and (for oil paintings) a varnish coat are applied. The finished piece is photographed under controlled lighting and reviewed against the reference materials. April signs the piece on the front and documents dimensions and medium on the back.',
    note: 'A final photo is sent for client approval before packaging. The balance invoice is issued at this stage.',
    img: '/portfolio/2.jpg',
  },
]

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute right-0 bottom-0 text-[13rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none" style={{ ...D, fontWeight: 300 }}>
          Process
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Behind the Canvas
            </span>
          </div>
          <h1
            className="text-[clamp(3rem,8vw,7rem)] leading-[0.88] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            The Painting<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Process</em>
          </h1>
          <p className="text-[#9A9080] mt-6 max-w-lg text-sm leading-relaxed animate-fade-up delay-200" style={{ ...B, fontWeight: 300 }}>
            How a commission moves from reference photo to finished painting — every
            stage, what happens at each step, and when you&apos;re involved.
          </p>
        </div>
      </section>

      {/* Stages */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-0 divide-y divide-[#C9A959]/10">
        {stages.map((stage, i) => (
          <div
            key={stage.n}
            className={`py-16 grid md:grid-cols-2 gap-12 items-center animate-fade-up ${i % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            {/* Image */}
            <div className={`relative rounded-xl overflow-hidden bg-[#1A1A1A] ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`} style={{ aspectRatio: '4/3' }}>
              <Image
                src={stage.img}
                alt={stage.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading={i < 2 ? 'eager' : 'lazy'}
              />
              {/* Stage number watermark */}
              <div
                className="absolute bottom-4 right-4 text-[5rem] leading-none text-white/10 select-none pointer-events-none"
                style={{ ...D, fontWeight: 300 }}
              >
                {stage.n}
              </div>
            </div>

            {/* Content */}
            <div className={i % 2 === 1 ? 'md:[direction:ltr]' : ''}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[#C9A959]/30 text-sm"
                  style={{ ...D, fontWeight: 300 }}
                >
                  {stage.n}
                </span>
                <div className="h-px flex-1 bg-[#C9A959]/15" />
              </div>
              <h2
                className="text-2xl md:text-3xl text-[#F5F0E8] mb-5 leading-tight"
                style={{ ...D, fontWeight: 400 }}
              >
                {stage.title}
              </h2>
              <p className="text-[#9A9080] text-sm leading-relaxed mb-6" style={{ ...B, fontWeight: 300 }}>
                {stage.body}
              </p>
              <div className="border-l-2 border-[#C9A959]/30 pl-4">
                <p className="text-[#C9A959]/70 text-xs leading-relaxed italic" style={{ ...B, fontWeight: 300 }}>
                  {stage.note}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add your own before/after note */}
      <section className="py-12 px-6 bg-[#141414] border-y border-[#C9A959]/10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#6A6055] text-xs leading-relaxed" style={B}>
            Progress photos from active commissions are shared privately with each client.
            If you&apos;d like to see examples of process photos from past commissions,{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              email April
            </a>
            {' '}— she&apos;s happy to share samples before you commit to a commission.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0D0D0D] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#F5F0E8] mb-4" style={{ ...D, fontWeight: 400 }}>
            Ready to begin yours?
          </h2>
          <p className="text-[#9A9080] text-sm mb-10 leading-relaxed" style={{ ...B, fontWeight: 300 }}>
            Now that you know what to expect — start with a $150 deposit to reserve
            your slot and April will reach out to begin the consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/commissions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C9A959] hover:bg-[#B8944A] text-[#0D0D0D] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 600 }}
            >
              Start a Commission <ArrowRight size={11} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C9A959]/40 hover:border-[#C9A959] text-[#C9A959] text-[10px] tracking-[0.25em] uppercase rounded transition-colors"
              style={{ ...B, fontWeight: 500 }}
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
