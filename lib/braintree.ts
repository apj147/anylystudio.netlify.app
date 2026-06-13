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

type AchResult =
  | { success: true; id: string; status: string }
  | { success: false; message: string }

/** Charge a US bank account by ACH. Per Braintree's ACH rules a bank nonce is
 *  NOT directly transactable — it must be vaulted and verified first. So we:
 *  1) create a transient customer, 2) vault the payment method with an instant
 *  network-check verification, 3) only charge if it verified. Amount is
 *  resolved server-side from the sku — never trusted from the browser. */
export async function achSale(
  sku: string,
  nonce: string,
  deviceData?: string
): Promise<AchResult> {
  const item = CATALOG[sku]
  if (!item) return { success: false, message: 'Unknown item' }
  const gw = gateway()

  const customer = await gw.customer.create({})
  if (!customer.success) {
    return { success: false, message: 'Could not start the bank payment.' }
  }

  const pm = await gw.paymentMethod.create({
    customerId: customer.customer.id,
    paymentMethodNonce: nonce,
    // @types/braintree lags the SDK and omits this valid ACH option.
    options: { usBankAccountVerificationMethod: 'network_check' } as unknown as Record<string, never>,
  })
  if (!pm.success) {
    return { success: false, message: pm.message || 'Your bank account could not be saved.' }
  }

  // us_bank_account payment methods expose `verified` + `token`
  const method = pm.paymentMethod as unknown as { verified?: boolean; token: string }
  if (!method.verified) {
    return { success: false, message: 'We could not verify your bank account. Please check the details and try again.' }
  }

  const sale = await gw.transaction.sale({
    amount: item.price,
    paymentMethodToken: method.token,
    deviceData,
    options: { submitForSettlement: true },
  })
  if (!sale.success) {
    return { success: false, message: sale.message || 'Your bank payment was declined.' }
  }
  // ACH settles asynchronously — status is typically settlement_pending.
  return { success: true, id: sale.transaction.id, status: sale.transaction.status }
}
