# Complete Deployment Guide for 100/100/100 Lighthouse Scores

## Prerequisites on VPS:
```bash
# Install ImageMagick for image optimization
sudo apt-get update
sudo apt-get install -y imagemagick webp

# Install Node.js 18+ if not already installed
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Step 1: Update nginx configuration

Edit `/etc/nginx/sites-available/blisshairstudio`:

```nginx
server {
    listen 443 ssl http2;
    server_name blisshairstudio.co.uk www.blisshairstudio.co.uk;
    
    root /var/www/blisshairstudio/current;
    index index.html;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/blisshairstudio.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blisshairstudio.co.uk/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    
    # Remove server signature
    server_tokens off;
    more_clear_headers Server;
    
    # Charset
    charset utf-8;
    charset_types text/html text/css application/javascript application/json;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;
    
    # Brotli compression (if module installed)
    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
        access_log off;
    }
    
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
        access_log off;
    }
    
    location ~* \.(woff|woff2|ttf|otf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff" always;
        access_log off;
    }
    
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }
    
    # Preload header for critical resources
    location = / {
        add_header Link "</logo-transparent.svg>; rel=preload; as=image" always;
    }
}

server {
    listen 80;
    server_name blisshairstudio.co.uk www.blisshairstudio.co.uk;
    return 301 https://$server_name$request_uri;
}
```

## Step 2: Optimize images on VPS

```bash
cd /var/www/blisshairstudio/current

# Convert and optimize all product images
for file in *.jpg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .jpg)
        # Create WebP versions at different sizes
        convert "$file" -resize 300x300 -quality 85 "${filename}-300.webp"
        convert "$file" -resize 600x600 -quality 85 "${filename}-600.webp"
        convert "$file" -quality 85 "${filename}.webp"
    fi
done

# Optimize logo
convert logo.png -resize 320x320 -quality 90 logo-320.webp
convert logo.png -resize 180x180 -quality 90 logo-180.webp

# Set proper permissions
chown -R www-data:www-data /var/www/blisshairstudio/current
```

## Step 3: Build and deploy with optimizations

```bash
cd /var/www/blisshairstudio

# Pull latest changes
git pull origin main

# Install dependencies including new PostCSS plugins
npm ci

# Build with optimizations
npm run build

# Deploy to production
rsync -av --delete dist/ /var/www/blisshairstudio/current/

# Set permissions
chown -R www-data:www-data /var/www/blisshairstudio/current

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx
```

## Step 4: Verify optimizations

1. Clear browser cache
2. Run Lighthouse test: https://pagespeed.web.dev/
3. Check all scores are 100/100/100

## Expected Results:
- ✅ Performance: 100
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

## Troubleshooting:

If scores aren't 100:
1. Check nginx error logs: `tail -f /var/log/nginx/error.log`
2. Verify gzip/brotli are working: `curl -I -H "Accept-Encoding: gzip" https://blisshairstudio.co.uk`
3. Check image formats are being served: inspect Network tab in DevTools
4. Verify cache headers: use browser DevTools Network tab
