'use client'

import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { itemByStripePriceId } from '@/lib/catalog'

interface BuyButtonProps {
  priceId: string | null
  artId: number
}

// When a PayPal client id is configured, checkout goes through /checkout
// (PayPal). Otherwise the original Stripe flow below remains active.
const PAYPAL_ENABLED = Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)

export function BuyButton({ priceId, artId }: BuyButtonProps) {
  const handleBuyNow = useCallback(async () => {
    if (!priceId) return
    if (PAYPAL_ENABLED) {
      const sku = itemByStripePriceId(priceId)?.sku
      if (sku) {
        window.location.href = `/checkout?item=${sku}`
        return
      }
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/gallery`,
      }),
    })
    const { url } = await res.json()
    if (url) window.location.href = url
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
