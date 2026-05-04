import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Policies | Anyly Studio',
  description:
    'Terms of Service, Commission Policy, and Privacy Policy for Anyly Studio — custom artwork by April Johnson, Glen Flora, Wisconsin.',
  robots: { index: true, follow: true },
}

const EFFECTIVE_DATE = 'April 26, 2026'
const CONTACT_EMAIL = 'hello@anylystudio.com'

const sectionNav = [
  { href: '#terms', label: 'Terms of Service' },
  { href: '#commissions', label: 'Commission Policy' },
  { href: '#privacy', label: 'Privacy Policy' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-10 bg-[#C9A959]" />
      <span
        className="text-xs tracking-[0.3em] uppercase text-[#C9A959]"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
      >
        {children}
      </span>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] mb-8 leading-tight"
      style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
    >
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xl text-[#1A1A1A] mt-10 mb-3 pt-2 border-t border-[#E8D5A3]"
      style={{ fontFamily: 'var(--font-display), serif', fontWeight: 600 }}
    >
      {children}
    </h3>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[#555] leading-relaxed space-y-4 text-[0.95rem]"
      style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
    >
      {children}
    </div>
  )
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* Page header */}
      <section className="bg-[#1A1A1A] text-[#FAF7F2] py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[40vw] h-full rounded-full bg-[#C9A959]/6 blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative">
          <SectionLabel>Legal</SectionLabel>
          <h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] leading-tight"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 400 }}
          >
            Terms &amp; Policies
          </h1>
          <p
            className="text-[#888] mt-4 max-w-lg"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
          >
            Last updated: {EFFECTIVE_DATE}. Questions?{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#C9A959] hover:underline transition-colors duration-200"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* Sticky section nav */}
      <nav
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8D5A3] py-3"
        aria-label="Policy sections"
      >
        <div className="max-w-3xl mx-auto px-6 flex gap-6 overflow-x-auto">
          {sectionNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs tracking-widest uppercase text-[#777] hover:text-[#C9A959] transition-colors duration-200 whitespace-nowrap py-1"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-24">

        {/* ── TERMS OF SERVICE ── */}
        <section id="terms" className="scroll-mt-20">
          <SectionLabel>Terms of Service</SectionLabel>
          <SectionHeading>Terms of Service</SectionHeading>

          <Prose>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Anyly Studio
              website at <strong>anylystudio.com</strong> and all related services offered by
              April Johnson (&ldquo;Anyly Studio,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;).
              By accessing or using this site you agree to be bound by these Terms. If you do
              not agree, do not use the site.
            </p>
          </Prose>

          <SubHeading>Acceptable Use</SubHeading>
          <Prose>
            <p>
              You may use this website for lawful personal or commercial purposes only. You agree
              not to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Scrape, crawl, or harvest content, data, or images from this site by automated means.</li>
              <li>Attempt to gain unauthorized access to any part of the site or its backend systems.</li>
              <li>Use the site to transmit spam, malware, or any harmful content.</li>
              <li>Reproduce, redistribute, or sell any artwork or content from this site without written permission.</li>
            </ul>
            <p>
              We reserve the right to terminate access for any user who violates these Terms.
            </p>
          </Prose>

          <SubHeading>Intellectual Property</SubHeading>
          <Prose>
            <p>
              All artwork, images, photographs, text, branding, and design elements displayed on
              this site are the sole property of April Johnson / Anyly Studio and are protected
              by United States copyright law. All rights reserved.
            </p>
            <p>
              Commissioning a piece transfers <strong>physical ownership</strong> of the completed
              artwork to the client. It does <strong>not</strong> transfer copyright, reproduction
              rights, or any other intellectual property rights unless explicitly granted in a
              separate written agreement signed by April Johnson.
            </p>
            <p>
              Anyly Studio retains the right to photograph, display, and promote any commissioned
              work as part of its portfolio unless the client requests otherwise in writing before
              the commission begins.
            </p>
          </Prose>

          <SubHeading>Premium Subscription</SubHeading>
          <Prose>
            <p>
              Premium and Pro subscribers receive a personal, non-transferable, non-commercial
              license to download and use wallpaper images on their own personal devices (phones,
              tablets, computers). This license does not permit:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Commercial use, resale, or redistribution of downloaded files.</li>
              <li>Printing for sale or display in public spaces without a separate license.</li>
              <li>Sharing download files with non-subscribers.</li>
            </ul>
            <p>
              Subscriptions auto-renew monthly or annually at the rate shown at checkout. You may
              cancel at any time from your account settings; cancellation takes effect at the end
              of the current billing period. No partial refunds are issued for unused time.
            </p>
          </Prose>

          <SubHeading>Disclaimer of Warranties</SubHeading>
          <Prose>
            <p>
              This website and its content are provided &ldquo;as is&rdquo; without warranties of any kind,
              express or implied. Anyly Studio does not warrant that the site will be uninterrupted,
              error-free, or free of viruses.
            </p>
          </Prose>

          <SubHeading>Changes to These Terms</SubHeading>
          <Prose>
            <p>
              We may update these Terms from time to time. Continued use of the site after changes
              are posted constitutes acceptance of the revised Terms. Material changes will be
              communicated via the site or by email to active subscribers.
            </p>
          </Prose>
        </section>

        <hr className="border-[#E8D5A3]" />

        {/* ── COMMISSION POLICY ── */}
        <section id="commissions" className="scroll-mt-20">
          <SectionLabel>Commission Policy</SectionLabel>
          <SectionHeading>Commission Policy</SectionHeading>

          <Prose>
            <p>
              This policy governs all custom artwork commissions placed through Anyly Studio.
              By submitting a commission request and paying a deposit, you agree to the terms below.
            </p>
          </Prose>

          <SubHeading>Deposit &amp; Payment</SubHeading>
          <Prose>
            <p>
              A <strong>50% non-refundable deposit</strong> is required to secure your commission.
              The deposit becomes non-refundable once materials have been sourced for your project.
              The remaining 50% balance is due upon your approval of the completed work, before
              the piece ships.
            </p>
            <p>
              Payments are processed securely through our payment processor. Anyly Studio accepts all major credit
              cards and debit cards.
            </p>
          </Prose>

          <SubHeading>Cancellation Window</SubHeading>
          <Prose>
            <p>
              You may cancel a commission within <strong>72 hours of booking</strong> for a full
              refund, provided materials have not yet been sourced. After the 72-hour window — or
              after materials have been sourced, whichever comes first — the deposit is
              non-refundable.
            </p>
            <p>
              To cancel, contact{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#C9A959] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              with your commission reference and the word &ldquo;CANCEL&rdquo; in the subject line.
            </p>
          </Prose>

          <SubHeading>Estimated Delivery Timelines</SubHeading>
          <Prose>
            <p>
              All timelines begin after the deposit is received and materials are confirmed.
              Timelines are estimates and may vary based on complexity and workload.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Pet Portraits:</strong> 4–6 weeks</li>
              <li><strong>Custom &amp; Abstract Commissions:</strong> 6–8 weeks</li>
              <li><strong>Large-Scale Artwork (24&quot; × 36&quot; and above):</strong> 10–16 weeks</li>
            </ul>
            <p>
              April will keep you updated on progress throughout. If you have a hard deadline
              (e.g. a gift), please communicate it at the time of inquiry so we can assess
              feasibility before accepting your deposit.
            </p>
          </Prose>

          <SubHeading>Revisions</SubHeading>
          <Prose>
            <p>
              Each commission includes <strong>two rounds of revisions</strong>, which must be
              requested before the final piece ships. Revisions are limited in scope to adjustments
              within the original brief (color tweaks, minor compositional changes). Requests that
              constitute a fundamentally new piece are not covered.
            </p>
            <p>
              Additional revision rounds beyond the two included are billed at{' '}
              <strong>$75 per round</strong>, invoiced before work begins.
            </p>
          </Prose>

          <SubHeading>Shipping &amp; Delivery</SubHeading>
          <Prose>
            <p>
              All artwork is carefully packaged and shipped via insured carrier. Shipping costs are
              quoted separately and due at the time of final payment. Anyly Studio ships worldwide.
              Risk of loss passes to the client upon handoff to the carrier.
            </p>
          </Prose>

          <SubHeading>Dispute Resolution</SubHeading>
          <Prose>
            <p>
              In the event of a dispute, we ask that you contact us first at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#C9A959] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              so we can work toward a resolution directly. We take every commission seriously and
              will make reasonable efforts to reach a fair outcome.
            </p>
            <p>
              If a resolution cannot be reached informally, disputes shall be governed by the laws
              of the <strong>State of Wisconsin</strong> and subject to the exclusive jurisdiction
              of the courts of <strong>Rusk County, Wisconsin</strong>.
            </p>
          </Prose>

          <SubHeading>Limitation of Liability</SubHeading>
          <Prose>
            <p>
              Anyly Studio&apos;s total liability for any claim arising from a commission is limited
              to the <strong>total amount paid by the client for that commission</strong>. We are
              not liable for indirect, incidental, or consequential damages of any kind.
            </p>
          </Prose>
        </section>

        <hr className="border-[#E8D5A3]" />

        {/* ── PRIVACY POLICY ── */}
        <section id="privacy" className="scroll-mt-20">
          <SectionLabel>Privacy Policy</SectionLabel>
          <SectionHeading>Privacy Policy</SectionHeading>

          <Prose>
            <p>
              This Privacy Policy describes how Anyly Studio collects, uses, and protects your
              personal information when you visit <strong>anylystudio.com</strong> or place a
              commission. We respect your privacy and are committed to handling your data responsibly.
            </p>
          </Prose>

          <SubHeading>Information We Collect</SubHeading>
          <Prose>
            <p>We collect personal information only when you provide it directly, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact form submissions:</strong> name, email address, commission details.</li>
              <li><strong>Payments:</strong> billing name and address (processed by our payment processor — we never see or store full card numbers).</li>
              <li><strong>Email subscriptions:</strong> email address for commission updates and newsletters.</li>
            </ul>
            <p>
              We do not collect data beyond what is necessary to fulfill your commission or respond
              to your inquiry.
            </p>
          </Prose>

          <SubHeading>Third-Party Data Processors</SubHeading>
          <Prose>
            <p>
              We use the following trusted third-party services to operate this site. Each has its
              own privacy policy and data practices:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Payment processor</strong> — billing and fraud-prevention data is handled by our payment processor under their own privacy terms.
              </li>
              <li>
                <strong>Resend</strong> — transactional email delivery (commission confirmations,
                contact form replies).
              </li>
              <li>
                <strong>Vercel</strong> — website hosting and edge delivery. Vercel may collect
                anonymized access logs per their{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A959] hover:underline"
                >
                  Privacy Policy
                </a>.
              </li>
            </ul>
            <p>
              We do not sell, rent, or share your personal information with any other third parties.
            </p>
          </Prose>

          <SubHeading>Cookies</SubHeading>
          <Prose>
            <p>
              Anyly Studio uses <strong>essential cookies only</strong>. These are strictly necessary
              to operate the site (e.g. session management, checkout security). We do not
              use tracking cookies, advertising cookies, or third-party analytics that profile you
              across sites.
            </p>
            <p>
              You may disable cookies in your browser settings; however, doing so may prevent
              certain site features (such as checkout) from functioning correctly.
            </p>
          </Prose>

          <SubHeading>Data Retention</SubHeading>
          <Prose>
            <p>
              Commission-related personal data (name, email, order details) is retained for
              <strong> 7 years</strong> to comply with U.S. federal tax record-keeping requirements.
              Contact form inquiries that do not result in a commission are deleted within
              12 months.
            </p>
          </Prose>

          <SubHeading>Your Rights (Wisconsin Residents)</SubHeading>
          <Prose>
            <p>
              Wisconsin residents have the right under applicable state law to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate personal data.</li>
              <li>Request deletion of your personal data, subject to retention requirements above.</li>
              <li>Opt out of any future marketing communications at any time.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#C9A959] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>. We will respond within 30 days.
            </p>
          </Prose>

          <SubHeading>Security</SubHeading>
          <Prose>
            <p>
              We implement reasonable technical and organizational measures to protect your data.
              All payment processing is handled by our payment processor on PCI-compliant infrastructure.
              The site is served over HTTPS at all times.
            </p>
          </Prose>

          <SubHeading>Contact</SubHeading>
          <Prose>
            <p>
              For any privacy-related questions or requests, reach us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[#C9A959] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Prose>
        </section>

        {/* Back to top */}
        <div className="pt-4 text-center">
          <Link
            href="/"
            className="text-xs tracking-widest uppercase text-[#999] hover:text-[#C9A959] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
          >
            ← Back to Anyly Studio
          </Link>
        </div>

      </div>
    </div>
  )
}
