'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  PayPalScriptProvider,
  PayPalButtons,
  PayPalCardFieldsProvider,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from '@paypal/react-paypal-js'

const COUNTRIES: Array<[string, string]> = [
  ['US', 'United States'], ['CA', 'Canada'], ['GB', 'United Kingdom'],
  ['AU', 'Australia'], ['NZ', 'New Zealand'], ['IE', 'Ireland'],
  ['DE', 'Germany'], ['FR', 'France'], ['IT', 'Italy'], ['ES', 'Spain'],
  ['NL', 'Netherlands'], ['BE', 'Belgium'], ['CH', 'Switzerland'],
  ['AT', 'Austria'], ['SE', 'Sweden'], ['NO', 'Norway'], ['DK', 'Denmark'],
  ['FI', 'Finland'], ['PT', 'Portugal'], ['PL', 'Poland'], ['JP', 'Japan'],
  ['MX', 'Mexico'], ['BR', 'Brazil'],
]

// PayPal renders each card field inside its own iframe. The `style` object
// reaches the <input> inside; allowed props are font/color/outline/padding/
// transition (not border). We keep the text calm and let our own container
// (boxClass + focus-within ring) carry the visible border, so empty fields
// no longer flash an alarming red box.
const fieldStyle = {
  input: {
    'font-size': '16px',
    'font-family': 'DM Sans, system-ui, sans-serif',
    color: '#2C2C2C',
    padding: '12px 14px',
    outline: 'none',
    transition: 'color .15s ease',
  },
  ':focus': { color: '#2C2C2C', outline: 'none' },
  '.invalid': { color: '#C0392B', outline: 'none' },
}

const labelClass = 'block text-sm font-semibold text-charcoal dark:text-neutral-200 mb-1.5'
const boxClass =
  'rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden transition focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/40'
const inputClass =
  'w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-3 text-base text-charcoal dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500'

function PayNowButton({ countryCode, postalCode }: { countryCode: string; postalCode: string }) {
  const { cardFieldsForm } = usePayPalCardFields()
  const [busy, setBusy] = useState(false)

  const pay = async () => {
    if (!cardFieldsForm || busy) return
    setBusy(true)
    try {
      // onApprove / onError on the provider take over from here
      await cardFieldsForm.submit({ billingAddress: { postalCode, countryCode } })
    } catch {
      // provider onError already surfaced the message
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      onClick={pay}
      disabled={busy}
      className="w-full rounded-lg bg-[#0070E0] hover:bg-[#0059b2] disabled:opacity-60 text-white font-semibold py-3.5 text-base transition-colors"
    >
      {busy ? 'Processing…' : 'Pay now'}
    </button>
  )
}

export function PayPalCheckout({ sku }: { sku: string }) {
  const router = useRouter()
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const [error, setError] = useState('')
  const [country, setCountry] = useState('US')
  const [zip, setZip] = useState('')

  if (!clientId) {
    return (
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-neutral-900 p-6 text-sm text-neutral-600 dark:text-neutral-400">
        Online checkout is being upgraded and will be back shortly. To purchase
        this piece today, email{' '}
        <a href="mailto:contact@anylystudio.com" className="text-amber-600 underline">
          contact@anylystudio.com
        </a>{' '}
        and April will send you a secure invoice.
      </div>
    )
  }

  const createOrder = async (): Promise<string> => {
    const res = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Could not start checkout')
    return data.id
  }

  const onApprove = async (data: { orderID: string }) => {
    const res = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID }),
    })
    const capture = await res.json()
    if (!res.ok || capture.status !== 'COMPLETED') {
      setError('Your payment could not be completed. You have not been charged — please try again.')
      return
    }
    router.push('/success')
  }

  const onError = () => {
    setError('Something went wrong with the payment. Please check your details and try again.')
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        components: 'buttons,card-fields',
        currency: 'USD',
        intent: 'capture',
        enableFunding: 'paylater,venmo',
      }}
    >
      <div className="space-y-5">
        <PayPalCardFieldsProvider
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={fieldStyle}
        >
          <div>
            <label className={labelClass}>Card number</label>
            <div className={boxClass}>
              <PayPalNumberField />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className={labelClass}>Expiration date</label>
              <div className={boxClass}>
                <PayPalExpiryField />
              </div>
            </div>
            <div>
              <label className={labelClass}>Security code</label>
              <div className={boxClass}>
                <PayPalCVVField />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass}>Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
              {COUNTRIES.map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className={labelClass}>ZIP code</label>
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="12345"
              autoComplete="postal-code"
              className={inputClass}
            />
          </div>

          <div className="mt-5">
            <PayNowButton countryCode={country} postalCode={zip} />
          </div>
        </PayPalCardFieldsProvider>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
          <span className="text-neutral-500 dark:text-neutral-400 text-base">Or pay with</span>
          <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        </div>

        <PayPalButtons
          fundingSource="paypal"
          style={{ layout: 'vertical', color: 'gold', shape: 'rect', height: 48, label: 'paypal' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
        <PayPalButtons
          fundingSource="paylater"
          style={{ layout: 'vertical', color: 'gold', shape: 'rect', height: 48 }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
        <PayPalButtons
          fundingSource="venmo"
          style={{ layout: 'vertical', shape: 'rect', height: 48 }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
        <PayPalButtons
          fundingSource="card"
          style={{ layout: 'vertical', color: 'black', shape: 'rect', height: 48 }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center" role="alert">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-neutral-400">
          Secure payments powered by PayPal
        </p>
      </div>
    </PayPalScriptProvider>
  )
}
