@echo off
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"
"C:\Program Files\Git\bin\git.exe" add -A
"C:\Program Files\Git\bin\git.exe" commit -m "feat: Stripe Checkout — Buy Now on all 9 gallery items + success page + /api/checkout"
"C:\Program Files\Git\bin\git.exe" push origin main
echo DONE - add STRIPE_SECRET_KEY in Netlify env vars then redeploy
pause
