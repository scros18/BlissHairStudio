# BlissHairStudio Data Directory

This directory contains all persistent data for the application in JSON format.

## Files

- `products.json` - Product catalog
- `orders.json` - Customer orders
- `users.json` - User accounts
- `passwords.json` - Hashed passwords
- `categories.json` - Product categories

## Sync with Git

All JSON files in this directory are tracked in Git, allowing you to:
- Work locally with the same data as production
- Push changes from local to VPS
- Pull changes from VPS to local

## API Server

The Node.js API server (server/index.js) reads and writes to these files.

### Local Development
```bash
npm run api
```

### Production (VPS)
The API server runs as a systemd service on the VPS.

## Data Location

- **Local**: `./data/`
- **VPS**: `/var/www/blisshairstudio/data/`

Both locations sync via Git!
