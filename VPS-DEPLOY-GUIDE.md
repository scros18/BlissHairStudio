# VPS Deployment Instructions for BlissHairStudio
# Complete guide to deploy with API support

## Prerequisites
- Node.js installed on VPS
- Nginx installed
- Git repository cloned to /var/www/blisshairstudio
- API server systemd service configured

## Step 1: Pull Latest Code
```bash
cd /var/www/blisshairstudio
git pull origin main
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Build for Production
```bash
npm run build
```
This will use `.env.production` which sets `VITE_API_BASE=/api`

## Step 4: Update Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/blisshairstudio
```

Add the API proxy location block (see `nginx-complete.conf` for full example):
```nginx
location /api/ {
    proxy_pass http://localhost:8787/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

Test nginx config:
```bash
sudo nginx -t
```

Reload nginx:
```bash
sudo systemctl reload nginx
```

## Step 5: Ensure API Server is Running
```bash
# Check if service exists
sudo systemctl status bliss-api

# If not running, start it
sudo systemctl start bliss-api

# Enable on boot
sudo systemctl enable bliss-api
```

## Step 6: Verify Data Directory
```bash
# Ensure data directory exists with correct permissions
ls -la /var/www/blisshairstudio/data/

# Should see:
# - orders.json
# - products.json
# - users.json
# - passwords.json
# - categories.json
```

## Step 7: Test API Endpoint
```bash
# Test API health check
curl http://localhost:8787/api/health

# Should return:
# {"status":"ok","dataDir":"/var/www/blisshairstudio/data","files":{...}}
```

## Step 8: Test Frontend API Connection
Visit your site in a browser and open DevTools > Network tab.
You should see:
- Requests to `/api/products` (200 OK)
- Requests to `/api/orders` (200 OK)
- NO CORS errors

## Quick Deploy Command (Run on VPS)
```bash
cd /var/www/blisshairstudio && \
git pull origin main && \
npm install && \
npm run build && \
sudo systemctl restart bliss-api && \
sudo systemctl reload nginx && \
echo "✅ Deployment complete!"
```

## Troubleshooting

### Issue: CORS Errors
**Cause:** Nginx not proxying API requests correctly
**Solution:** Verify nginx has the `/api/` location block with proxy_pass

### Issue: API Returns 502 Bad Gateway
**Cause:** API server not running on port 8787
**Solution:** 
```bash
sudo systemctl start bliss-api
sudo systemctl status bliss-api
```

### Issue: 404 on API Endpoints
**Cause:** API server not responding or wrong port
**Solution:**
```bash
# Check if port 8787 is listening
sudo netstat -tulpn | grep 8787

# Check API server logs
sudo journalctl -u bliss-api -n 50
```

### Issue: Orders/Products Not Saving
**Cause:** Data directory permissions or API server not writing
**Solution:**
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/blisshairstudio/data/
sudo chmod -R 755 /var/www/blisshairstudio/data/

# Restart API
sudo systemctl restart bliss-api
```

## Files Summary
- `.env.production` → Sets `VITE_API_BASE=/api` (relative path)
- `nginx-complete.conf` → Full nginx config with API proxy
- `server/index.js` → API server listening on port 8787
- `src/vite-env.d.ts` → TypeScript environment types
