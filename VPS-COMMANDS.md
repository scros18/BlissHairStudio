# 🚀 VPS Quick Commands for Bliss Hair Studio

## Restart API Server
```bash
sudo systemctl restart bliss-api
```

## Check API Status
```bash
sudo systemctl status bliss-api
```

## View API Logs (Live)
```bash
sudo journalctl -u bliss-api -f
```

## Stop API
```bash
sudo systemctl stop bliss-api
```

## Start API
```bash
sudo systemctl start bliss-api
```

## Check if API is running
```bash
curl http://localhost:8787/api/health
```

## View Data Files
```bash
cd /var/www/blisshairstudio
ls -la data/
cat data/users.json
cat data/passwords.json
```

## Full Setup (run this first time or after major changes)
```bash
cd /var/www/blisshairstudio
git pull origin main
npm install
npm run build
sudo systemctl restart bliss-api
sudo systemctl restart nginx
```

## Fix Permissions (if files aren't saving)
```bash
cd /var/www/blisshairstudio
sudo chown -R www-data:www-data data/
sudo chmod 755 data/
sudo chmod 644 data/*.json
```

## Test API Endpoints
```bash
# Test users
curl http://localhost:8787/api/users

# Test passwords
curl http://localhost:8787/api/passwords

# Test health
curl http://localhost:8787/api/health
```
