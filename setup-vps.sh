you can #!/bin/bash
# Quick setup script for BlissHairStudio on VPS

set -e

echo "╔════════════════════════════════════════╗"
echo "║   BlissHairStudio VPS Setup            ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo "❌ Please run as root (use sudo)"
   exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building frontend..."
npm run build

echo "⚙️  Setting up API service..."
cp server/bliss-api.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable bliss-api
systemctl start bliss-api

echo "✅ Checking API status..."
sleep 2
systemctl status bliss-api --no-pager

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Nginx (see DEPLOYMENT-COMPLETE.md)"
echo "2. Test API: curl http://localhost:8787/api/health"
echo "3. View logs: journalctl -u bliss-api -f"
echo ""
echo "Data directory: $(pwd)/data"
echo "All data is tracked in Git!"
