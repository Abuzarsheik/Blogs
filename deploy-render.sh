#!/bin/bash

# 🚀 Render Deployment Preparation Script

echo "🎯 Preparing MERN Blog for Render Deployment..."

# Step 1: Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "client" ] && [ ! -d "server" ]; then
    echo "❌ Error: Please run this script from the root directory of your project"
    exit 1
fi

# Step 2: Check Git status
echo "📋 Checking Git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Prepare for Render deployment - $(date)"
else
    echo "✅ Git repository is clean"
fi

# Step 3: Install dependencies and test builds
echo "📦 Testing client build..."
cd client
if npm run build; then
    echo "✅ Client build successful"
else
    echo "❌ Client build failed. Please fix errors before deployment."
    exit 1
fi

cd ..

echo "📦 Testing server dependencies..."
cd server
if npm install; then
    echo "✅ Server dependencies installed successfully"
else
    echo "❌ Server dependency installation failed."
    exit 1
fi

cd ..

# Step 4: Push to Git
echo "🚀 Pushing to Git repository..."
git push origin main

# Step 5: Display deployment information
echo ""
echo "🎉 Preparation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com"
echo "2. Sign in with your GitHub account"
echo "3. Choose deployment method:"
echo ""
echo "   🟦 OPTION A: Blueprint Deployment (Recommended)"
echo "   - New → Blueprint"
echo "   - Connect your repository"
echo "   - Blueprint file: render.yaml (auto-detected)"
echo "   - Deploy all services at once"
echo ""
echo "   🟨 OPTION B: Manual Deployment"
echo "   - Deploy services individually:"
echo "     1. Database → New → PostgreSQL → No, MongoDB"
echo "     2. Backend → New → Web Service"
echo "     3. Frontend → New → Static Site"
echo ""
echo "🔗 Deployment URLs will be:"
echo "   Frontend: https://blog-frontend.onrender.com"
echo "   Backend: https://blog-backend.onrender.com"
echo ""
echo "📄 See RENDER-DEPLOYMENT.md for detailed instructions"
echo "" 