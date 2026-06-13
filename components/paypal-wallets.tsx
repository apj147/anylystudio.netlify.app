'use client'

/*
 * Apple Pay + Google Pay via PayPal's classic JS SDK.
 *
 * These render only when the SDK reports the buyer/device is eligible
 * (Apple Pay → Safari on Apple hardware with a card; Google Pay → a
 * supporting browser). On every other visitor they render nothing, so the
 * component is safe to mount for everyone. Currently gated behind the
 * `showWallets` flag while it is being validated on real devices.
 *
 * Buttons are created via DOM APIs (not JSX) because <apple-pay-button> and
 * Google's createButton() are web components outside React's type system.
 */

import { useEffect, useRef, useState } from 'react'
import { usePayPalScriptReducer } from '@paypal/react-paypal-js'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  amount: string // e.g. '350.00'
  label: string // shown on the Apple Pay sheet
  createOrder: () => Promise<string>
  captureOrder: (orderID: string) => Promise<boolean>
  onCaptured: () => void
  onError: (msg: string) => void
}

const GENERIC_ERR = 'The payment could not be completed. You have not been charged — please try again.'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`failed to load ${src}`))
    document.head.appendChild(s)
  })
}

export function PayPalWallets({ amount, label, createOrder, captureOrder, onCaptured, onError }: Props) {
  const [{ isResolved }] = usePayPalScriptReducer()
  const appleRef = useRef<HTMLDivElement>(null)
  const googleRef = useRef<HTMLDivElement>(null)
  const [appleReady, setAppleReady] = useState(false)
  const [googleReady, setGoogleReady] = useState(false)

  // ---- Apple Pay ----
  useEffect(() => {
    if (!isResolved) return
    const paypal = (window as any).paypal
    const ApplePaySession = (window as any).ApplePaySession
    if (!paypal?.Applepay || !ApplePaySession) return
    try {
      if (!ApplePaySession.canMakePayments()) return
    } catch {
      return // canMakePayments throws on non-HTTPS
    }

    let cancelled = false
    const applepay = paypal.Applepay()

    ;(async () => {
      let config: any
      try {
        config = await applepay.config()
      } catch {
        return
      }
      if (cancelled || !config?.isEligible || !appleRef.current) return

      await loadScript('https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js').catch(() => {})

      const btn = document.createElement('apple-pay-button')
      btn.setAttribute('buttonstyle', 'black')
      btn.setAttribute('type', 'buy')
      btn.setAttribute('locale', 'en-US')
      btn.style.setProperty('--apple-pay-button-width', '100%')
      btn.style.setProperty('--apple-pay-button-height', '48px')
      btn.style.display = 'block'
      btn.style.width = '100%'
      btn.style.height = '48px'
      btn.style.cursor = 'pointer'

      btn.addEventListener('click', () => {
        const paymentRequest = {
          countryCode: config.countryCode || 'US',
          currencyCode: 'USD',
          merchantCapabilities: config.merchantCapabilities,
          supportedNetworks: config.supportedNetworks,
          requiredBillingContactFields: ['postalAddress', 'name'],
          total: { label, amount, type: 'final' },
        }
        const session = new ApplePaySession(4, paymentRequest)

        session.onvalidatemerchant = async (event: any) => {
          try {
            const payload = await applepay.validateMerchant({ validationUrl: event.validationURL })
            session.completeMerchantValidation(payload.merchantSession)
          } catch {
            session.abort()
            onError(GENERIC_ERR)
          }
        }

        session.onpaymentauthorized = async (event: any) => {
          try {
            const orderId = await createOrder()
            await applepay.confirmOrder({
              orderId,
              token: event.payment.token,
              billingContact: event.payment.billingContact,
            })
            const ok = await captureOrder(orderId)
            session.completePayment(ok ? ApplePaySession.STATUS_SUCCESS : ApplePaySession.STATUS_FAILURE)
            if (ok) onCaptured()
            else onError(GENERIC_ERR)
          } catch {
            session.completePayment(ApplePaySession.STATUS_FAILURE)
            onError(GENERIC_ERR)
          }
        }

        session.oncancel = () => {}
        session.begin()
      })

      appleRef.current.innerHTML = ''
      appleRef.current.appendChild(btn)
      setAppleReady(true)
    })()

    return () => {
      cancelled = true
    }
  }, [isResolved, amount, label, createOrder, captureOrder, onCaptured, onError])

  // ---- Google Pay ----
  useEffect(() => {
    if (!isResolved) return
    const paypal = (window as any).paypal
    if (!paypal?.Googlepay) return

    let cancelled = false

    ;(async () => {
      try {
        await loadScript('https://pay.google.com/gp/p/js/pay.js')
      } catch {
        return
      }
      const googleApi = (window as any).google?.payments?.api
      if (cancelled || !googleApi || !googleRef.current) return

      const googlepay = paypal.Googlepay()
      let config: any
      try {
        config = await googlepay.config()
      } catch {
        return
      }
      if (cancelled || !config) return

      const paymentsClient = new googleApi.PaymentsClient({ environment: 'PRODUCTION' })
      try {
        const ready = await paymentsClient.isReadyToPay({
          apiVersion: config.apiVersion,
          apiVersionMinor: config.apiVersionMinor,
          allowedPaymentMethods: config.allowedPaymentMethods,
        })
        if (!ready.result) return
      } catch {
        return
      }
      if (cancelled || !googleRef.current) return

      const onGoogleClick = async () => {
        try {
          const paymentDataRequest = {
            apiVersion: config.apiVersion,
            apiVersionMinor: config.apiVersionMinor,
            allowedPaymentMethods: config.allowedPaymentMethods,
            merchantInfo: config.merchantInfo,
            transactionInfo: {
              countryCode: config.countryCode || 'US',
              currencyCode: 'USD',
              totalPriceStatus: 'FINAL',
              totalPrice: amount,
            },
          }
          const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest)
          const orderId = await createOrder()
          const confirm = await googlepay.confirmOrder({
            orderId,
            paymentMethodData: paymentData.paymentMethodData,
          })
          if (confirm.status === 'APPROVED') {
            const ok = await captureOrder(orderId)
            if (ok) onCaptured()
            else onError(GENERIC_ERR)
          } else {
            onError(GENERIC_ERR)
          }
        } catch (e: any) {
          // user closing the Google sheet throws a CANCELED statusCode — ignore that
          if (e?.statusCode === 'CANCELED') return
          onError(GENERIC_ERR)
        }
      }

      const button = paymentsClient.createButton({
        onClick: onGoogleClick,
        buttonType: 'pay',
        buttonColor: 'black',
        buttonSizeMode: 'fill',
      })
      googleRef.current.innerHTML = ''
      googleRef.current.appendChild(button)
      setGoogleReady(true)
    })()

    return () => {
      cancelled = true
    }
  }, [isResolved, amount, createOrder, captureOrder, onCaptured, onError])

  if (!appleReady && !googleReady) return null

  return (
    <div className="space-y-3">
      <div ref={appleRef} className={appleReady ? 'block' : 'hidden'} />
      <div ref={googleRef} className={googleReady ? 'block' : 'hidden'} />
    </div>
  )
}
