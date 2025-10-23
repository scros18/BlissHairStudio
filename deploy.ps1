# Build
Write-Host "🔨 Building..." -ForegroundColor Green
npm run build

# Package
Write-Host "� Creating dist.zip..." -ForegroundColor Green
if (Test-Path ./dist.zip) { Remove-Item ./dist.zip -Force }
Compress-Archive -Path .\dist\* -DestinationPath .\dist.zip -Force

# Upload and deploy (safer)
$remote = "root@213.171.195.105"
$remotePath = "/var/www/blisshairstudio"

if (!(Test-Path ./dist.zip)) {
	Write-Host "dist.zip not found — aborting" -ForegroundColor Red
	exit 1
}

Write-Host "📤 Uploading dist.zip to $remote..." -ForegroundColor Green
scp .\dist.zip $remote:/tmp/dist.zip

Write-Host "� Creating backup and extracting on remote..." -ForegroundColor Green
ssh $remote "sudo mkdir -p $remotePath && sudo cp -r $remotePath $remotePath-backup-$(date +%F_%H%M%S) || true && sudo unzip -o /tmp/dist.zip -d $remotePath && sudo chown -R www-data:www-data $remotePath && sudo chmod -R 755 $remotePath && rm -f /tmp/dist.zip"

Write-Host "✨ Deployment complete!" -ForegroundColor Green
Write-Host "Visit: https://blisshairstudio.co.uk" -ForegroundColor Cyan