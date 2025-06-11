# 🚀 Render Deployment Preparation Script (PowerShell)

Write-Host "🎯 Preparing MERN Blog for Render Deployment..." -ForegroundColor Green

# Step 1: Check if we're in the right directory
if (!(Test-Path "package.json") -and !(Test-Path "client") -and !(Test-Path "server")) {
    Write-Host "❌ Error: Please run this script from the root directory of your project" -ForegroundColor Red
    exit 1
}

# Step 2: Check Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "⚠️  You have uncommitted changes. Committing them now..." -ForegroundColor Yellow
    git add .
    git commit -m "Prepare for Render deployment - $(Get-Date)"
} else {
    Write-Host "✅ Git repository is clean" -ForegroundColor Green
}

# Step 3: Install dependencies and test builds
Write-Host "📦 Testing client build..." -ForegroundColor Blue
Set-Location client
try {
    npm run build
    Write-Host "✅ Client build successful" -ForegroundColor Green
} catch {
    Write-Host "❌ Client build failed. Please fix errors before deployment." -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "📦 Testing server dependencies..." -ForegroundColor Blue
Set-Location server
try {
    npm install
    Write-Host "✅ Server dependencies installed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Server dependency installation failed." -ForegroundColor Red
    exit 1
}

Set-Location ..

# Step 4: Push to Git
Write-Host "🚀 Pushing to Git repository..." -ForegroundColor Magenta
git push origin main

# Step 5: Display deployment information
Write-Host ""
Write-Host "🎉 Preparation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://render.com"
Write-Host "2. Sign in with your GitHub account"
Write-Host "3. Choose deployment method:"
Write-Host ""
Write-Host "   🟦 OPTION A: Blueprint Deployment (Recommended)" -ForegroundColor Blue
Write-Host "   - New → Blueprint"
Write-Host "   - Connect your repository"
Write-Host "   - Blueprint file: render.yaml (auto-detected)"
Write-Host "   - Deploy all services at once"
Write-Host ""
Write-Host "   🟨 OPTION B: Manual Deployment" -ForegroundColor Yellow
Write-Host "   - Deploy services individually:"
Write-Host "     1. Database → New → PostgreSQL → No, MongoDB"
Write-Host "     2. Backend → New → Web Service"
Write-Host "     3. Frontend → New → Static Site"
Write-Host ""
Write-Host "🔗 Deployment URLs will be:" -ForegroundColor Magenta
Write-Host "   Frontend: https://blog-frontend.onrender.com"
Write-Host "   Backend: https://blog-backend.onrender.com"
Write-Host ""
Write-Host "📄 See RENDER-DEPLOYMENT.md for detailed instructions" -ForegroundColor Gray
Write-Host "" 