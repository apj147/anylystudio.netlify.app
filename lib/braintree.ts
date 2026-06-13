// Server-side Braintree gateway for ACH (US bank account) payments.
// Requires BRAINTREE_MERCHANT_ID / BRAINTREE_PUBLIC_KEY / BRAINTREE_PRIVATE_KEY.
// BRAINTREE_ENV=production switches off the sandbox.
import braintree from 'braintree'
import { CATALOG } from './catalog'

let _gateway: braintree.BraintreeGateway | null = null

function gateway(): braintree.BraintreeGateway {
  if (_gateway) return _gateway
  const merchantId = process.env.BRAINTREE_MERCHANT_ID
  const publicKey = process.env.BRAINTREE_PUBLIC_KEY
  const privateKey = process.env.BRAINTREE_PRIVATE_KEY
  if (!merchantId || !publicKey || !privateKey) {
    throw new Error('Braintree is not configured')
  }
  _gateway = new braintree.BraintreeGateway({
    environment:
      process.env.BRAINTREE_ENV === 'production'
        ? braintree.Environment.Production
        : braintree.Environment.Sandbox,
    merchantId,
    publicKey,
    privateKey,
  })
  return _gateway
}

/** Client token the browser SDK needs to initialise. */
export async function generateClientToken(): Promise<string> {
  const result = await gateway().clientToken.generate({})
  return result.clientToken
}

/** Charge a verified US bank-account nonce by ACH. Amount is resolved
 *  server-side from the sku — never trusted from the browser. */
export async function achSale(sku: string, nonce: string, deviceData?: string) {
  const item = CATALOG[sku]
  if (!item) throw new Error('Unknown item')
  return gateway().transaction.sale({
    amount: item.price,
    paymentMethodNonce: nonce,
    deviceData,
    options: { submitForSettlement: true },
  })
}
