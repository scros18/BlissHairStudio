# BlissHairStudio - Complete Deployment Guide

## 🎯 Overview

This guide shows you how to deploy BlissHairStudio with full data persistence using JSON files that sync between local development and your VPS via Git.

## 📁 Data Architecture

### Data Files (Tracked in Git)
All application data is stored in `/data` directory:
- `products.json` - Product catalog
- `orders.json` - Customer orders  
- `users.json` - User accounts
- `passwords.json` - Password hashes
- `categories.json` - Product categories

### Why JSON Files?
- ✅ Simple - No database setup required
- ✅ Git-friendly - Version control for all data
- ✅ Portable - Works identically locally and on VPS
- ✅ Transparent - Easy to view and edit data

## 🚀 VPS Deployment Steps

### 1. Initial Server Setup

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 18+ and Nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs nginx git

# Create project directory
mkdir -p /var/www/blisshairstudio
cd /var/www/blisshairstudio
```

### 2. Clone Repository

```bash
# Clone your repo
git clone https://github.com/scros18/blisshairstudio.git .

# Or if already cloned, pull latest
git pull origin main

# Install dependencies
npm install
```

### 3. Build Frontend

```bash
# Build the production frontend
npm run build

# The dist/ folder will be served by Nginx
```

### 4. Setup API Server Service

```bash
# Copy the systemd service file
cp server/bliss-api.service /etc/systemd/system/

# Reload systemd
systemctl daemon-reload

# Enable and start the API service
systemctl enable bliss-api
systemctl start bliss-api

# Check status
systemctl status bliss-api

# View logs
journalctl -u bliss-api -f
```

### 5. Configure Nginx

Create `/etc/nginx/sites-available/blisshairstudio`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Frontend (Vite build)
    root /var/www/blisshairstudio/dist;
    index index.html;
    
    # Serve static files
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy to Node.js server
    location /api/ {
        proxy_pass http://localhost:8787;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

Enable the site:

```bash
# Create symlink
ln -s /etc/nginx/sites-available/blisshairstudio /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Reload Nginx
systemctl reload nginx
```

### 6. SSL with Let's Encrypt (Optional but Recommended)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is set up automatically
```

## 💻 Local Development

### 1. Clone Repository

```bash
git clone https://github.com/scros18/blisshairstudio.git
cd blisshairstudio
npm install
```

### 2. Create Local Environment File

```bash
cp .env.local.example .env.local
```

Content of `.env.local`:
```
VITE_API_URL=http://localhost:8787/api
```

### 3. Run Development Servers

You need TWO terminals:

**Terminal 1 - API Server:**
```bash
npm run api
```

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
```

Now open http://localhost:5173

## 🔄 Syncing Data Between Local & VPS

### Pull Data from VPS to Local

```bash
# On your VPS, commit any data changes
cd /var/www/blisshairstudio
git add data/
git commit -m "Update data - $(date)"
git push origin main

# On your local machine, pull the changes
git pull origin main
```

### Push Data from Local to VPS

```bash
# On your local machine
git add data/
git commit -m "Update data from local"
git push origin main

# On your VPS
cd /var/www/blisshairstudio
git pull origin main

# Restart API if needed
systemctl restart bliss-api
```

## 📊 Data Management

### View Current Data

```bash
# Products
cat data/products.json | jq .

# Orders
cat data/orders.json | jq .

# Users
cat data/users.json | jq .
```

### Backup Data

```bash
# Create backup
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# Or use Git tags
git tag -a backup-$(date +%Y%m%d) -m "Data backup"
git push --tags
```

### Restore Data

```bash
# From tar backup
tar -xzf backup-20241025.tar.gz

# From Git commit
git checkout <commit-hash> -- data/
```

## 🔧 Troubleshooting

### API Server Not Running

```bash
# Check status
systemctl status bliss-api

# View logs
journalctl -u bliss-api -n 50

# Restart
systemctl restart bliss-api
```

### Data Not Persisting

```bash
# Check file permissions
ls -la /var/www/blisshairstudio/data/

# Fix permissions if needed
chown -R www-data:www-data /var/www/blisshairstudio/data/
chmod 755 /var/www/blisshairstudio/data/
chmod 644 /var/www/blisshairstudio/data/*.json
```

### Port Already in Use

```bash
# Check what's using port 8787
lsof -i :8787

# Kill process if needed
kill -9 <PID>

# Restart API
systemctl restart bliss-api
```

## 🚦 API Health Check

```bash
# Check if API is running
curl http://localhost:8787/api/health

# Should return:
# {
#   "status": "ok",
#   "dataDir": "/var/www/blisshairstudio/data",
#   "files": {
#     "products": true,
#     "orders": true,
#     "users": true,
#     "passwords": true,
#     "categories": true
#   }
# }
```

## 📝 Regular Maintenance

### Daily
```bash
# Commit data changes
cd /var/www/blisshairstudio
git add data/
git commit -m "Daily data update"
git push
```

### Weekly
```bash
# Update dependencies
npm update

# Rebuild if needed
npm run build

# Restart services
systemctl restart bliss-api
systemctl reload nginx
```

### Monthly
```bash
# System updates
apt update && apt upgrade -y

# Backup data
tar -czf /backups/bliss-$(date +%Y%m).tar.gz /var/www/blisshairstudio/data/
```

## 🎉 You're Done!

Your BlissHairStudio site is now running with:
- ✅ Frontend served by Nginx
- ✅ API server running on port 8787
- ✅ All data persisted in JSON files
- ✅ Data synced via Git
- ✅ SSL (if configured)
- ✅ Auto-restart on failure

Visit your site at: https://your-domain.com
