# Quick Setup Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

## Setup Steps

### 1. Clone and Setup Backend
```bash
cd server
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000" > .env

# Start server
npm run dev
```

### 2. Setup Frontend
```bash
cd client
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start client
npm start
```

### 3. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Quick Test
1. Register a new user
2. Create a post with image
3. Like and comment on posts
4. Edit/delete your posts

## Deployment
- Frontend: Deploy to Vercel
- Backend: Deploy to Render or Railway
- Database: Use MongoDB Atlas

See main README.md for detailed instructions. 