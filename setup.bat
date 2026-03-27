@echo off
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"
echo [1/3] Installing dependencies...
call "C:\Program Files\nodejs\npm.cmd" install
echo [2/3] Done. Starting dev server...
start "Anyly Studio Dev" cmd /k "cd /d "C:\Users\OMEN PC\anylystudio-nextjs" && "C:\Program Files\nodejs\npm.cmd" run dev"
echo [3/3] Dev server launching at http://localhost:3000
pause
