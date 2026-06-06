import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Palette } from 'lucide-react'
import Link from 'next/link'
import { MobileNav } from '@/components/mobile-nav'
import { Analytics } from '@/components/analytics'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal'],
  variable: '--font-display',
  display: 'optional',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anyly Studio | Custom Artwork & Commissions',
  description:
    'Where Your Vision Becomes Art. Handcrafted custom portraits, abstracts, landscapes & more by April Johnson in Glen Flora, Wisconsin.',
  keywords: [
    'custom artwork', 'art commissions', 'portrait artist', 'pet portraits',
    'abstract art', 'Wisconsin artist', 'Glen Flora WI', 'botanical art',
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
    description: 'Where Your Vision Becomes Art. Custom artwork by April Johnson, Glen Flora, Wisconsin.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio — Custom Artwork & Commissions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anyly Studio | Custom Artwork & Commissions',
    description: 'Custom artwork by April Johnson, Glen Flora, Wisconsin.',
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
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['LocalBusiness', 'ArtGallery'],
                  '@id': 'https://anylystudio.com/#business',
                  name: 'Anyly Studio',
                  description: 'Custom artwork and commissions by April Johnson — pet portraits, landscapes, botanicals, and large-scale pieces.',
                  url: 'https://anylystudio.com',
                  email: 'contact@anylystudio.com',
                  address: { '@type': 'PostalAddress', addressLocality: 'Glen Flora', addressRegion: 'WI', addressCountry: 'US' },
                  priceRange: '$150–$2,000+',
                  founder: { '@id': 'https://anylystudio.com/#april' },
                  sameAs: [],
                },
                {
                  '@type': 'Person',
                  '@id': 'https://anylystudio.com/#april',
                  name: 'April Johnson',
                  jobTitle: 'Fine Artist',
                  worksFor: { '@id': 'https://anylystudio.com/#business' },
                  alumniOf: [
                    { '@type': 'CollegeOrUniversity', name: 'University of Florida', description: 'BFA 2007' },
                    { '@type': 'CollegeOrUniversity', name: 'Miami Dade College', description: 'AA 2005' },
                  ],
                  knowsAbout: ['pet portrait painting', 'landscape painting', 'botanical art', 'acrylic painting', 'oil painting', 'large scale artwork'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://anylystudio.com/#website',
                  url: 'https://anylystudio.com',
                  name: 'Anyly Studio',
                  publisher: { '@id': 'https://anylystudio.com/#business' },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased" style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}>
        <Analytics />
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

              <div className="hidden md:flex items-center gap-7 text-sm font-medium">
                <Link href="/portfolio" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Portfolio</Link>
                <Link href="/prints" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Prints</Link>
                <Link href="/gallery" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Gallery</Link>
                <Link href="/commissions" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Commissions</Link>
                <Link href="/journal" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">Journal</Link>
                <Link href="/faq" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-600 transition-colors">FAQ</Link>
                <Link href="/premium" className="text-[#C9A959] font-semibold hover:text-[#A8883A] transition-colors">Premium</Link>
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
                  <p className="text-sm">Handcrafted in Glen Flora, Wisconsin</p>
                  <p className="text-xs mt-6">&copy; {new Date().getFullYear()} April Johnson. All Rights Reserved.</p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Quick Links</h4>
                  <div className="flex flex-col gap-2 text-sm">
                    <Link href="/portfolio" className="hover:text-amber-400 transition-colors">Portfolio</Link>
                    <Link href="/prints" className="hover:text-amber-400 transition-colors">Fine Art Prints</Link>
                    <Link href="/about" className="hover:text-amber-400 transition-colors">About April</Link>
                    <Link href="/gallery" className="hover:text-amber-400 transition-colors">Gallery</Link>
                    <Link href="/commissions" className="hover:text-amber-400 transition-colors">Commissions</Link>
                    <Link href="/gift" className="hover:text-amber-400 transition-colors">Gift a Commission</Link>
                    <Link href="/process" className="hover:text-amber-400 transition-colors">The Process</Link>
                    <Link href="/journal" className="hover:text-amber-400 transition-colors">Journal</Link>
                    <Link href="/faq" className="hover:text-amber-400 transition-colors">FAQ</Link>
                    <Link href="/refund" className="hover:text-amber-400 transition-colors">Refund Policy</Link>
                    <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms & Policies</Link>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Connect</h4>
                  <p className="text-sm">contact@anylystudio.com</p>
                  <p className="text-sm mt-1">Glen Flora, Wisconsin · Ships Worldwide</p>
                  <div className="mt-8 text-xs">
                    Secure online payments<br />
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
