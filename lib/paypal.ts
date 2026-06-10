// Server-side PayPal Orders v2 helpers. Requires PAYPAL_CLIENT_ID and
// PAYPAL_CLIENT_SECRET; set PAYPAL_ENV=sandbox to hit the sandbox API.
import { CATALOG } from './catalog'

const API_BASE =
  process.env.PAYPAL_ENV === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials are not configured')
  }
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch(`${API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`PayPal authentication failed (${res.status})`)
  }
  const data = await res.json()
  return data.access_token
}

/** Creates a CAPTURE order for a catalog item. Price is resolved server-side
 *  from the sku — never trust amounts from the browser. */
export async function createOrder(sku: string) {
  const item = CATALOG[sku]
  if (!item) {
    throw new Error(`Unknown item: ${sku}`)
  }
  const token = await getAccessToken()
  const res = await fetch(`${API_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: item.sku,
          custom_id: item.sku,
          description: `Anyly Studio — ${item.title}`,
          amount: { currency_code: 'USD', value: item.price },
        },
      ],
    }),
    cache: 'no-store',
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.message || `PayPal order creation failed (${res.status})`)
  }
  return data as { id: string; status: string }
}

export async function captureOrder(orderID: string) {
  const token = await getAccessToken()
  const res = await fetch(`${API_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.message || `PayPal capture failed (${res.status})`)
  }
  return data
}

/** Mirrors the Stripe webhook's Telegram notification. No-ops when the
 *  Telegram env vars are absent; never throws. */
export async function notifyTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  }).catch((err) => console.error('Telegram notify failed:', err))
}
