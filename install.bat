@echo off
cd /d "C:\Users\OMEN PC\anylystudio-nextjs"
echo Installing dependencies... > install.log
"C:\Program Files\nodejs\npm.cmd" install >> install.log 2>&1
echo DONE >> install.log
