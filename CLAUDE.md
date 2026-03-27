# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build (runs TypeScript + lint)
npm run lint     # ESLint check
```

Deploy by pushing to GitHub — Netlify auto-deploys `main` in ~60s.

**Git push pattern** (local branch is `master`, remote expects `main`):
```bash
"C:\Program Files\Git\bin\git.exe" push origin master:main
```

## Architecture

**Next.js 15 App Router** — all routes under `app/`. No Pages Router.

### Request flow
- Homepage (`app/page.tsx`) — server component, renders all sections (hero, about, gallery preview, services, process, contact form)
- Gallery (`app/gallery/page.tsx`) — server component with `BuyButton` client island
- Commission (`app/commission/page.tsx`) — client component (uses `useSearchParams`), wrapped in `<Suspense>`
- Contact form submits to `app/api/contact/route.ts` → Resend → `hello@anylystudio.com`
- Buy Now hits `app/api/checkout/route.ts` → Stripe Checkout session → redirects to Stripe-hosted page → `/success`

### Key design decisions
- **Stripe is lazy-initialized** via `getStripe()` in `lib/stripe.ts` — prevents build-time crash when `STRIPE_SECRET_KEY` is absent from the build environment
- **`buy-button.tsx`** is the only client component on the gallery page — keeps the page server-rendered for SEO while enabling Stripe redirects
- **Fonts** are loaded via `next/font/google` (Cormorant Garamond + DM Sans) and exposed as CSS variables `--font-display` / `--font-body`. Use `var(--font-display)` in inline styles rather than hardcoded font names
- **Nav + Footer** live in `app/layout.tsx` globally. Do not add them inside individual pages
- **`MobileNav`** (`components/mobile-nav.tsx`) handles hamburger + dark/light mode toggle via `next-themes`

### Brand
- Gold: `#C9A959` · Sage: `#8B9A7D` · Cream: `#FAF7F2` · Charcoal: `#2C2C2C`
- Amber-600 used in the nav/footer shell; gold `#C9A959` used throughout page content — both are intentional

### Stripe price IDs
All 9 price IDs are in `lib/stripe.ts` → `PRICE_IDS`. The gallery hardcodes them inline for simplicity; `PRICE_IDS` is the authoritative source if they need updating.

### Images
Gallery artwork: `public/gallery/1.png` – `9.png`. Both `.jpg` and `.png` exist; `.png` is what the code references.

### Environment variables (set in Netlify)
`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL`, `CONTACT_EMAIL`
