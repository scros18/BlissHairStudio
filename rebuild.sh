#!/bin/bash

# BlissHairStudio - Force Clean Rebuild Script
# Run this on your VPS after pulling changes from git

set -e  # Exit on any error

echo "🚀 Starting forced clean rebuild..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Navigate to project directory
echo -e "${BLUE}📁 Navigating to project directory...${NC}"
cd /var/www/blisshairstudio || { echo "Error: Project directory not found"; exit 1; }

# Stash any local changes
echo -e "${BLUE}💾 Stashing local changes (if any)...${NC}"
git stash

# Pull latest changes
echo -e "${BLUE}⬇️  Pulling latest changes from git...${NC}"
git pull origin main

# Show latest commits
echo -e "${BLUE}📝 Latest commits:${NC}"
git log --oneline -3
echo ""

# Remove dist folder
echo -e "${YELLOW}🗑️  Removing old dist folder...${NC}"
rm -rf dist/

# Remove Vite cache
echo -e "${YELLOW}🗑️  Clearing Vite cache...${NC}"
rm -rf node_modules/.vite

# Remove TypeScript cache
echo -e "${YELLOW}🗑️  Clearing TypeScript cache...${NC}"
rm -rf node_modules/.cache

# Clean install dependencies
echo -e "${BLUE}📦 Clean installing dependencies...${NC}"
npm ci

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

# Verify dist folder exists
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build successful! Dist folder created.${NC}"
    echo -e "${BLUE}📊 Dist folder contents:${NC}"
    ls -lah dist/ | head -10
else
    echo -e "${YELLOW}⚠️  Warning: Dist folder not found!${NC}"
    exit 1
fi

# Restart nginx
echo -e "${BLUE}🔄 Restarting nginx...${NC}"
sudo systemctl restart nginx

# Check nginx status
if sudo systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx is running!${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Nginx may not be running properly${NC}"
    sudo systemctl status nginx
fi

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "${YELLOW}💡 Remember to hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)${NC}"
echo ""
