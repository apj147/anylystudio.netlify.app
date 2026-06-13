'use client'

/*
 * "Pay by Bank" via Braintree US bank account (ACH Direct Debit).
 *
 * Renders only after the Braintree client token loads and the us-bank-account
 * component initialises (which requires ACH enabled on the merchant). On any
 * failure it renders nothing, so it is safe to mount alongside the PayPal
 * checkout. Currently gated behind the checkout's test flag.
 *
 * Flow: tokenize via bank login (Plaid) → server charges the nonce by ACH.
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

export function BraintreeBank({ sku, displayAmount, onPaid, onError }: Props) {
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const usBankRef = useRef<any>(null)
  const deviceDataRef = useRef<string | undefined>(undefined)

  const MANDATE =
    `By clicking “Pay ${displayAmount} by Bank”, I authorize Anyly Studio to ` +
    `electronically debit my bank account via the ACH network for the amount ` +
    `shown, and I agree this authorization stays in effect until I cancel it.`

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

  const pay = async () => {
    const usBank = usBankRef.current
    if (!usBank || busy) return
    setBusy(true)
    try {
      const { nonce } = await usBank.tokenize({
        bankLogin: { displayName: 'Anyly Studio' },
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
    } catch (e: any) {
      const code = e?.code || ''
      // Buyer closed the bank-login window — not an error worth surfacing.
      if (code.includes('LOGIN_CLOSED') || code.includes('LOGIN_REQUEST_ACTIVE')) return
      onError('Your bank payment could not be completed.')
    } finally {
      setBusy(false)
    }
  }

  if (!ready) return null

  return (
    <div className="space-y-2">
      <button
        onClick={pay}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-sage bg-white dark:bg-neutral-900 hover:bg-sage/5 disabled:opacity-60 text-charcoal dark:text-neutral-100 font-semibold py-3 text-base transition-colors"
      >
        <Landmark size={18} className="text-sage" />
        {busy ? 'Connecting your bank…' : `Pay ${displayAmount} by Bank`}
      </button>
      <p className="text-[11px] leading-snug text-neutral-400 px-1">
        Pay directly from your checking account (ACH). You&apos;ll securely sign in to your
        bank — no card needed. Funds settle in a few business days.
      </p>
    </div>
  )
}
