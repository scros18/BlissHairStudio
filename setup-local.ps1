# Quick Setup Script for BlissHairStudio on VPS (PowerShell version for Windows testing)

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   BlissHairStudio Local Setup          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
if (!(Test-Path ".env.local")) {
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "✅ Created .env.local" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.local already exists" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start development:" -ForegroundColor Cyan
Write-Host "1. Terminal 1: npm run api" -ForegroundColor White
Write-Host "2. Terminal 2: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Data directory: .\data" -ForegroundColor Yellow
Write-Host "All data is tracked in Git!" -ForegroundColor Yellow
