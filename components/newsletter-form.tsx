'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 py-4">
        <CheckCircle size={18} className="text-[#8B9A7D] shrink-0" />
        <p className="text-[#F5F0E8] text-sm" style={B}>
          You&apos;re on the list. Expect a note from April soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-white/5 border border-[#C9A959]/20 focus:border-[#C9A959]/60 rounded px-4 py-3 text-sm text-[#F5F0E8] placeholder:text-[#6A6055] outline-none transition-colors"
        style={B}
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A959] hover:bg-[#B8944A] disabled:opacity-60 text-[#0D0D0D] text-[10px] tracking-[0.2em] uppercase rounded transition-colors shrink-0"
        style={{ ...B, fontWeight: 600 }}
      >
        {status === 'loading' ? 'Joining…' : <>Join the List <ArrowRight size={11} /></>}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1 sm:col-span-2" style={B}>
          Something went wrong — try again or email contact@anylystudio.com
        </p>
      )}
    </form>
  )
}
