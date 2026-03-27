# ============================================================
# ANYLY STUDIO — CLAUDE CODE AGENT MASTER PROMPT
# Save as: CLAUDE.md in repo root
# Run with: claude (from C:\Users\OMEN PC\anylystudio-nextjs\)
# ============================================================

# CONTEXT
You are working on AnylyStudio.com — a premium custom artwork commission
website for April Johnson in Ladysmith, Wisconsin.

**Live URL:** https://anylystudio.com
**Stack:** Next.js 15.3.3 · TypeScript · Tailwind CSS · Framer Motion · Resend
**Repo:** C:\Users\OMEN PC\anylystudio-nextjs\
**Deploy:** Push to GitHub → Netlify auto-deploys

**Brand colors:**
- Gold: #C9A959
- Sage: #8B9A7D
- Cream: #FAF7F2
- Charcoal: #2C2C2C
- Soft Black: #1A1A1A
- Terracotta: #C17F59

**Fonts:** Cormorant Garamond (headings) · DM Sans (body)

**Services + Stripe prices:**
- Custom Portraits $500 · Abstract Commissions $750
- Landscape Paintings $650 · Botanical Studies $425
- Live-Edge Wood Slab $600–$875 · Pet Portraits $350
- Gift Commissions $400 · Large Scale $2,000 · Commercial: contact

**Gallery artworks (use /gallery/1.jpg through /gallery/9.jpg):**
1. Mixed Media Statement — Large Scale — $2,000+
2. Custom Portrait — Portrait — $500+
3. Golden Retriever — Pet Portrait — $350+
4. Wisconsin Autumn — Landscape — $650+
5. Gold & Sage Abstract — Abstract — $750+
6. Winter Birch — Landscape — $650+
7. Live-Edge Landscape — Live-Edge — $600–$875
8. Forest Floor Study — Botanical — $425+
9. Botanical Still Life — Gift — $400+

---

# TASK LIST (pick one and run it)

## TASK A — Upload Real Gallery Photos
Upload April's actual artwork photos to replace placeholders.

Steps:
1. Copy the 9 artwork images from wherever April has them into:
   C:\Users\OMEN PC\anylystudio-nextjs\public\gallery\
   as 1.jpg, 2.jpg, 3.jpg ... 9.jpg
2. Commit and push:
   git add public/gallery/
   git commit -m "feat: add real gallery artwork photos"
   git push origin main

---

## TASK B — Upload April Portrait Photo
Replace the Unsplash placeholder in the About section with April's real photo.

Steps:
1. Copy April's portrait photo to:
   C:\Users\OMEN PC\anylystudio-nextjs\public\april-portrait.jpg
2. Open app/page.tsx and find the About section image
3. Change the src from the Unsplash URL to "/april-portrait.jpg"
4. Commit and push

---

## TASK C — Add Stripe Payment Links to Gallery
Wire each "Commission Similar Piece" button to its Stripe payment link.

In app/gallery/page.tsx, update each artwork's stripe field to a full URL:
  stripe: 'https://buy.stripe.com/...'
Then update the Commission button href from:
  href={`/#contact?type=${art.stripe}`}
To:
  href={art.stripe}

Get payment links from: https://dashboard.stripe.com/payment-links

---

## TASK D — Add OG Image + Favicon
1. Create public/og-image.jpg (1200×630px) using one of the gallery artworks
2. Create public/favicon.ico or update the SVG emoji favicon in app/layout.tsx
3. Commit and push

---

## TASK E — Add Animation with Framer Motion
The site uses Framer Motion but animations are CSS-only right now.
Add scroll-triggered fade-up animations to service cards and gallery items.

In app/page.tsx, wrap each service card with:
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
  >

Do the same in app/gallery/page.tsx for artwork cards.

---

## TASK F — Test Contact Form + Email
1. Go to https://anylystudio.com/#contact
2. Fill out the form with a test submission
3. Check if email arrives at hello@anylystudio.com
4. If not, check app/api/contact/route.ts and verify RESEND_API_KEY in Netlify:
   https://app.netlify.com/projects/anylystudio → Site settings → Env vars
   Key: RESEND_API_KEY
   Value: re_AMvqxR26_2nK4PMaM5ska22mTUc3XZx6H

---

## TASK G — Add /commission Dedicated Page
Create app/commission/page.tsx — a full-page commission request form
that pre-selects the artwork type from the ?art= URL param.

---

## TASK H — Mobile QA Pass
Test on mobile (375px viewport):
1. Nav hamburger opens/closes correctly
2. Gallery filter bar scrolls horizontally
3. Service cards stack to 1 column
4. Contact form fields are full-width
5. Hero text doesn't overflow

---

## TASK I — SEO + Sitemap
1. Create app/sitemap.ts returning all routes (/, /gallery, /commission)
2. Create app/robots.ts allowing all crawlers
3. Update metadata in app/layout.tsx with canonical URL

---

## HOW TO PUSH CHANGES
After any file edit, run:

  cd "C:\Users\OMEN PC\anylystudio-nextjs"
  "C:\Program Files\Git\bin\git.exe" add -A
  "C:\Program Files\Git\bin\git.exe" commit -m "your message here"
  "C:\Program Files\Git\bin\git.exe" push origin main

Netlify will auto-deploy in ~60 seconds.
Check: https://app.netlify.com/projects/anylystudio/deploys

---

## ENV VARS (already set in Netlify)
  RESEND_API_KEY = re_AMvqxR26_2nK4PMaM5ska22mTUc3XZx6H
  CONTACT_EMAIL = hello@anylystudio.com
  NEXT_TELEMETRY_DISABLED = 1

## KEY FILES
  app/page.tsx              — Homepage
  app/gallery/page.tsx      — Gallery (9 artworks, filter, lightbox)
  app/api/contact/route.ts  — Email backend (Resend)
  components/Nav.tsx        — Sticky nav + hamburger
  components/ui/button.tsx  — Gold/sage/dark button variants
  app/globals.css           — Brand fonts, CSS variables, animations
  netlify.toml              — Build: npm run build, publish: .next
  package.json              — Next.js 15.3.3
