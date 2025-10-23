# Build
Write-Host "🔨 Building..." -ForegroundColor Green
npm run build

# Upload
Write-Host "📤 Uploading..." -ForegroundColor Green
scp -r dist/* root@213.171.195.105:/var/www/blisshairstudio/

# Set permissions via SSH
Write-Host "🔐 Setting permissions..." -ForegroundColor Green
ssh root@213.171.195.105 "sudo chown -R www-data:www-data /var/www/blisshairstudio && sudo chmod -R 755 /var/www/blisshairstudio"

Write-Host "✨ Deployment complete!" -ForegroundColor Green
Write-Host "Visit: https://blisshairstudio.co.uk" -ForegroundColor Cyan