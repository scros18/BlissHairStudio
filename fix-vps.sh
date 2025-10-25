#!/bin/bash
# Quick fix script for VPS - Run this to fix all API issues

echo "🔧 BlissHairStudio VPS Fix Script"
echo "=================================="

# Navigate to project
cd /var/www/blisshairstudio || exit 1

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Rebuild frontend
echo "🏗️  Building frontend..."
npm run build

# Update nginx config
echo "⚙️  Updating nginx configuration..."
sudo tee /etc/nginx/sites-available/blisshairstudio > /dev/null << 'EOF'
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name blisshairstudio.co.uk www.blisshairstudio.co.uk;
    
    ssl_certificate /etc/letsencrypt/live/blisshairstudio.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blisshairstudio.co.uk/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    root /var/www/blisshairstudio/dist;
    index index.html;
    
    # API Proxy - CRITICAL: No trailing /api/ to avoid double path
    location /api/ {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # SPA Routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Cache Control
    location ~* \.(css|js|jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location ~* \.(html|json|xml)$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }
    
    charset utf-8;
    
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript;
}

server {
    listen 80;
    listen [::]:80;
    server_name blisshairstudio.co.uk www.blisshairstudio.co.uk;
    return 301 https://$server_name$request_uri;
}
EOF

# Test nginx config
echo "🧪 Testing nginx configuration..."
sudo nginx -t

if [ $? -eq 0 ]; then
    # Reload nginx
    echo "🔄 Reloading nginx..."
    sudo systemctl reload nginx
    
    # Restart API server
    echo "🔄 Restarting API server..."
    sudo systemctl restart bliss-api
    
    # Wait a moment
    sleep 2
    
    # Test endpoints
    echo ""
    echo "✅ Testing API endpoints..."
    echo "---"
    
    echo "1. API Health Check:"
    curl -s http://localhost:8787/api/health | jq '.' || echo "Failed"
    
    echo ""
    echo "2. Products via proxy:"
    curl -s https://blisshairstudio.co.uk/api/products | jq '. | length' || echo "Failed"
    
    echo ""
    echo "3. Orders via proxy:"
    curl -s https://blisshairstudio.co.uk/api/orders | jq '. | length' || echo "Failed"
    
    echo ""
    echo "=================================="
    echo "✅ Fix complete! Clear browser cache and test:"
    echo "   - Press Ctrl+Shift+R to hard refresh"
    echo "   - Check DevTools Network tab"
    echo "   - URLs should be: /api/products (not /api/api/products)"
else
    echo "❌ Nginx config test failed! Check the errors above."
    exit 1
fi
