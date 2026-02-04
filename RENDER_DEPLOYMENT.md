# Render Deployment Guide - Exact Steps

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### Step 2: Create Backend Service

**In Render Dashboard:**

1. Click **"New +"** → Select **"Web Service"**
2. Connect GitHub repo: `Adarshrawat26/New-project`
3. Fill in these exact values:

```
Name:                 hrms-api
Environment:          Python 3
Region:               Oregon (or your choice)
Branch:               main
Root Directory:       backend
Build Command:        pip install --prefer-binary -r requirements.txt
Start Command:        uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

4. Click **"Create Web Service"**

### Step 3: Add Environment Variables to Backend

In Render Dashboard → Your Service → Environment:

Add these exact variables:

```
Key: MONGODB_URI
Value: mongodb+srv://heyyadmin:tmN2b8QMJe63ugFr@cluster0.tdw29hq.mongodb.net/?appName=Cluster0

Key: ENVIRONMENT
Value: production

Key: API_HOST
Value: 0.0.0.0

Key: API_PORT
Value: 8000
```

4. Deploy starts automatically

### Step 4: Get Your Backend URL

After deployment completes:

- Your backend URL will be like: `https://hrms-api.onrender.com`
- Save this URL - you'll need it for frontend

**Test it works:**

```bash
curl https://hrms-api.onrender.com/health
```

---

## Part 2: Deploy Frontend to Render

### Option A: Deploy Frontend on Render (Slower)

1. Click **"New +"** → Select **"Static Site"**
2. Connect GitHub repo: `Adarshrawat26/New-project`
3. Fill in these exact values:

```
Name:                 hrms-frontend
Environment:          Node
Region:               Oregon
Branch:               main
Root Directory:       frontend
Build Command:        npm run build
Publish Directory:    build
```

4. Click **"Create Static Site"**

5. After deployment, you'll get a URL like: `https://hrms-frontend.onrender.com`

### Option B: Deploy Frontend on Vercel (Recommended - Faster)

See Part 3 below.

---

## Part 3: Deploy Frontend to Vercel (RECOMMENDED)

Vercel is faster and better for React apps. Do this instead of Part 2 Option A.

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
cd "/Users/adarshkumarrawat/Documents/New project/frontend"
```

### Step 2: Deploy

```bash
vercel --prod
```

### Step 3: Add Environment Variable

When asked, or after deployment:

In Vercel Dashboard → Project Settings → Environment Variables:

```
Name:     REACT_APP_API_URL
Value:    https://hrms-api.onrender.com
```

Redeploy to apply env variable.

Your frontend URL will be like: `https://hrms-frontend.vercel.app`

---

## Complete Deployment Checklist

### Backend (Render)

- [ ] Create account on Render
- [ ] Create Web Service
- [ ] Set Python 3 environment
- [ ] Root Directory: `backend`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- [ ] Add MONGODB_URI env variable
- [ ] Add ENVIRONMENT=production
- [ ] Deployment successful
- [ ] Note: `https://hrms-api.onrender.com` (your actual URL)

### Frontend (Vercel - Recommended)

- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run: `vercel --prod`
- [ ] Add REACT_APP_API_URL env variable
- [ ] Redeploy
- [ ] Note: `https://your-app.vercel.app` (your actual URL)

---

## Exact Commands to Run

### Command 1: Build Frontend Locally (Optional but recommended)

```bash
cd "/Users/adarshkumarrawat/Documents/New project/frontend"
npm run build
```

### Command 2: Deploy Backend First

Go to Render dashboard and create web service (steps above)

### Command 3: Deploy Frontend

```bash
cd "/Users/adarshkumarrawat/Documents/New project/frontend"
npm i -g vercel
vercel --prod
```

When prompted:

- Link to existing project? **No**
- Project name? `hrms` (or your choice)
- Directory? `./` (just press enter)
- Build Command? `npm run build`
- Output Directory? `build`

### Command 4: Push to GitHub

```bash
cd "/Users/adarshkumarrawat/Documents/New project"
git add .
git commit -m "Ready for production deployment"
git push
```

---

## Environment Variables Summary

### Backend (.env on Render)

```
MONGODB_URI=mongodb+srv://heyyadmin:tmN2b8QMJe63ugFr@cluster0.tdw29hq.mongodb.net/?appName=Cluster0
ENVIRONMENT=production
API_HOST=0.0.0.0
API_PORT=8000
```

### Frontend (.env on Vercel)

```
REACT_APP_API_URL=https://hrms-api.onrender.com
```

---

## Testing After Deployment

### Test Backend

```bash
curl https://hrms-api.onrender.com/health
```

Response should be:

```json
{ "status": "ok" }
```

### Test Frontend

1. Visit `https://your-app.vercel.app`
2. Try adding an employee
3. Check if data appears in MongoDB Atlas
4. Test all features

---

## Your Exact URLs After Deployment

Once deployed, your URLs will be:

```
Frontend:  https://your-project-name.vercel.app
Backend:   https://hrms-api.onrender.com
API Docs:  https://hrms-api.onrender.com/docs
```

---

## Important Notes

### Backend Startup on Render

- First deploy takes 3-5 minutes
- Render will auto-restart if server crashes
- You'll see logs in Render dashboard
- Free tier: App goes to sleep after 15 min of inactivity

### Frontend on Vercel

- Deploy is instant
- Free tier includes unlimited deployments
- Auto-redeploys on push to main branch

### MongoDB Atlas

- Your connection string is already configured
- Data will persist
- View data at: https://cloud.mongodb.com

---

## Troubleshooting

### Backend not starting

1. Check Render dashboard logs
2. Verify MONGODB_URI is correct
3. Check if MongoDB Atlas IP whitelist includes Render servers

### Frontend 404 errors

1. Check REACT_APP_API_URL env variable
2. Verify backend URL is correct and running
3. Clear browser cache

### Data not saving

1. Verify MongoDB connection in backend logs
2. Check MongoDB Atlas for actual data
3. Verify employee_id is unique

---

## Quick Reference

| Component | Platform      | Free | Cost     |
| --------- | ------------- | ---- | -------- |
| Backend   | Render        | Yes  | $7/month |
| Frontend  | Vercel        | Yes  | Free     |
| Database  | MongoDB Atlas | Yes  | Free     |

**Total Cost: ~$7/month or Free with Render free tier**

---

## Next Steps

1. **NOW**: Create Render account
2. **NOW**: Deploy backend following Part 1
3. **NOW**: Get your backend URL
4. **NOW**: Deploy frontend following Part 3
5. **NOW**: Set REACT_APP_API_URL env variable
6. **NOW**: Test everything works
7. **DONE**: Your HRMS is live! 🎉
