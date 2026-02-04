# Quick Deploy to Vercel

Follow these steps to deploy your HRMS to production:

## Frontend Deploy (Vercel) - 5 minutes

### Option 1: CLI (Fastest)
```bash
npm i -g vercel
cd "/Users/adarshkumarrawat/Documents/New project/frontend"
vercel --prod
```

### Option 2: GitHub Integration
1. Go to https://vercel.com/new
2. Import your GitHub repo: `Adarshrawat26/New-project`
3. Set Root Directory to `frontend`
4. Click Deploy
5. Note your URL (e.g., `https://hrms.vercel.app`)

## Backend Deploy (Railway) - 5 minutes

### Step 1: Create Railway Account
- Go to https://railway.app
- Sign up with GitHub

### Step 2: Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `Adarshrawat26/New-project`
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Env Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ENVIRONMENT`: `production`
6. Deploy
7. Note your URL (e.g., `https://hrms-api.railway.app`)

## Connect Frontend to Backend

1. Go to Vercel dashboard
2. Open your project
3. Settings > Environment Variables
4. Add: `REACT_APP_API_URL=https://hrms-api.railway.app`
5. Redeploy (click "Redeploy")

## Test It Works

- Visit your Vercel URL
- Add an employee
- Search/filter employees
- Mark attendance
- Check MongoDB Atlas for data

## Troubleshooting

**CORS Error?**
- Go to Railway dashboard
- Open backend logs
- Check if MongoDB Atlas is accessible

**404 on API calls?**
- Make sure `REACT_APP_API_URL` is correct
- Check if backend is running

**Data not saving?**
- Verify MongoDB connection string
- Check MongoDB Atlas IP whitelist

## URLs After Deployment

- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.railway.app`
- API Docs: `https://your-api.railway.app/docs`

See `DEPLOYMENT.md` for detailed instructions and other hosting options.
