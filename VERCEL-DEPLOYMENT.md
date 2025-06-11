# 🚀 Vercel Deployment Guide for MERN Blog

## Frontend Deployment (React App)

### 1. **Prerequisites**
- Vercel account ([sign up at vercel.com](https://vercel.com))
- GitHub repository with your code
- Vercel CLI (optional): `npm i -g vercel`

### 2. **Deployment Steps**

#### **Option A: GitHub Integration (Recommended)**
1. **Connect Repository:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `client` folder as root directory

2. **Configure Build Settings:**
   ```
   Framework Preset: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Environment Variables:**
   - Add these in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-api.com
   GENERATE_SOURCEMAP=false
   ```

#### **Option B: Vercel CLI**
```bash
# Navigate to client folder
cd client

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 3. **Backend Deployment Options**

#### **Option 1: Railway**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Select `server` folder
4. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

#### **Option 2: Render**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   ```
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

#### **Option 3: Heroku**
```bash
# Install Heroku CLI
# Navigate to server folder
cd server

# Login and create app
heroku login
heroku create your-blog-api

# Add environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 4. **Environment Variables Setup**

#### **Frontend (.env.production)**
```env
REACT_APP_API_URL=https://your-deployed-backend.com
GENERATE_SOURCEMAP=false
```

#### **Backend Environment Variables**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### 5. **Common Issues & Solutions**

#### **404 on Route Refresh**
✅ **Fixed by:** `vercel.json` configuration (already included)

#### **API Connection Issues**
- Update `REACT_APP_API_URL` in Vercel environment variables
- Ensure backend CORS allows your frontend domain
- Check backend deployment logs

#### **Build Failures**
```bash
# Test build locally first
npm run build

# Check for any TypeScript/ESLint errors
npm run build 2>&1 | grep -i error
```

### 6. **Post-Deployment Checklist**

- [ ] Frontend loads without errors
- [ ] All routes work (Home, Login, Register, etc.)
- [ ] User registration/login functions
- [ ] Can create/edit/delete posts
- [ ] Comments and likes work
- [ ] Images upload properly
- [ ] Mobile responsive design

### 7. **Database Setup (MongoDB Atlas)**

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster

2. **Configure Database**
   - Whitelist all IPs (0.0.0.0/0) for production
   - Create database user
   - Get connection string

3. **Seed Production Database**
   ```bash
   # Update MongoDB URI in seed.js
   # Run seeding script
   node seed.js
   ```

### 8. **Performance Optimizations**

#### **Frontend**
- Enable gzip compression (handled by Vercel)
- Optimize images before upload
- Use React.lazy() for code splitting
- Implement service worker for caching

#### **Backend**
- Use MongoDB indexes for better query performance
- Implement API rate limiting
- Add response compression middleware
- Use CDN for static file serving

### 9. **Monitoring & Analytics**

- **Vercel Analytics:** Enable in project settings
- **Backend Monitoring:** Use services like DataDog or New Relic
- **Error Tracking:** Integrate Sentry for error reporting

### 10. **Domain Setup (Optional)**

1. **Custom Domain:**
   - Add domain in Vercel dashboard
   - Update DNS settings
   - SSL certificate (automatic)

2. **Subdomain for API:**
   - api.yourdomain.com → Backend service
   - www.yourdomain.com → Frontend

---

## 🎯 **Quick Deploy Commands**

```bash
# Frontend to Vercel
cd client && vercel --prod

# Backend to Railway (after connecting GitHub)
# Just push to GitHub - auto-deploys

# Update environment variables
vercel env add REACT_APP_API_URL
```

## 📞 **Support**

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for errors

**Happy Deploying! 🚀** 