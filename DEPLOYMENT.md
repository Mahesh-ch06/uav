# AI Traffic Management System - Deployment Guide

## ✅ Current Status
- **Backend**: Running locally on http://localhost:8000
- **Frontend**: Running locally on http://localhost:5174
- All services are operational (Vehicle Detector, Traffic Manager, Analytics)

---

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Install Docker Desktop: https://www.docker.com/products/docker-desktop/
- Ensure Docker is running

### Quick Start

```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild after changes
docker compose up -d --build
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs
- **Redis**: localhost:6379

### Individual Service Management

```bash
# Start specific services
docker compose up -d backend redis

# View service logs
docker compose logs -f backend
docker compose logs -f frontend

# Restart a service
docker compose restart backend

# Remove all containers and volumes
docker compose down -v
```

---

## 🚀 Cloud Deployment Options

### Option 1: Railway (Easiest)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy**:
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set Environment Variables** in Railway Dashboard:
   - Copy all variables from `.env` file
   - Update `TRAFFIC_ALLOWED_ORIGINS` with your Railway URL

### Option 2: Render

1. **Push to GitHub** (if not already)
2. **Go to Render Dashboard**: https://render.com
3. **Create New Web Service**:
   - Connect your GitHub repository
   - Select `backend` directory
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Add Environment Variables** from your `.env` file
5. **Create Static Site** for frontend:
   - Select `frontend` directory
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

### Option 3: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel**:
```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

**Backend on Railway**:
```bash
cd backend
railway login
railway init
railway up
```

Update frontend env vars to point to Railway backend URL.

### Option 4: Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Backend
cd backend
heroku create your-app-backend
git push heroku main
heroku config:set TRAFFIC_DEBUG_MODE=false
# ... set other env vars

# Frontend
cd frontend
heroku create your-app-frontend
git push heroku main
```

---

## 🔧 Production Configuration

### Backend Environment Variables

Update `backend/.env` for production:

```bash
# Set to production
ENVIRONMENT=production
TRAFFIC_DEBUG_MODE=false
TRAFFIC_LOG_LEVEL=INFO

# Security - CHANGE THESE!
TRAFFIC_JWT_SECRET_KEY=your-super-secret-production-key-min-32-chars

# CORS - Add your production URLs
TRAFFIC_ALLOWED_ORIGINS=["https://yourdomain.com","https://your-frontend.vercel.app"]

# Redis (if using cloud Redis)
TRAFFIC_REDIS_CONNECTION_STRING=redis://your-redis-host:6379

# MongoDB (if using)
TRAFFIC_MONGODB_CONNECTION_STRING=mongodb+srv://user:pass@cluster.mongodb.net/traffic
```

### Frontend Environment Variables

Create `frontend/.env.production`:

```bash
VITE_API_URL=https://your-backend-api.com
VITE_WS_URL=wss://your-backend-api.com
```

---

## 📊 Monitoring

### Docker Stats
```bash
docker stats

# Check container health
docker ps
docker inspect backend | grep Health
```

### Logs
```bash
# Backend logs
docker compose logs -f backend

# All logs
docker compose logs -f

# Last 100 lines
docker compose logs --tail=100
```

### Health Checks
- Backend: http://localhost:8000/health
- Prometheus metrics: http://localhost:8000/metrics

---

## 🔒 Security Checklist

- [ ] Change `TRAFFIC_JWT_SECRET_KEY` to a strong random value
- [ ] Set `TRAFFIC_DEBUG_MODE=false` in production
- [ ] Update `TRAFFIC_ALLOWED_ORIGINS` with actual domain
- [ ] Use HTTPS in production
- [ ] Set strong passwords for MongoDB/Redis
- [ ] Enable rate limiting
- [ ] Review and update firewall rules

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check logs
docker compose logs backend

# Rebuild
docker compose build --no-cache backend
docker compose up -d backend
```

### Frontend 404 errors
- Ensure nginx.conf is properly configured
- Check that `dist` folder was built correctly
- Verify VITE_API_URL points to correct backend

### Redis connection errors
```bash
# Check Redis is running
docker compose ps redis

# Test Redis
docker compose exec redis redis-cli ping
```

### Port conflicts
```bash
# Change ports in docker-compose.yml
ports:
  - "8001:8000"  # Use different host port
```

---

## 📦 Manual Deployment (Without Docker)

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run build

# Serve with any static server
npx serve -s dist -l 3000
```

---

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, Traefik)
- Run multiple backend instances
- Use Redis for session sharing

### Database
- Set up MongoDB for persistent analytics
- Use managed Redis service (Redis Cloud, AWS ElastiCache)

### CDN
- Serve frontend static assets via CDN
- Use CloudFlare or AWS CloudFront

---

## 🎯 Next Steps

1. **Install Docker Desktop** to use the Docker deployment
2. **Or** choose a cloud provider and follow their specific guide above
3. Update environment variables for production
4. Set up CI/CD pipeline using `.github/workflows/` (already configured)
5. Configure monitoring and alerting

---

## 📞 Support

- GitHub Issues: https://github.com/aaron-seq/AI-ML-Based-traffic-management-system/issues
- API Documentation: http://localhost:8000/api/docs (when running)

---

**Current Setup**: Both backend and frontend are running locally and fully functional!
- Backend: http://localhost:8000
- Frontend: http://localhost:5174
