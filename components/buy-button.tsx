'use client'

import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { itemByStripePriceId } from '@/lib/catalog'

interface BuyButtonProps {
  // Opaque catalog key passed by the gallery (legacy name from the Stripe era;
  // now just maps to a sku via the catalog). Payments go through PayPal.
  priceId: string | null
  artId: number
}

export function BuyButton({ priceId }: BuyButtonProps) {
  const handleBuyNow = useCallback(() => {
    if (!priceId) return
    const sku = itemByStripePriceId(priceId)?.sku
    if (sku) window.location.href = `/checkout?item=${sku}`
  }, [priceId])

  if (!priceId) return null

  return (
    <Button
      onClick={handleBuyNow}
      size="sm"
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-none tracking-widest uppercase text-xs"
    >
      Buy Now — Secure Checkout
    </Button>
  )
}
