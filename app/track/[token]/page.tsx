import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCommission, STAGE_LABELS, STAGE_ORDER } from '@/lib/commission-tracker'
import { CheckCircle, Clock, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Commission Status | Anyly Studio',
  description: 'Track your commission progress.',
  robots: { index: false, follow: false },
}

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export default async function TrackPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const commission = getCommission(token)
  if (!commission) notFound()

  const stageIndex = STAGE_ORDER.indexOf(commission.stage)
  const isShipped = commission.stage === 'shipped'

  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="pt-24 pb-12 px-6 border-b border-[#C9A959]/10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Commission Tracker
            </span>
          </div>
          <h1
            className="text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#F5F0E8] mb-2"
            style={{ ...D, fontWeight: 400 }}
          >
            {commission.pieceTitle}
          </h1>
          <p className="text-[#9A9080] text-sm" style={B}>
            For {commission.clientName} · {commission.medium} · {commission.size}
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        {/* Current status banner */}
        <div className={`rounded-xl p-6 border ${isShipped ? 'border-[#8B9A7D]/40 bg-[#8B9A7D]/10' : 'border-[#C9A959]/30 bg-[#C9A959]/5'}`}>
          <div className="flex items-start gap-4">
            {isShipped
              ? <Package size={20} className="text-[#8B9A7D] shrink-0 mt-0.5" />
              : <Clock size={20} className="text-[#C9A959] shrink-0 mt-0.5 animate-pulse" />
            }
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ ...B, fontWeight: 500, color: isShipped ? '#8B9A7D' : '#C9A959' }}>
                Current Stage
              </p>
              <p className="text-[#F5F0E8] text-lg" style={{ ...D, fontWeight: 400 }}>
                {STAGE_LABELS[commission.stage]}
              </p>
              {!isShipped && (
                <p className="text-[#9A9080] text-xs mt-1" style={B}>
                  Estimated completion: {commission.estimatedCompletion}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stage progress bar */}
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A959] mb-6" style={{ ...B, fontWeight: 500 }}>
            Progress
          </p>
          <div className="space-y-0">
            {STAGE_ORDER.map((stage, i) => {
              const done = i < stageIndex
              const active = i === stageIndex
              const upcoming = i > stageIndex
              return (
                <div key={stage} className="flex gap-4 items-start pb-6 last:pb-0">
                  {/* Dot + line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      done ? 'border-[#C9A959] bg-[#C9A959]'
                      : active ? 'border-[#C9A959] bg-transparent'
                      : 'border-[#2A2520] bg-transparent'
                    }`}>
                      {done && <CheckCircle size={10} className="text-[#0D0D0D]" />}
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A959] animate-pulse" />}
                    </div>
                    {i < STAGE_ORDER.length - 1 && (
                      <div className={`w-px flex-1 mt-1 min-h-[1.5rem] ${done ? 'bg-[#C9A959]/40' : 'bg-[#2A2520]'}`} />
                    )}
                  </div>
                  {/* Label */}
                  <p
                    className={`text-sm pt-0.5 ${
                      done ? 'text-[#C9A959]/60' : active ? 'text-[#F5F0E8]' : 'text-[#4A4035]'
                    }`}
                    style={{ ...B, fontWeight: active ? 500 : 300 }}
                  >
                    {STAGE_LABELS[stage]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Update log */}
        {commission.updates.length > 0 && (
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A959] mb-6" style={{ ...B, fontWeight: 500 }}>
              Updates from April
            </p>
            <div className="space-y-5">
              {[...commission.updates].reverse().map((update, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 pt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A959]/50 mt-1" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6A6055] mb-1" style={B}>{update.date}</p>
                    <p className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                      {update.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact note */}
        <div className="border border-[#C9A959]/15 rounded-xl p-5">
          <p className="text-[#9A9080] text-xs leading-relaxed" style={B}>
            Questions about your commission? Reply to your original commission email or contact{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              contact@anylystudio.com
            </a>{' '}
            — include your name and piece title.
          </p>
        </div>

      </div>
    </div>
  )
}
