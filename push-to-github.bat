@echo off
echo ============================================
echo  Anyly Studio — Git Init + Push to GitHub
echo ============================================
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"

echo [1/5] Initializing git repo...
"C:\Program Files\Git\bin\git.exe" init

echo [2/5] Adding all files...
"C:\Program Files\Git\bin\git.exe" add .

echo [3/5] Committing...
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Next.js 15 + full service catalog with pricing"

echo [4/5] Setting remote to existing GitHub repo...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/apj147/anylystudio.netlify.app.git

echo [5/5] Pushing to main (force — this replaces the old HTML site)...
"C:\Program Files\Git\bin\git.exe" push origin main --force

echo.
echo DONE. Netlify will auto-deploy in ~60 seconds.
echo Check: https://app.netlify.com/projects/anylystudio/deploys
pause
