import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Anyly Studio | Custom Artwork & Commissions',
    template: '%s | Anyly Studio',
  },
  description:
    'Where Your Vision Becomes Art. Custom portraits, landscapes, botanical studies, abstract commissions and live-edge wood slab paintings by April Johnson in Ladysmith, Wisconsin.',
  keywords: [
    'custom artwork',
    'art commissions',
    'portrait artist',
    'pet portraits',
    'abstract art',
    'Wisconsin artist',
    'Ladysmith WI',
    'botanical art',
    'landscape painting',
    'live edge wood art',
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
    description:
      'Where Your Vision Becomes Art. Custom artwork by April Johnson, Ladysmith Wisconsin.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anyly Studio — Custom Artwork & Commissions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anyly Studio | Custom Artwork & Commissions',
    description: 'Custom artwork by April Johnson, Ladysmith Wisconsin.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
