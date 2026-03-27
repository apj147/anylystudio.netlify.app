import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowRight, Mail } from 'lucide-react'

export default function SuccessPage() {
  return (
    <>
      <main className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 pt-24">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-[#C9A959]/15 flex items-center justify-center">
              <CheckCircle size={40} className="text-[#C9A959]" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <p
              className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
              style={{ fontFamily: 'DM Sans', fontWeight: 500 }}
            >
              Order Confirmed
            </p>
            <h1
              className="text-[clamp(2.5rem,6vw,4rem)] text-[#1A1A1A] leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Thank You!
            </h1>
          </div>

          {/* Body */}
          <div className="space-y-4 text-[#666]" style={{ fontFamily: 'DM Sans', fontWeight: 300 }}>
            <p className="text-lg">
              Your order has been received. Stripe has emailed you the invoice and receipt.
            </p>
            <div className="bg-white border border-[#E8D5A3] rounded-xl p-6 text-left space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#C9A959] mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong className="text-[#2C2C2C] font-medium">Check your inbox</strong> — Stripe sent a receipt and invoice to your email address.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-[#8B9A7D] mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong className="text-[#2C2C2C] font-medium">April will reach out within 24–48 hours</strong> to begin your commission consultation.
                </p>
              </div>
            </div>
            <p className="text-sm text-[#aaa]">
              Questions? Email{' '}
              <a href="mailto:hello@anylystudio.com" className="text-[#C9A959] hover:underline">
                hello@anylystudio.com
              </a>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild variant="default" size="lg">
              <Link href="/gallery">
                Browse More Art <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">Start Another Commission</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
