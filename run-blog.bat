@echo off
echo.
echo ======================================
echo      MERN Blog Application Starter
echo ======================================
echo.

echo 🔄 Stopping any existing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

echo ✅ Starting backend server (Port 5000)...
start "Backend Server" cmd /k "cd /d %~dp0server && npm start"

echo ⏱️  Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo 🎨 Starting frontend server (Port 3000)...
start "Frontend Server" cmd /k "cd /d %~dp0client && npm start"

echo.
echo ✅ Both servers are starting...
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo 🩺 Health:   http://localhost:5000/api/health
echo.
echo ⚠️  Close both command windows to stop the servers
echo ❌ Or run 'stop-blog.bat' to stop all servers
echo.
pause 