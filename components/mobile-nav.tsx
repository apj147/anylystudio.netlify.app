'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className="md:hidden flex items-center gap-1">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-md hover:bg-amber-50 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark'
          ? <Sun size={18} className="text-amber-400" />
          : <Moon size={18} className="text-neutral-600" />
        }
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-amber-50 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle menu"
      >
        {open
          ? <X size={22} className="text-neutral-800 dark:text-neutral-200" />
          : <Menu size={22} className="text-neutral-800 dark:text-neutral-200" />
        }
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-950 border-b border-amber-200 dark:border-amber-900 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-3 border-b border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 text-center py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Commission a Piece
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
