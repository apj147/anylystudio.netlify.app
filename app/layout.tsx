import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
import Link from 'next/link'
import { MobileNav } from '@/components/mobile-nav'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'optional',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anyly Studio | Custom Artwork & Commissions',
  description:
    'Where Your Vision Becomes Art. Handcrafted custom portraits, abstracts, landscapes & more by April Johnson in Ladysmith, Wisconsin.',
  keywords: [
    'custom artwork', 'art commissions', 'portrait artist', 'pet portraits',
    'abstract art', 'Wisconsin artist', 'Ladysmith WI', 'botanical art',
    'landscape painting', 'live edge wood art',
  ],
  authors: [{ name: 'April Johnson' }],
  creator: 'April Johnson',
  metadataBase: new URL('https://anylystudio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anylystudio.com',
    siteName: 'Anyly Studio',
    title: 'Anyly Studio | Custom Artwork & Commissions',
    description: 'Where Your Vision Becomes Art. Custom artwork by April Johnson, Ladysmith Wisconsin.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio — Custom Artwork & Commissions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anyly Studio | Custom Artwork & Commissions',
    description: 'Custom artwork by April Johnson, Ladysmith Wisconsin.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

          {/* Global Sticky Nav */}
          <nav className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-amber-200 dark:border-amber-800 relative">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <Palette className="w-7 h-7 text-amber-600" />
                <span
                  className="text-2xl tracking-tight text-neutral-900 dark:text-amber-100"
                  style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
                >
                  Anyly<span className="text-amber-600">Studio</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <Link href="/#about" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">About</Link>
                <Link href="/gallery" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Gallery</Link>
                <Link href="/#services" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Services</Link>
                <Link href="/#process" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Process</Link>
                <Link href="/#contact" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Contact</Link>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="font-medium border-amber-600 text-amber-600 hover:bg-amber-50 hidden sm:flex"
                >
                  <Link href="/#contact">Commission a Piece</Link>
                </Button>
                <MobileNav />
              </div>
            </div>
          </nav>

          {children}

          {/* Global Footer */}
          <footer className="bg-neutral-900 text-neutral-400 py-16">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-7 h-7 text-amber-600" />
                    <span
                      className="text-2xl text-white"
                      style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
                    >
                      Anyly<span className="text-amber-600">Studio</span>
                    </span>
                  </div>
                  <p className="text-sm">Handcrafted in Ladysmith, Wisconsin</p>
                  <p className="text-xs mt-6">&copy; {new Date().getFullYear()} April Johnson. All Rights Reserved.</p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Quick Links</h4>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/gallery" className="hover:text-amber-400 transition-colors">Gallery</Link>
                    <Link href="/#services" className="hover:text-amber-400 transition-colors">Services</Link>
                    <Link href="/#process" className="hover:text-amber-400 transition-colors">Our Process</Link>
                    <Link href="/#contact" className="hover:text-amber-400 transition-colors">Start a Commission</Link>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Connect</h4>
                  <p className="text-sm">hello@anylystudio.com</p>
                  <p className="text-sm mt-1">Ladysmith, Wisconsin · Ships Worldwide</p>
                  <div className="mt-8 text-xs">
                    Secure payments powered by <span className="text-emerald-400">Stripe</span><br />
                    Instant invoices · Professional receipts
                  </div>
                </div>
              </div>
            </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  )
}
