$ErrorActionPreference = "Stop"
$dir = "C:\Users\OMEN PC\anylystudio-nextjs"
Set-Location $dir

# ── 1. Token ────────────────────────────────────────────────────────────────
$token = Read-Host "Paste your Vercel token (input hidden)" -AsSecureString
$plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
)

# ── 2. Initial deploy ────────────────────────────────────────────────────────
Write-Host "`n[1/4] Deploying to Vercel..." -ForegroundColor Cyan
$out = npx vercel --prod --token $plain --yes --name anylystudio 2>&1
Write-Host $out

# ── 3. Add all env vars from .env.local ──────────────────────────────────────
Write-Host "`n[2/4] Adding environment variables..." -ForegroundColor Cyan
$envVars = @{
    STRIPE_SECRET_KEY                = $null
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = $null
    RESEND_API_KEY                   = $null
    NEXT_PUBLIC_SITE_URL             = $null
    CONTACT_EMAIL                    = $null
    NEXT_TELEMETRY_DISABLED          = $null
}

Get-Content ".env.local" | ForEach-Object {
    if ($_ -match "^([^#=]+)=(.+)$") {
        $key = $Matches[1].Trim()
        $val = $Matches[2].Trim()
        if ($envVars.ContainsKey($key)) {
            Write-Host "  Setting $key..."
            echo $val | npx vercel env add $key production --token $plain --force 2>&1 | Out-Null
        }
    }
}

# ── 4. Redeploy with env vars active ─────────────────────────────────────────
Write-Host "`n[3/4] Redeploying with env vars..." -ForegroundColor Cyan
$finalOut = npx vercel --prod --token $plain --yes 2>&1
Write-Host $finalOut

# ── 5. Extract and show production URL ───────────────────────────────────────
Write-Host "`n[4/4] Done!" -ForegroundColor Green
$url = ($finalOut | Select-String "https://\S+\.vercel\.app").Matches.Value | Select-Object -Last 1
if ($url) {
    Write-Host "Production URL: $url" -ForegroundColor Yellow
} else {
    Write-Host "Check vercel.com/dashboard for your production URL." -ForegroundColor Yellow
}
