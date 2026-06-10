import type { Metadata } from 'next'
import Link from 'next/link'
import { WifiOff } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offline | Anyly Studio',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-cream dark:bg-neutral-950 px-6">
      <div className="text-center max-w-md">
        <WifiOff className="w-10 h-10 text-gold mx-auto mb-6" />
        <h1
          className="text-3xl text-charcoal dark:text-amber-100 mb-4"
          style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
        >
          You&apos;re offline
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm leading-relaxed">
          It looks like you&apos;ve lost your connection. Pages you&apos;ve already
          visited are still available — or try again once you&apos;re back online.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
