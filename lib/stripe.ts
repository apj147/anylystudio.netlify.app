import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

// Price ID map — all 8 real Anyly Studio products
export const PRICE_IDS = {
  portrait:   'price_1TCrRQHDqY3jqf0NlIyep1Tw', // Custom Portrait        $500
  abstract:   'price_1TCrRUHDqY3jqf0Nxm3qdFdq', // Abstract Commission    $750
  landscape:  'price_1TD9aWHDqY3jqf0NdXTXIEqu', // Landscape Painting     $650
  botanical:  'price_1TD9abHDqY3jqf0NVcAGlNkv', // Botanical Study        $425
  liveedge:   'price_1TD9agHDqY3jqf0NUEIcdgJw', // Live-Edge Wood Slab    $875
  liveedge2:  'price_1TCrRXHDqY3jqf0N7pPL6AOB', // Live-Edge Wood Slab    $600
  pet:        'price_1TCrRKHDqY3jqf0NKhvGDETi', // Pet Portrait           $350
  gift:       'price_1TCrRNHDqY3jqf0Nqssg9RSf', // Gift Commission        $400
  large:      'price_1TCrRbHDqY3jqf0NVNepaalD', // Large Scale Artwork    $2,000
} as const
