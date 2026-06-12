import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { CATALOG } from '@/lib/catalog'
import { PayPalCheckout } from '@/components/paypal-checkout'

export const metadata: Metadata = {
  title: 'Checkout | Anyly Studio',
  robots: { index: false, follow: false },
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>
}) {
  const { item } = await searchParams
  const product = item ? CATALOG[item] : undefined
  if (!product) notFound()

  return (
    <main className="bg-cream dark:bg-neutral-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Order summary */}
          <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-amber-900 rounded-xl p-6">
            <h1
              className="text-2xl text-charcoal dark:text-amber-100 mb-6"
              style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
            >
              Your Order
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800">
                <Image src={product.image} alt={product.title} fill className="object-cover" sizes="96px" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-charcoal dark:text-neutral-100">{product.title}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">One-of-a-kind, handcrafted by April Johnson</p>
              </div>
            </div>
            <div className="border-t border-neutral-100 dark:border-neutral-800 mt-6 pt-4 flex items-center justify-between">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Total</span>
              <span
                className="text-2xl text-charcoal dark:text-amber-100"
                style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
              >
                {product.displayPrice}
              </span>
            </div>
            <p className="flex items-center gap-2 text-xs text-neutral-400 mt-6">
              <ShieldCheck size={14} className="text-sage shrink-0" />
              Secure checkout · Ships nationwide (US only) · 24–48&nbsp;hour response on every order
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-neutral-900 border border-amber-100 dark:border-amber-900 rounded-xl p-6">
            <PayPalCheckout sku={product.sku} />
          </div>
        </div>
      </div>
    </main>
  )
}
