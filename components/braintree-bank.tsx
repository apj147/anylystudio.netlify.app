'use client'

/*
 * "Pay by Bank" via Braintree US bank account (ACH Direct Debit).
 *
 * Collects bank details (routing + account number), tokenizes them with the
 * required ACH mandate, and the server vaults → verifies (network check) →
 * charges. Renders only after the Braintree client token loads and the
 * us-bank-account component initialises (which needs ACH enabled on the
 * merchant); otherwise it renders nothing, so it is safe to mount alongside
 * the PayPal checkout. Gated behind the checkout's test flag.
 */

import { useEffect, useRef, useState } from 'react'
import { Landmark } from 'lucide-react'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  sku: string
  displayAmount: string // e.g. '$350'
  onPaid: () => void
  onError: (msg: string) => void
}

const labelClass = 'block text-xs font-semibold text-charcoal dark:text-neutral-200 mb-1'
const fieldClass =
  'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-charcoal dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sage'

export function BraintreeBank({ sku, displayAmount, onPaid, onError }: Props) {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const usBankRef = useRef<any>(null)
  const deviceDataRef = useRef<string | undefined>(undefined)

  // form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [routing, setRouting] = useState('')
  const [account, setAccount] = useState('')
  const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [zip, setZip] = useState('')

  const MANDATE =
    `By clicking “Pay ${displayAmount} by Bank”, I authorize Anyly Studio to ` +
    `debit the bank account listed above via the ACH network for the amount ` +
    `shown. This authorization remains in effect until I cancel it.`

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/braintree/client-token')
        if (!res.ok) return
        const { clientToken } = await res.json()
        if (cancelled || !clientToken) return

        const [{ default: client }, { default: usBankAccount }, { default: dataCollector }] =
          await Promise.all([
            import('braintree-web/client'),
            import('braintree-web/us-bank-account'),
            import('braintree-web/data-collector'),
          ])

        const clientInstance = await client.create({ authorization: clientToken })
        const usBank = await usBankAccount.create({ client: clientInstance })
        if (cancelled) return
        usBankRef.current = usBank

        try {
          const collector = await dataCollector.create({ client: clientInstance })
          deviceDataRef.current = collector.deviceData
        } catch {
          // device data is best-effort
        }

        setReady(true)
      } catch {
        // Braintree not configured / ACH not enabled — render nothing.
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const valid =
    firstName.trim() &&
    lastName.trim() &&
    /^\d{9}$/.test(routing) &&
    account.trim().length >= 4 &&
    street.trim() &&
    city.trim() &&
    /^[A-Za-z]{2}$/.test(region) &&
    /^\d{5}$/.test(zip)

  const pay = async () => {
    const usBank = usBankRef.current
    if (!usBank || busy || !valid) return
    setBusy(true)
    try {
      const { nonce } = await usBank.tokenize({
        bankDetails: {
          accountNumber: account.trim(),
          routingNumber: routing.trim(),
          accountType,
          ownershipType: 'personal',
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          billingAddress: {
            streetAddress: street.trim(),
            locality: city.trim(),
            region: region.trim().toUpperCase(),
            postalCode: zip.trim(),
          },
        },
        mandateText: MANDATE,
      })

      const res = await fetch('/api/braintree/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nonce, sku, deviceData: deviceDataRef.current }),
      })
      const data = await res.json()
      if (res.ok && data.success) onPaid()
      else onError(data.error || 'Your bank payment could not be completed.')
    } catch {
      onError('Please double-check your bank details and try again.')
    } finally {
      setBusy(false)
    }
  }

  if (!ready) return null

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-sage bg-white dark:bg-neutral-900 hover:bg-sage/5 text-charcoal dark:text-neutral-100 font-semibold py-3 text-base transition-colors"
      >
        <Landmark size={18} className="text-sage" />
        Pay by Bank (ACH)
      </button>
    )
  }

  return (
    <div className="rounded-lg border-2 border-sage p-4 space-y-3">
      <p className="flex items-center gap-2 text-sm font-semibold text-charcoal dark:text-neutral-100">
        <Landmark size={16} className="text-sage" /> Pay directly from your bank
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>First name</label>
          <input className={fieldClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
        </div>
        <div>
          <label className={labelClass}>Last name</label>
          <input className={fieldClass} value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Routing number</label>
          <input className={fieldClass} value={routing} onChange={(e) => setRouting(e.target.value.replace(/\D/g, '').slice(0, 9))} inputMode="numeric" placeholder="9 digits" />
        </div>
        <div>
          <label className={labelClass}>Account number</label>
          <input className={fieldClass} value={account} onChange={(e) => setAccount(e.target.value.replace(/\D/g, ''))} inputMode="numeric" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Account type</label>
        <select className={fieldClass} value={accountType} onChange={(e) => setAccountType(e.target.value as 'checking' | 'savings')}>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Billing street address</label>
        <input className={fieldClass} value={street} onChange={(e) => setStreet(e.target.value)} autoComplete="address-line1" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <label className={labelClass}>City</label>
          <input className={fieldClass} value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input className={fieldClass} value={region} onChange={(e) => setRegion(e.target.value.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase())} placeholder="WI" />
        </div>
        <div>
          <label className={labelClass}>ZIP</label>
          <input className={fieldClass} value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" />
        </div>
      </div>
      <button
        onClick={pay}
        disabled={busy || !valid}
        className="w-full rounded-lg bg-sage hover:bg-sage/90 disabled:opacity-50 text-white font-semibold py-3 text-base transition-colors"
      >
        {busy ? 'Processing…' : `Pay ${displayAmount} by Bank`}
      </button>
      <p className="text-[11px] leading-snug text-neutral-400">
        {MANDATE} Funds settle in a few business days.
      </p>
    </div>
  )
}
