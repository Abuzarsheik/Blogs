# PowerShell script to start the MERN blog application
Write-Host "🚀 Starting MERN Blog Application..." -ForegroundColor Green

# Kill any existing Node processes
Write-Host "🔄 Stopping existing Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Start backend server
Write-Host "🎯 Starting backend server..." -ForegroundColor Blue
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; npm start" -WindowStyle Normal

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "🎨 Starting frontend server..." -ForegroundColor Magenta
Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; npm start" -WindowStyle Normal

Write-Host "✅ Both servers starting..." -ForegroundColor Green
Write-Host "📱 Frontend will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend will be available at: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🛑 To stop servers, close both PowerShell windows or use Ctrl+C" -ForegroundColor Red 