# MERN Blog Status Checker
Write-Host "🔍 Checking MERN Blog Application Status..." -ForegroundColor Green

# Check if ports are in use
$backend = netstat -an | findstr ":5000" | findstr "LISTENING"
$frontend = netstat -an | findstr ":3000" | findstr "LISTENING"

Write-Host "`n📊 Port Status:" -ForegroundColor Cyan

if ($backend) {
    Write-Host "✅ Backend (Port 5000): RUNNING" -ForegroundColor Green
    
    # Test backend health
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
        Write-Host "💚 Backend Health: OK" -ForegroundColor Green
    } catch {
        Write-Host "❌ Backend Health: ERROR" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Backend (Port 5000): NOT RUNNING" -ForegroundColor Red
}

if ($frontend) {
    Write-Host "✅ Frontend (Port 3000): RUNNING" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend (Port 3000): NOT RUNNING" -ForegroundColor Red
}

Write-Host "`n🌐 Application URLs:" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Blue
Write-Host "Health:   http://localhost:5000/api/health" -ForegroundColor Blue

if (-not $backend -or -not $frontend) {
    Write-Host "`n🚀 To start missing servers:" -ForegroundColor Yellow
    if (-not $backend) {
        Write-Host "cd server; npm start" -ForegroundColor White
    }
    if (-not $frontend) {
        Write-Host "cd client; npm start" -ForegroundColor White
    }
} 