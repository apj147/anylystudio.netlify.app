import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Anyly Studio',
  description:
    'Refund and cancellation policy for Anyly Studio commissions, prints, and digital products. Understand your rights and the deposit policy before commissioning.',
  alternates: { canonical: 'https://anylystudio.com/refund' },
}

const D = { fontFamily: 'var(--font-display), Georgia, serif' } as const
const B = { fontFamily: 'var(--font-body), system-ui, sans-serif' } as const

const sections = [
  {
    title: 'Commission Deposits',
    body: [
      'The $150 commission deposit is non-refundable. It compensates for the time reserved in the queue, the initial consultation, and the preparatory work completed before painting begins.',
      'The deposit is applied toward the total balance of your commission. It does not expire — if you need to pause or reschedule your commission after paying the deposit, contact April within 90 days to reschedule without penalty.',
      'Deposits paid more than 90 days before the commission slot becomes active may be forfeited if no communication is received.',
    ],
  },
  {
    title: 'Commission Cancellations',
    body: [
      'If you cancel a commission after the agreement is signed but before work begins, the deposit is forfeited. No additional charges apply.',
      'If you cancel after work has begun (sketch or painting stage), the deposit is forfeited and a partial fee may be assessed based on the percentage of work completed. This will be outlined in your commission agreement.',
      'Anyly Studio reserves the right to cancel a commission if reference materials are not received within 30 days of agreement signing. The deposit is refunded in full in this case.',
    ],
  },
  {
    title: 'Finished Commissions',
    body: [
      'All sales of completed original artwork are final. Because each piece is made to order for a specific client, refunds on completed commissions are not offered.',
      'If the finished piece materially departs from the agreed brief — subject matter, medium, or size — April will work with you to address the issue through targeted revisions or, in rare cases, a full repaint. This is handled case-by-case.',
      'Contact contact@anylystudio.com within 7 days of delivery to report any concerns about the finished work.',
    ],
  },
  {
    title: 'Shipping Damage & Loss',
    body: [
      'All shipments are insured. If your piece arrives damaged, photograph the damage and packaging immediately and email contact@anylystudio.com within 48 hours of delivery.',
      'Anyly Studio will file the insurance claim and either repair, reprint, or repaint the piece at no additional charge, depending on the nature of the damage.',
      'If a shipment is lost in transit, Anyly Studio will file a claim and, once the claim is resolved, ship a replacement at no charge.',
    ],
  },
  {
    title: 'Fine Art Prints',
    body: [
      'Print orders are fulfilled on demand and are not eligible for refund once the order is placed, unless the print arrives damaged or defective.',
      'If a print arrives damaged or is printed with a defect (color shift, banding, misalignment), contact contact@anylystudio.com with photos within 7 days. A replacement will be sent at no charge.',
      'Size and paper selection are final at the time of order. Ensure your size and format selections are correct before completing purchase.',
    ],
  },
  {
    title: 'Digital Products & Premium Subscriptions',
    body: [
      'Digital downloads (wallpapers, references, and digital files) are non-refundable once accessed.',
      'Premium subscriptions may be cancelled at any time. No partial refunds are issued for the remainder of a billing period. Access continues until the period ends.',
    ],
  },
  {
    title: 'Business & Institutional Clients',
    body: [
      'Business commissions are governed by the terms in the signed commission agreement, which may include milestone-based billing, net payment terms, and project-specific cancellation clauses.',
      'When a business commission agreement conflicts with this general policy, the signed agreement takes precedence.',
      'Contact contact@anylystudio.com for all business billing disputes.',
    ],
  },
  {
    title: 'How to Request a Refund or File a Dispute',
    body: [
      'Email contact@anylystudio.com with your order or commission reference number, a description of the issue, and any supporting photos.',
      'April responds to all refund and dispute inquiries within 2–3 business days.',
      'If a resolution cannot be reached directly, disputes may be escalated through your payment processor (card issuer or Whop support).',
    ],
  },
]

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">

      {/* Header */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div
          className="absolute right-0 bottom-0 text-[14rem] leading-none text-[#FAF7F2]/[0.015] select-none pointer-events-none"
          style={{ ...D, fontWeight: 300 }}
        >
          Policy
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <span className="h-px w-14 bg-[#C9A959]" />
            <span className="text-[10px] tracking-[0.45em] uppercase text-[#C9A959]" style={{ ...B, fontWeight: 500 }}>
              Legal
            </span>
          </div>
          <h1
            className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-[#F5F0E8] animate-fade-up delay-100"
            style={{ ...D, fontWeight: 300 }}
          >
            Refund &<br />
            <em className="text-[#C9A959]" style={{ fontStyle: 'italic' }}>Cancellation Policy</em>
          </h1>
          <p className="text-[#9A9080] mt-6 text-sm" style={{ ...B, fontWeight: 300 }}>
            Last updated June 2026 · Questions?{' '}
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">
              contact@anylystudio.com
            </a>
          </p>
        </div>
      </section>

      {/* Policy sections */}
      <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12">
        {sections.map((s, i) => (
          <section
            key={i}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl md:text-2xl text-[#F5F0E8]" style={{ ...D, fontWeight: 600 }}>
                {s.title}
              </h2>
              <div className="flex-1 h-px bg-[#C9A959]/15" />
            </div>
            <div className="space-y-4">
              {s.body.map((p, j) => (
                <p key={j} className="text-[#9A9080] text-sm leading-relaxed" style={{ ...B, fontWeight: 300 }}>
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer strip */}
      <section className="py-12 px-6 bg-[#141414] border-t border-[#C9A959]/10 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[#9A9080] text-sm mb-6 leading-relaxed" style={B}>
            This policy is effective as of June 2026 and applies to all purchases made through
            anylystudio.com and associated Whop storefronts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-xs" style={B}>
            <Link href="/terms" className="text-[#C9A959] hover:underline">Terms & Policies</Link>
            <span className="text-[#4A4035] hidden sm:inline">·</span>
            <Link href="/faq" className="text-[#C9A959] hover:underline">FAQ</Link>
            <span className="text-[#4A4035] hidden sm:inline">·</span>
            <a href="mailto:contact@anylystudio.com" className="text-[#C9A959] hover:underline">Contact</a>
          </div>
        </div>
      </section>

    </div>
  )
}
