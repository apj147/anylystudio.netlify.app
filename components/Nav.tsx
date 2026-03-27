'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#FAF7F2]/98 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.06)] py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-[#1A1A1A] hover:text-[#C9A959] transition-colors"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
        >
          Anyly<span className="text-[#C9A959]">Studio</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-200 relative group',
                pathname === l.href
                  ? 'text-[#C9A959]'
                  : 'text-[#2C2C2C] hover:text-[#C9A959]'
              )}
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A959] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button asChild size="sm" variant="outline">
            <Link href="/#contact">Commission a Piece</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#2C2C2C]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E8D5A3]/60 overflow-hidden transition-all duration-300',
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.18em] uppercase py-3 border-b border-[#E8D5A3]/40 text-[#2C2C2C] hover:text-[#C9A959] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" variant="default" className="mt-4">
            <Link href="/#contact" onClick={() => setOpen(false)}>
              Commission a Piece
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
