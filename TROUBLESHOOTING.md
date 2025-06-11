# MERN Blog Troubleshooting Guide

## Common Issues and Solutions

### 1. Port Already in Use (EADDRINUSE)

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000` or `:3000`

**Solution**:
```powershell
# Kill all Node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

# Then restart servers
cd server
npm start

# In another terminal
cd client
npm start
```

### 2. JWT Signature Errors

**Problem**: `JsonWebTokenError: invalid signature`

**Solutions**:
1. **Clear browser storage** - Open browser DevTools (F12) → Application → Storage → Clear storage
2. **Use the clear storage utility** - The app includes automatic token cleanup
3. **Manual cleanup** - Delete any JWT tokens from localStorage

### 2.1. Maximum Update Depth Exceeded

**Problem**: `Warning: Maximum update depth exceeded` in React console

**Root Cause**: Infinite re-rendering caused by useEffect dependencies

**Solution**: Fixed by adding `useCallback` to AuthContext functions and proper useEffect dependencies

### 3. Running Commands from Wrong Directory

**Problem**: `Could not read package.json` when running `npm start` from root

**Solution**: Make sure you're in the correct directory:
- Backend: `cd server` then `npm start`
- Frontend: `cd client` then `npm start`
- Root directory has no package.json by design

### 4. CORS Errors

**Problem**: Frontend can't connect to backend

**Solutions**:
1. Ensure backend is running on port 5000
2. Check `.env` file in client has correct API URL
3. Verify proxy setting in client/package.json

### 5. MongoDB Connection Issues

**Problem**: `MongooseServerSelectionError`

**Solutions**:
1. Install MongoDB locally or use MongoDB Atlas
2. Update connection string in `server/.env`
3. Ensure MongoDB service is running

### 6. Environment Variables Not Loading

**Problem**: Variables from `.env` not working

**Solutions**:
1. Check file is named exactly `.env` (not `.env.txt`)
2. Restart the server after changing .env
3. No spaces around `=` in .env files

## Quick Start Commands

### Start Both Servers (Windows PowerShell):
```powershell
# From project root
PowerShell -ExecutionPolicy Bypass -File .\start-dev.ps1
```

### Manual Start:
```powershell
# Terminal 1 - Backend
cd server
npm install  # if first time
npm start

# Terminal 2 - Frontend  
cd client
npm install  # if first time
npm start
```

## Development URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **Backend Health Check**: http://localhost:5000/api/health

## File Structure
```
Blog/
├── server/          # Backend Express app
├── client/          # Frontend React app
├── start-dev.ps1    # Startup script
└── README.md        # Main documentation
```

## Browser Storage Issues

If you experience authentication issues:

1. **Open browser DevTools** (F12)
2. **Go to Application tab** → Storage → Local Storage
3. **Delete all items** related to the blog app
4. **Refresh the page** and try logging in again

## Still Having Issues?

1. Check that both servers are running on correct ports
2. Verify MongoDB is connected
3. Clear browser cache and storage
4. Restart both backend and frontend servers
5. Check console for detailed error messages 