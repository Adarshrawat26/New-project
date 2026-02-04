# Deployment Guide - Vercel + Backend

This guide explains how to deploy your HRMS system to production using Vercel for the frontend and a backend service.

## Architecture

```
┌─────────────────────────┐
│   Vercel (Frontend)     │
│   React App             │
│   https://your-app.    │
│   vercel.app           │
└──────────┬──────────────┘
           │
           │ API Calls
           │
┌──────────▼──────────────┐
│  Backend Service        │
│  (Railway/Render/AWS)   │
│  https://api.your-app   │
│  MongoDB Atlas          │
└─────────────────────────┘
```

## Step 1: Prepare Frontend for Vercel

### 1.1 Update Environment Variables

The frontend needs to know where the backend is located:

**File: `frontend/.env.production`**
```env
REACT_APP_API_URL=https://your-backend-url.com
```

This will be used when the app is deployed to production.

### 1.2 Verify API Configuration

Check that your frontend is using the environment variable:

In `frontend/src/services/employeeService.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

This is already in place ✓

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
- Go to https://vercel.com/signup
- Sign up with GitHub (recommended)
- Create a new team/account

### 2.2 Deploy Project

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project root
cd "/Users/adarshkumarrawat/Documents/New project"

# Deploy
vercel --prod
```

**Option B: Using GitHub Integration**

1. Push your code to GitHub (already done ✓)
2. Go to https://vercel.com/new
3. Import your GitHub repository: `Adarshrawat26/New-project`
4. Configure:
   - **Framework**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - Key: `REACT_APP_API_URL`
   - Value: (will update after backend is deployed)
6. Click **Deploy**

### 2.3 Get Vercel URL

After deployment, Vercel will give you a URL like:
```
https://hrms-lite.vercel.app
```

## Step 3: Deploy Backend

You need to deploy your FastAPI backend somewhere. Here are your options:

### Option 1: Railway (Recommended - Simple)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repo: `Adarshrawat26/New-project`
6. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms
   ENVIRONMENT=production
   ```
8. Deploy and get your URL (e.g., `https://hrms-api.railway.app`)

### Option 2: Render (Free Tier Available)

1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repo
5. Configure:
   - **Name**: `hrms-api`
   - **Root Directory**: `backend`
   - **Environment**: Python 3.11
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms
   ENVIRONMENT=production
   ```
7. Deploy and get your URL (e.g., `https://hrms-api.onrender.com`)

### Option 3: Heroku (Paid)

1. Create `Procfile` in root:
```
web: cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

2. Install Heroku CLI and deploy:
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=mongodb+srv://...
git push heroku main
```

## Step 4: Update Frontend with Backend URL

Once your backend is deployed and has a URL:

### 4.1 Update Production Environment

In Vercel dashboard:
1. Go to Project Settings
2. Environment Variables
3. Update `REACT_APP_API_URL`:
   ```
   REACT_APP_API_URL=https://hrms-api.railway.app
   ```
4. Trigger a redeploy

### 4.2 Update CORS in Backend

Update your backend to allow requests from Vercel:

**File: `backend/app/main.py`**

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend.vercel.app",  # Your Vercel URL
        "http://localhost:3000",              # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Step 5: Production Environment Configuration

### Update Backend for Production

**File: `backend/.env.production`**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrms
API_HOST=0.0.0.0
API_PORT=8000
ENVIRONMENT=production
```

Create this file with your actual MongoDB Atlas credentials.

### Update Frontend for Production

**File: `frontend/.env.production`** (already created)
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## Complete Deployment Checklist

- [ ] Frontend pushed to GitHub
- [ ] Backend pushed to GitHub
- [ ] Created Vercel account
- [ ] Deployed frontend to Vercel
- [ ] Got Vercel frontend URL
- [ ] Created Railway/Render account
- [ ] Deployed backend
- [ ] Got backend API URL
- [ ] Updated `REACT_APP_API_URL` in Vercel
- [ ] Updated CORS in backend
- [ ] Tested API calls from production frontend
- [ ] Verified data persists in MongoDB Atlas

## Vercel Deployment Commands

```bash
# Deploy frontend only (from project root)
cd frontend
vercel --prod

# View deployment logs
vercel logs

# View environment variables
vercel env ls

# Set environment variable
vercel env add REACT_APP_API_URL https://your-api.com

# Redeploy
vercel --prod
```

## Testing Production

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try adding an employee
3. Check MongoDB Atlas to verify data is saved
4. Try other features (search, filter, attendance, etc.)

## Common Issues

### Issue: 404 on API calls
- **Check**: Is the backend URL correct in `REACT_APP_API_URL`?
- **Check**: Is the backend service running?
- **Check**: Are CORS settings allowing your frontend?

### Issue: Build fails on Vercel
- **Check**: Does `frontend/package.json` exist?
- **Check**: Are all dependencies installed?
- **Run locally**: `cd frontend && npm run build`

### Issue: MongoDB connection fails
- **Check**: Is MongoDB Atlas IP whitelist updated?
- **Check**: Is `MONGODB_URI` correct?
- **Check**: Are credentials correct?

### Issue: CORS errors
- **Update**: `backend/app/main.py` CORS settings
- **Redeploy**: Backend service
- **Clear**: Browser cache (Ctrl+Shift+Delete)

## Monitoring

### Vercel
- Dashboard: https://vercel.com/dashboard
- View logs, deployments, analytics

### Railway/Render
- View logs in service dashboard
- Check resource usage

### MongoDB
- MongoDB Atlas dashboard: https://cloud.mongodb.com
- View data, backups, logs

## Next Steps

1. Monitor your production application
2. Set up alerts for errors
3. Plan for scaling as users grow
4. Consider adding authentication
5. Add database backups

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- FastAPI: https://fastapi.tiangolo.com/deployment/
