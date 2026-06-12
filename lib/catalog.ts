// Client-safe product catalog — single source of truth for PayPal checkout.
// Prices here are authoritative. `stripePriceId` is a legacy opaque key the
// gallery still passes; it only maps an artwork to its sku (no Stripe calls).
export type CatalogItem = {
  sku: string
  title: string
  /** USD amount as PayPal expects it, e.g. '500.00' */
  price: string
  displayPrice: string
  image: string
  stripePriceId?: string
}

export const CATALOG: Record<string, CatalogItem> = {
  portrait: {
    sku: 'portrait',
    title: 'Custom Portrait',
    price: '500.00',
    displayPrice: '$500',
    image: '/gallery/1.png',
    stripePriceId: 'price_1TCrRQHDqY3jqf0NlIyep1Tw',
  },
  abstract: {
    sku: 'abstract',
    title: 'Abstract Commission',
    price: '750.00',
    displayPrice: '$750',
    image: '/gallery/2.png',
    stripePriceId: 'price_1TCrRUHDqY3jqf0Nxm3qdFdq',
  },
  landscape: {
    sku: 'landscape',
    title: 'Landscape Painting',
    price: '650.00',
    displayPrice: '$650',
    image: '/gallery/3.png',
    stripePriceId: 'price_1TD9aWHDqY3jqf0NdXTXIEqu',
  },
  botanical: {
    sku: 'botanical',
    title: 'Botanical Study',
    price: '425.00',
    displayPrice: '$425',
    image: '/gallery/4.png',
    stripePriceId: 'price_1TD9abHDqY3jqf0NVcAGlNkv',
  },
  liveedge: {
    sku: 'liveedge',
    title: 'Live-Edge Wood Slab Painting (Large)',
    price: '875.00',
    displayPrice: '$875',
    image: '/gallery/5.png',
    stripePriceId: 'price_1TD9agHDqY3jqf0NUEIcdgJw',
  },
  liveedge2: {
    sku: 'liveedge2',
    title: 'Live-Edge Wood Slab Painting',
    price: '600.00',
    displayPrice: '$600',
    image: '/gallery/5.png',
    stripePriceId: 'price_1TCrRXHDqY3jqf0N7pPL6AOB',
  },
  pet: {
    sku: 'pet',
    title: 'Pet Portrait',
    price: '350.00',
    displayPrice: '$350',
    image: '/gallery/6.png',
    stripePriceId: 'price_1TCrRKHDqY3jqf0NKhvGDETi',
  },
  gift: {
    sku: 'gift',
    title: 'Gift Commission',
    price: '400.00',
    displayPrice: '$400',
    image: '/gallery/7.png',
    stripePriceId: 'price_1TCrRNHDqY3jqf0Nqssg9RSf',
  },
  large: {
    sku: 'large',
    title: 'Large Scale Artwork',
    price: '2000.00',
    displayPrice: '$2,000',
    image: '/gallery/8.png',
    stripePriceId: 'price_1TCrRbHDqY3jqf0NVNepaalD',
  },
  deposit: {
    sku: 'deposit',
    title: 'Commission Deposit',
    price: '150.00',
    displayPrice: '$150',
    image: '/icons/icon-512.png',
  },
}

export function itemByStripePriceId(priceId: string): CatalogItem | undefined {
  return Object.values(CATALOG).find((item) => item.stripePriceId === priceId)
}
