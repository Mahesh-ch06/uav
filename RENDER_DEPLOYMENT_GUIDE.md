# 🚀 Render Deployment Guide - AI Traffic Management System

## Prerequisites
- GitHub account
- Render account (sign up at https://render.com)
- Your repository forked to your GitHub account

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Fork the Repository

1. **Go to your GitHub repository**:
   - Navigate to: https://github.com/aaron-seq/AI-ML-Based-traffic-management-system

2. **Fork the repository**:
   - Click the "Fork" button in the top-right corner
   - Select your GitHub account as the destination
   - Wait for the fork to complete

3. **Commit your local changes** (if you made any):
   ```powershell
   cd c:\Users\mahes\Downloads\AI-ML-Based-traffic-management-system
   git add .
   git commit -m "Configure for Render deployment"
   git push origin main
   ```

---

### Step 2: Connect Repository to Render

1. **Log in to Render**:
   - Go to https://dashboard.render.com
   - Sign in with your GitHub account (recommended)

2. **Create New Web Service**:
   - Click "New +" button in the top-right
   - Select "Blueprint" (this will use your `render.yaml` file)

3. **Connect your repository**:
   - If first time: Click "Connect GitHub" and authorize Render
   - Search for your forked repository: `AI-ML-Based-traffic-management-system`
   - Click "Connect"

---

### Step 3: Configure the Blueprint

1. **Render will automatically detect** `render.yaml` in your repository

2. **Review the services** that will be created:
   - ✅ **traffic-management-api** (Backend API)
   - The configuration is already set up in `render.yaml`

3. **Click "Apply"** to create the services

---

### Step 4: Environment Variables (Auto-configured)

The following environment variables are already set in `render.yaml`:

```yaml
TRAFFIC_DEBUG_MODE=false
TRAFFIC_LOG_LEVEL=INFO
TRAFFIC_ENABLE_GPU_ACCELERATION=false
TRAFFIC_MODEL_CACHE_DIRECTORY=./models
TRAFFIC_API_HOST=0.0.0.0
TRAFFIC_ALLOWED_ORIGINS=["https://uav-ezvzgy6nb-mahesh-ch06s-projects.vercel.app"]
ENVIRONMENT=production
PYTHON_VERSION=3.11
```

**Optional**: Add additional variables in Render Dashboard:
- Go to your service → Environment
- Add any custom variables you need

---

### Step 5: Deploy and Monitor

1. **Automatic Deployment**:
   - Render will automatically start building your service
   - Watch the build logs in real-time

2. **Build Process** (approx 5-10 minutes):
   ```
   ✓ Installing PyTorch 2.5.1 (CPU version)
   ✓ Installing torchvision 0.20.1
   ✓ Installing FastAPI and dependencies
   ✓ Installing YOLOv8 (ultralytics)
   ✓ Starting uvicorn server
   ```

3. **Monitor Health**:
   - Once deployed, Render will automatically health check: `/health`
   - Status should show "Live" with a green indicator

4. **Get your Backend URL**:
   - Your backend will be available at: `https://traffic-management-api.onrender.com`
   - Copy this URL for the next step

---

### Step 6: Update Frontend to Use Render Backend

1. **Update your Vercel Frontend**:
   
   Edit `frontend/src/App.tsx`:
   ```typescript
   // Replace this line:
   const API_URL = 'http://localhost:8000';
   
   // With your Render URL:
   const API_URL = 'https://traffic-management-api.onrender.com';
   ```

2. **Redeploy Frontend to Vercel**:
   ```powershell
   cd frontend
   npm run build
   vercel --prod
   ```

---

### Step 7: Update CORS Settings (Important!)

After getting your Render URL, update CORS in Render Dashboard:

1. **Go to your service** in Render Dashboard
2. **Environment** tab
3. **Edit** `TRAFFIC_ALLOWED_ORIGINS`:
   ```
   ["https://uav-ezvzgy6nb-mahesh-ch06s-projects.vercel.app","https://your-custom-domain.com"]
   ```
4. **Save Changes** - Service will auto-redeploy

---

## 🎯 Quick Commands Summary

### Push Changes to GitHub
```powershell
git add .
git commit -m "Configure for Render deployment"
git push origin main
```

### Redeploy Frontend with New Backend URL
```powershell
cd frontend
npm run build
vercel --prod
```

### Check Backend Health
```powershell
curl https://traffic-management-api.onrender.com/health
```

---

## 📊 Expected Deployment URLs

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | https://uav-ezvzgy6nb-mahesh-ch06s-projects.vercel.app | ✅ Live |
| **Backend API** | https://traffic-management-api.onrender.com | 🔄 Deploying |
| **API Docs** | https://traffic-management-api.onrender.com/docs | 🔄 After deployment |
| **Health Check** | https://traffic-management-api.onrender.com/health | 🔄 After deployment |

---

## ⚙️ Render Service Configuration

### Plan Details
- **Type**: Web Service
- **Plan**: Starter (Free tier available, $7/month for Starter)
- **Region**: Oregon
- **Python Version**: 3.11
- **Auto-deploy**: Enabled (on git push)

### Build Specifications
- **Build Command**: 
  ```bash
  pip install --upgrade pip && 
  pip install torch==2.5.1 torchvision==0.20.1 --index-url https://download.pytorch.org/whl/cpu && 
  pip install -r backend/requirements.txt
  ```
- **Start Command**: 
  ```bash
  cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT
  ```

### Resource Limits (Starter Plan)
- **Memory**: 512 MB
- **CPU**: Shared
- **Disk**: Ephemeral
- **Build Time**: ~5-10 minutes

---

## 🐛 Troubleshooting

### Build Fails - Out of Memory
**Solution**: Upgrade to Starter plan ($7/month) for more resources

### YOLOv8 Model Download Fails
**Solution**: The model will auto-download on first request. Be patient on first API call.

### CORS Errors in Frontend
**Solution**: 
1. Check `TRAFFIC_ALLOWED_ORIGINS` includes your Vercel URL
2. Must be valid JSON array: `["https://your-url.com"]`
3. Redeploy after changes

### Service Won't Start
**Solution**:
1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure `render.yaml` is in repository root

### Slow Cold Starts (Free Plan)
**Issue**: Render free tier spins down after 15 minutes of inactivity
**Solution**: Upgrade to Starter plan for always-on service

---

## 🔄 Automatic Deployments

Once connected, Render will automatically deploy when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main
# ✨ Render automatically deploys!
```

---

## 📈 Monitoring & Logs

### View Logs in Render Dashboard
1. Go to your service
2. Click "Logs" tab
3. See real-time application logs

### Monitor Performance
1. Click "Metrics" tab
2. View CPU, Memory, Response times
3. Set up alerts for downtime

---

## 🎉 Success Checklist

- [ ] Repository forked to your GitHub account
- [ ] Changes committed and pushed to GitHub
- [ ] Connected repository to Render
- [ ] Blueprint deployed successfully
- [ ] Backend service is "Live" (green status)
- [ ] Health check endpoint responding: `/health`
- [ ] Frontend updated with Render backend URL
- [ ] Frontend redeployed to Vercel
- [ ] CORS configured with Vercel URL
- [ ] API endpoints accessible from frontend
- [ ] YOLOv8 model loading correctly

---

## 🌐 Final Architecture

```
┌─────────────────────────────────────────┐
│   Frontend (Vercel)                     │
│   https://uav-*.vercel.app              │
│                                         │
│   - React + Vite                        │
│   - Static hosting                      │
│   - Edge network (CDN)                  │
└──────────────┬──────────────────────────┘
               │
               │ HTTPS Requests
               ▼
┌─────────────────────────────────────────┐
│   Backend API (Render)                  │
│   https://traffic-management-api        │
│   .onrender.com                         │
│                                         │
│   - FastAPI + Uvicorn                   │
│   - YOLOv8 AI Model                     │
│   - Python 3.11                         │
│   - PyTorch 2.5.1 (CPU)                 │
└─────────────────────────────────────────┘
```

---

## 💰 Cost Estimate

| Service | Plan | Cost |
|---------|------|------|
| Vercel Frontend | Hobby | **FREE** |
| Render Backend | Free | **FREE** (with limitations) |
| Render Backend | Starter | **$7/month** (recommended) |

**Free Tier Limitations**:
- Spins down after 15 min inactivity (30-60s cold start)
- 750 hours/month
- Slower build times

**Starter Benefits**:
- Always-on (no spin down)
- Faster builds
- More memory (512MB)
- Better performance

---

## 📞 Support Resources

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com
- **This Project Issues**: https://github.com/aaron-seq/AI-ML-Based-traffic-management-system/issues

---

**Ready to deploy? Follow Step 1 above!** 🚀
