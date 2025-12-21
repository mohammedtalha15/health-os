# Health OS - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Domain name (for production)

## Environment Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd health-os
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=Health OS
```

### 3. Build Application

```bash
npm run build
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Custom Domain**
   - Settings → Domains
   - Add your domain
   - Configure DNS records

### Option 2: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t health-os .
   docker run -p 3000:3000 health-os
   ```

### Option 3: Traditional Server (PM2)

1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "health-os" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## SSL/TLS Setup

### Using Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Database Setup

### PostgreSQL

```bash
# Create database
createdb healthos

# Run migrations
npm run migrate
```

## Backend Deployment

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
export DATABASE_URL="postgresql://user:pass@localhost/healthos"
export SECRET_KEY="your-secret-key"
```

### 3. Run with Gunicorn

```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
```

## Monitoring

### 1. Application Monitoring

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.js
```

### 2. Server Monitoring

```bash
# PM2 monitoring
pm2 monit

# Logs
pm2 logs health-os
```

### 3. Performance Monitoring

- Enable Next.js Analytics
- Configure Google Analytics
- Set up error tracking

## Backup Strategy

### Database Backups

```bash
# Daily backup script
pg_dump healthos > backup_$(date +%Y%m%d).sql

# Automated with cron
0 2 * * * /path/to/backup.sh
```

### File Backups

```bash
# Backup uploaded files
rsync -av /path/to/uploads /backup/location
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Dependencies updated
- [ ] Firewall configured
- [ ] Backups automated
- [ ] Monitoring active

## Performance Optimization

### 1. Enable Caching

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 2. CDN Configuration

- Configure CloudFlare or similar
- Enable image optimization
- Set up edge caching

### 3. Database Optimization

- Add indexes
- Enable connection pooling
- Configure query caching

## Rollback Procedure

```bash
# Vercel
vercel rollback

# PM2
pm2 reload health-os --update-env

# Docker
docker pull health-os:previous-tag
docker-compose up -d
```

## Health Checks

```bash
# Application health
curl https://yourdomain.com/api/health

# Database health
pg_isready -h localhost -p 5432
```

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Performance Issues

```bash
# Analyze bundle
npm run analyze

# Check logs
pm2 logs health-os --lines 100
```

### Database Issues

```bash
# Check connections
SELECT * FROM pg_stat_activity;

# Reset connections
SELECT pg_terminate_backend(pid) FROM pg_stat_activity;
```

## Support

For deployment issues:
- Check documentation
- Review logs
- Contact support team

## Post-Deployment

1. Verify all features working
2. Test critical user flows
3. Monitor error rates
4. Check performance metrics
5. Validate backups
6. Update documentation
