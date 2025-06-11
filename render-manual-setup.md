# 🛠️ Manual Render Setup (When Blueprint Fails)

## 🎯 Step-by-Step Manual Deployment

### **Step 1: Create MongoDB Database**
1. **Render Dashboard** → **New** → **PostgreSQL** → **"No, MongoDB"**
2. **Settings**:
   ```
   Name: blog-database
   Database Name: blog_db
   User: blog_user  
   Region: Oregon
   Plan: Free
   ```
3. **Create Database** → **Wait for "Available" status**

### **Step 2: Get Database Connection String**
1. **Database Service** → **Connect** tab
2. **Copy External Connection String**
3. **Format**: `mongodb+srv://username:password@cluster.mongodb.net/blog_db`

### **Step 3: Create Backend Web Service**
1. **Render Dashboard** → **New** → **Web Service**
2. **Connect GitHub Repository**
3. **Configuration**:
   ```
   Name: blog-backend
   Region: Oregon  
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

### **Step 4: Set Environment Variables**
Add these to your backend service:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=[paste your database connection string here]
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
CLIENT_URL=https://your-vercel-app.vercel.app
```

### **Step 5: Deploy**
1. **Create Web Service**
2. **Wait for deployment**
3. **Check logs for successful connection**

## 🔍 **Environment Variables Template**

```bash
# Required for Backend Service
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://blog_user:password123@cluster-abc.mongodb.net/blog_db?retryWrites=true&w=majority
JWT_SECRET=super-secret-jwt-key-at-least-32-characters-long-for-security
CLIENT_URL=https://your-app.vercel.app
```

## ✅ **Verification Steps**

1. **Database**: Status shows "Available"
2. **Backend**: Deployment successful, no connection errors
3. **Health Check**: `https://blog-backend.onrender.com/api/health` responds
4. **Logs**: Show "✅ MongoDB Connected Successfully" 