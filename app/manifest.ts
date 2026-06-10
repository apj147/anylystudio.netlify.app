import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Anyly Studio — Custom Artwork & Commissions',
    short_name: 'Anyly Studio',
    description:
      'Where Your Vision Becomes Art. Handcrafted custom portraits, abstracts, landscapes & more by April Johnson.',
    id: '/',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#FAF7F2',
    theme_color: '#FAF7F2',
    categories: ['art', 'shopping', 'lifestyle'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: 'Gallery', url: '/gallery', description: 'Browse available artwork' },
      { name: 'Commission a Piece', url: '/commissions', description: 'Start a custom commission' },
      { name: 'Fine Art Prints', url: '/prints', description: 'Shop fine art prints' },
    ],
  }
}
