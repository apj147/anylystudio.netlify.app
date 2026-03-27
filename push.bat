@echo off
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"
"C:\Program Files\Git\bin\git.exe" add public/gallery/
"C:\Program Files\Git\bin\git.exe" commit -m "feat: add real artwork photos 1-9"
"C:\Program Files\Git\bin\git.exe" push origin main
echo DONE
pause
