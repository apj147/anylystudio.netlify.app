'use client'

import { useCallback } from 'react'
import { Button } from '@/components/ui/button'

interface BuyButtonProps {
  priceId: string | null
  artId: number
}

export function BuyButton({ priceId, artId }: BuyButtonProps) {
  const handleBuyNow = useCallback(async () => {
    if (!priceId) return
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
