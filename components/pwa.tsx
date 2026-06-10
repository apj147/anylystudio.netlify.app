'use client'

import { useEffect, useState } from 'react'
import { X, Share, PlusSquare, Smartphone } from 'lucide-react'

const DISMISS_KEY = 'anyly-install-dismissed'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari legacy flag
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

/** Registers the service worker (production only). */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* registration failure is non-fatal — site works without it */
    })
  }, [])
  return null
}

/**
 * Install banner. Chrome/Android: triggers the native install prompt.
 * iOS Safari: shows Add-to-Home-Screen instructions (no install API on iOS).
 */
export function InstallPrompt({ alwaysShow = false }: { alwaysShow?: boolean }) {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [showIosHelp, setShowIosHelp] = useState(false)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    if (isStandalone()) return // already installed
    if (!alwaysShow && localStorage.getItem(DISMISS_KEY)) return

    setIos(isIos())

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)

    // iOS never fires beforeinstallprompt — show the banner after a short delay
    let timer: ReturnType<typeof setTimeout> | undefined
    if (isIos()) {
      timer = setTimeout(() => setVisible(true), 4000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      if (timer) clearTimeout(timer)
    }
  }, [alwaysShow])

  const dismiss = () => {
    setVisible(false)
    setShowIosHelp(false)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  const install = async () => {
    if (deferred) {
      await deferred.prompt()
      const { outcome } = await deferred.userChoice
      if (outcome === 'accepted') setVisible(false)
      setDeferred(null)
    } else if (ios) {
      setShowIosHelp(true)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 inset-x-4 z-[60] md:left-auto md:right-6 md:w-96">
      <div className="bg-white dark:bg-neutral-900 border border-amber-200 dark:border-amber-800 rounded-xl shadow-xl p-4">
        {showIosHelp ? (
          <div className="text-sm text-neutral-700 dark:text-neutral-300">
            <div className="flex items-start justify-between mb-3">
              <p
                className="text-base text-charcoal dark:text-amber-100"
                style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
              >
                Add Anyly Studio to your Home Screen
              </p>
              <button onClick={dismiss} aria-label="Dismiss" className="p-1 -m-1 text-neutral-400 hover:text-neutral-600">
                <X size={18} />
              </button>
            </div>
            <ol className="space-y-2">
              <li className="flex items-center gap-2">
                <Share size={16} className="text-amber-600 shrink-0" />
                <span>Tap the <strong>Share</strong> button in Safari</span>
              </li>
              <li className="flex items-center gap-2">
                <PlusSquare size={16} className="text-amber-600 shrink-0" />
                <span>Choose <strong>Add to Home Screen</strong></span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Smartphone className="w-8 h-8 text-amber-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p
                className="text-base leading-snug text-charcoal dark:text-amber-100"
                style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}
              >
                Get the Anyly Studio app
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Browse art &amp; commission pieces from your home screen
              </p>
            </div>
            <button
              onClick={install}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-xs font-medium transition-colors shrink-0"
            >
              Install
            </button>
            <button onClick={dismiss} aria-label="Dismiss" className="p-1 text-neutral-400 hover:text-neutral-600 shrink-0">
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
