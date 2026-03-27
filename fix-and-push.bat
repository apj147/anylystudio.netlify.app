@echo off
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"
"C:\Program Files\Git\bin\git.exe" add package.json
"C:\Program Files\Git\bin\git.exe" commit -m "fix: upgrade Next.js 15.2.4 -> 15.3.3 (CVE-2025-55182 security patch)"
"C:\Program Files\Git\bin\git.exe" push origin main
echo DONE
pause
