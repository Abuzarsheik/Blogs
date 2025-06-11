@echo off
echo.
echo ======================================
echo     Stopping MERN Blog Servers
echo ======================================
echo.

echo 🛑 Stopping all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

echo ✅ All blog servers have been stopped.
echo.

echo Checking ports...
netstat -an | findstr ":3000 :5000" >nul
if %errorlevel% == 0 (
    echo ⚠️  Some processes may still be running on ports 3000 or 5000
    echo    You may need to restart your computer if issues persist
) else (
    echo ✅ Ports 3000 and 5000 are now free
)

echo.
pause 