import type { Metadata } from 'next'
import Image from 'next/image'
import { Smartphone, WifiOff, Bell, Sparkles, Share, PlusSquare, MonitorDown } from 'lucide-react'
import { InstallPrompt } from '@/components/pwa'

export const metadata: Metadata = {
  title: 'Get the App | Anyly Studio',
  description:
    'Install the Anyly Studio app — browse the gallery, shop fine art prints, and commission custom artwork right from your home screen.',
}

const perks = [
  {
    icon: Smartphone,
    title: 'Your gallery, one tap away',
    text: 'Anyly Studio lives on your home screen like any other app — no app store needed.',
  },
  {
    icon: WifiOff,
    title: 'Works offline',
    text: 'Pages you have visited stay available even without a connection.',
  },
  {
    icon: Sparkles,
    title: 'Full-screen experience',
    text: 'No browser bars — just the artwork, edge to edge.',
  },
  {
    icon: Bell,
    title: 'First to see new work',
    text: 'Keep the studio close and never miss a new original or print drop.',
  },
]

export default function AppPage() {
  return (
    <main className="bg-cream dark:bg-neutral-950 min-h-screen">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-14 text-center">
        <div className="mx-auto mb-8 w-24 h-24 rounded-[22%] overflow-hidden shadow-xl ring-1 ring-amber-200 dark:ring-amber-800">
          <Image src="/icons/icon-192.png" alt="Anyly Studio app icon" width={96} height={96} priority />
        </div>
        <h1
          className="text-4xl md:text-5xl text-charcoal dark:text-amber-100 mb-5"
          style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
        >
          Anyly Studio, <span className="text-amber-600">as an app</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Install the studio on your phone or computer — browse the gallery, shop
          fine art prints, and commission a custom piece, all from your home screen.
          Free, instant, and no app store required.
        </p>
      </section>

      {/* Perks */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {perks.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-amber-900 rounded-xl p-6"
            >
              <Icon className="w-6 h-6 text-amber-600 mb-3" />
              <h2
                className="text-lg text-charcoal dark:text-amber-100 mb-1.5"
                style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
              >
                {title}
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to install */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2
          className="text-2xl text-charcoal dark:text-amber-100 mb-8 text-center"
          style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
        >
          How to install
        </h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-amber-900 rounded-xl p-6">
            <h3 className="font-medium text-charcoal dark:text-amber-100 mb-3">iPhone &amp; iPad (Safari)</h3>
            <ol className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
              <li className="flex items-center gap-2">
                <Share size={16} className="text-amber-600 shrink-0" />
                Tap the <strong>Share</strong> button at the bottom of Safari
              </li>
              <li className="flex items-center gap-2">
                <PlusSquare size={16} className="text-amber-600 shrink-0" />
                Scroll down and tap <strong>Add to Home Screen</strong>
              </li>
            </ol>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-amber-900 rounded-xl p-6">
            <h3 className="font-medium text-charcoal dark:text-amber-100 mb-3">Android (Chrome)</h3>
            <ol className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
              <li className="flex items-center gap-2">
                <Smartphone size={16} className="text-amber-600 shrink-0" />
                Tap <strong>Install</strong> when prompted, or choose{' '}
                <strong>Add to Home screen</strong> from the ⋮ menu
              </li>
            </ol>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-amber-900 rounded-xl p-6">
            <h3 className="font-medium text-charcoal dark:text-amber-100 mb-3">Desktop (Chrome &amp; Edge)</h3>
            <ol className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
              <li className="flex items-center gap-2">
                <MonitorDown size={16} className="text-amber-600 shrink-0" />
                Click the <strong>install icon</strong> in the address bar
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Re-offer the install banner on this page even if previously dismissed */}
      <InstallPrompt alwaysShow />
    </main>
  )
}
