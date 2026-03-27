'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ContactForm from '@/components/ContactForm'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Map art ID → commission type value
const artTypeMap: Record<string, string> = {
  '1': 'portrait',
  '2': 'abstract',
  '3': 'landscape',
  '4': 'botanical',
  '5': 'liveedge',
  '6': 'pet',
  '7': 'gift',
  '8': 'large',
  '9': 'commercial',
}

const artTitles: Record<string, string> = {
  '1': 'Custom Portraits',
  '2': 'Abstract Commissions',
  '3': 'Landscape Paintings',
  '4': 'Botanical Studies',
  '5': 'Live-Edge Wood Slab',
  '6': 'Pet Portraits',
  '7': 'Gift Commissions',
  '8': 'Large Scale Artwork',
  '9': 'Commercial Projects',
}

function CommissionInner() {
  const searchParams = useSearchParams()
  const artId = searchParams.get('art')
  const defaultType = artId ? artTypeMap[artId] : undefined
  const artTitle = artId ? artTitles[artId] : undefined

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-neutral-950 py-16">
      <div className="max-w-4xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A959]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#C9A959]" style={{ fontFamily: 'DM Sans', fontWeight: 500 }}>
              Let&apos;s Create Together
            </span>
            <span className="h-px w-12 bg-[#C9A959]" />
          </div>
          <h1
            className="text-[clamp(3rem,7vw,5rem)] leading-tight text-[#1A1A1A] dark:text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            Start Your<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Commission</em>
          </h1>
          <p className="text-[#888] mt-4 max-w-md mx-auto" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
            Tell me about your vision and I&apos;ll respond within 24–48 hours with a personalized proposal.
          </p>
        </motion.div>

        {artId && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-10 flex justify-center"
          >
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-2xl shadow-md flex gap-5 items-center max-w-sm border border-[#E8D5A3]/60">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={`/gallery/${artId}.png`}
                  alt={artTitle ?? 'Selected artwork'}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-amber-600 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'DM Sans' }}>
                  Inspired by
                </p>
                <p
                  className="text-[#1A1A1A] dark:text-white text-lg leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                >
                  {artTitle}
                </p>
                <p className="text-xs text-[#999] mt-1" style={{ fontFamily: 'DM Sans' }}>
                  Commission type pre-selected below
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-md border border-[#E8D5A3]/40"
        >
          <ContactForm defaultType={defaultType} />
        </motion.div>

      </div>
    </div>
  )
}

export default function CommissionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#C9A959] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CommissionInner />
    </Suspense>
  )
}
