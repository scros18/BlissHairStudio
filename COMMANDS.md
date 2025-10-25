# 🎯 Quick Command Reference

## Local Development

```bash
# Start API server (Terminal 1)
npm run api

# Start frontend dev server (Terminal 2)
npm run dev

# Or run both at once (if you have concurrently installed)
npm run dev:full
```

## Data Sync

```bash
# Pull latest data from VPS
git pull origin main

# Push local changes to VPS
git add data/
git commit -m "Data update"
git push origin main

# Quick sync commands
npm run sync:pull   # Pull from VPS
npm run sync:push   # Push to VPS

# Backup data
npm run data:backup
```

## VPS Commands

```bash
# Pull latest code and data
cd /var/www/blisshairstudio
git pull origin main

# Restart API server
sudo systemctl restart bliss-api

# View API logs
journalctl -u bliss-api -f

# Check API status
sudo systemctl status bliss-api

# Rebuild frontend
npm run build

# Reload Nginx
sudo systemctl reload nginx
```

## API Testing

```bash
# Health check
curl http://localhost:8787/api/health

# Get all products
curl http://localhost:8787/api/products

# Get all orders
curl http://localhost:8787/api/orders

# Get all users
curl http://localhost:8787/api/users
```

## Data Files

```bash
# View products
cat data/products.json | jq .

# View orders  
cat data/orders.json | jq .

# Count orders
cat data/orders.json | jq 'length'

# View latest order
cat data/orders.json | jq '.[-1]'
```

## Git Operations

```bash
# See what changed
git status

# View data changes
git diff data/

# Commit history
git log --oneline data/

# Create backup tag
git tag -a backup-$(date +%Y%m%d) -m "Backup"
git push --tags

# Restore from tag
git checkout tags/backup-20241025 -- data/
```

## Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint code
npm run lint
```

## Troubleshooting

```bash
# Port 8787 already in use?
lsof -i :8787
kill -9 <PID>

# Permission issues?
sudo chown -R www-data:www-data /var/www/blisshairstudio/data/
sudo chmod 755 /var/www/blisshairstudio/data/
sudo chmod 644 /var/www/blisshairstudio/data/*.json

# API not starting?
journalctl -u bliss-api -n 50
sudo systemctl restart bliss-api

# Nginx errors?
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

## File Locations

- **Local Data**: `./data/*.json`
- **VPS Data**: `/var/www/blisshairstudio/data/*.json`
- **API Server**: `server/index.js`
- **API Client**: `src/utils/apiClient.ts`
- **Service File**: `/etc/systemd/system/bliss-api.service`
- **Nginx Config**: `/etc/nginx/sites-available/blisshairstudio`

---

💡 Tip: Bookmark this file for quick reference!
