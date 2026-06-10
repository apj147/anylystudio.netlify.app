'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Images, Frame, Brush, Menu, X } from 'lucide-react'

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/gallery', label: 'Gallery', icon: Images },
  { href: '/prints', label: 'Prints', icon: Frame },
  { href: '/commissions', label: 'Commission', icon: Brush },
]

const moreLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About April' },
  { href: '/process', label: 'The Process' },
  { href: '/journal', label: 'Journal' },
  { href: '/gift', label: 'Gift a Commission' },
  { href: '/premium', label: 'Premium ✦' },
  { href: '/faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
]

/**
 * Bottom tab bar for the installed app experience.
 * Hidden in regular browsers — revealed by the `standalone-only` class
 * (CSS `display-mode: standalone` media query) on screens below md.
 */
export function AppTabBar() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="standalone-only md:hidden">
      {moreOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/40"
          onClick={() => setMoreOpen(false)}
          aria-hidden
        />
      )}

      {moreOpen && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom))] inset-x-3 z-[56] bg-white dark:bg-neutral-900 border border-amber-200 dark:border-amber-800 rounded-xl shadow-xl overflow-hidden">
          <div className="px-5 py-2">
            {moreLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMoreOpen(false)}
                className="block text-sm font-medium py-3 border-b last:border-b-0 border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav
        className="fixed bottom-0 inset-x-0 z-[57] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-t border-amber-200 dark:border-amber-800"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="App navigation"
      >
        <div className="flex items-stretch justify-around h-14">
          {tabs.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMoreOpen(false)}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 text-[10px] font-medium transition-colors ${
                  active
                    ? 'text-amber-600'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-amber-600'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                {label}
              </Link>
            )
          })}
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 text-[10px] font-medium transition-colors ${
              moreOpen ? 'text-amber-600' : 'text-neutral-500 dark:text-neutral-400 hover:text-amber-600'
            }`}
            aria-expanded={moreOpen}
          >
            {moreOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={1.8} />}
            More
          </button>
        </div>
      </nav>
    </div>
  )
}
