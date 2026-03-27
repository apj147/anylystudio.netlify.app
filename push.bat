@echo off
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"
"C:\Program Files\Git\bin\git.exe" add -A
"C:\Program Files\Git\bin\git.exe" commit -m "feat: exact 9 artwork catalog + CLAUDE.md agent script + gallery local image paths"
"C:\Program Files\Git\bin\git.exe" push origin main
echo DONE - Netlify deploying
pause
