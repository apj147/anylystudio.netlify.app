import type { Metadata } from 'next'
import { PortfolioClient } from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio | Anyly Studio — April Johnson',
  description:
    'Original artwork by April Johnson — pet portraits, botanical studies, landscapes, and large-scale commissions. 18+ years of fine art practice from Glen Flora, Wisconsin.',
  keywords: [
    'art portfolio', 'April Johnson artist', 'pet portrait paintings',
    'botanical art Wisconsin', 'landscape paintings', 'large scale commissions',
    'Wisconsin artist', 'Glen Flora WI',
  ],
  openGraph: {
    title: 'Portfolio | Anyly Studio — April Johnson',
    description:
      'Original artwork by April Johnson — pet portraits, botanical studies, landscapes & large-scale pieces.',
    url: 'https://anylystudio.com/portfolio',
    siteName: 'Anyly Studio',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Anyly Studio Portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Anyly Studio',
    description: 'Original artwork by April Johnson — pet portraits, botanicals, landscapes & large scale.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: 'https://anylystudio.com/portfolio' },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
