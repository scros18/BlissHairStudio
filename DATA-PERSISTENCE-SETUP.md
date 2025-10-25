# 🎯 BlissHairStudio - Data Persistence Setup Complete!

## ✅ What's Been Set Up

Your BlissHairStudio now has **complete data persistence** with JSON files that sync between local and VPS via Git!

### 📁 Data Files (All in `/data` folder)
- ✅ `products.json` - Product catalog
- ✅ `orders.json` - Customer orders
- ✅ `users.json` - User accounts  
- ✅ `passwords.json` - Password hashes
- ✅ `categories.json` - Product categories

### 🔧 What's New

1. **API Server** (`server/index.js`)
   - Full REST API for all data operations
   - Automatically creates data files if missing
   - Runs on port 8787

2. **Data Directory** (`/data`)
   - All JSON files tracked in Git
   - Syncs between local and VPS
   - Automatic backups via Git commits

3. **API Client** (`src/utils/apiClient.ts`)
   - Frontend utility for API calls
   - Handles all CRUD operations
   - Error handling built-in

4. **Deployment Tools**
   - `server/bliss-api.service` - Systemd service for VPS
   - `setup-vps.sh` - One-command VPS setup
   - `setup-local.ps1` - Local Windows setup
   - Complete deployment guides

## 🚀 Quick Start

### Local Development (Windows)

**Option 1: PowerShell Script**
```powershell
.\setup-local.ps1
```

**Option 2: Manual**
```bash
# Terminal 1 - API Server
npm run api

# Terminal 2 - Frontend
npm run dev
```

Visit: http://localhost:5173

### VPS Deployment

```bash
# On your VPS
cd /var/www/blisshairstudio
./setup-vps.sh
```

See `DEPLOYMENT-COMPLETE.md` for full guide!

## 📊 Data Sync Commands

### Pull data from VPS
```bash
npm run sync:pull
# or
git pull origin main
```

### Push data to VPS
```bash
npm run sync:push
# or
git add data/ && git commit -m "Data update" && git push
```

### Create backup
```bash
npm run data:backup
```

## 🎯 How It Works

### When a customer places an order:

1. **Frontend** → Calls `apiClient.createOrder(order)`
2. **API Server** → Saves to `data/orders.json`
3. **Git** → Commit and push to sync with VPS
4. **VPS** → Pull to get latest orders

### Data Flow

```
┌─────────────────┐      ┌──────────────┐      ┌─────────────────┐
│   Local Dev     │ ←────│     Git      │────→ │   VPS Prod      │
│                 │      │              │      │                 │
│ data/*.json     │      │  Repository  │      │ data/*.json     │
│ API: :8787      │      │              │      │ API: :8787      │
│ Frontend: :5173 │      └──────────────┘      │ Nginx: :80/443  │
└─────────────────┘                            └─────────────────┘
```

## 📚 Documentation

- **`DEPLOYMENT-COMPLETE.md`** - Full VPS deployment guide
- **`DATA-SYNC.md`** - How to sync data between local & VPS
- **`data/README.md`** - Data directory overview
- **`server/README.md`** - API server documentation

## 🔧 API Endpoints

All endpoints are at `http://localhost:8787/api`:

### Products
- `GET /api/products` - List all
- `POST /api/products` - Create new
- `PUT /api/products/:id` - Update
- `DELETE /api/products/:id` - Delete

### Orders
- `GET /api/orders` - List all
- `POST /api/orders` - Create new
- `PUT /api/orders/:id` - Update
- `DELETE /api/orders/:id` - Delete

### Categories
- `GET /api/categories` - List all
- `POST /api/categories` - Create new
- `PUT /api/categories/:id` - Update
- `DELETE /api/categories/:id` - Delete

### Users
- `GET /api/users` - List all
- `POST /api/users` - Create new
- `PUT /api/users/:id` - Update

### Passwords
- `GET /api/passwords` - Get all hashes
- `POST /api/passwords` - Save password hash

### Health
- `GET /api/health` - Check API status

## 🎉 Benefits

### ✅ Simple
- No database setup required
- Plain JSON files anyone can read
- Easy to understand and debug

### ✅ Git-Friendly
- All data versioned
- See history of changes
- Roll back if needed

### ✅ Portable
- Works identically locally and on VPS
- Easy to backup (just copy data folder)
- Easy to migrate (push/pull via Git)

### ✅ Transparent
- View data with any text editor
- Edit manually if needed
- No SQL knowledge required

## 🚨 Important Notes

1. **Always commit data changes**
   ```bash
   git add data/
   git commit -m "Describe what changed"
   git push
   ```

2. **Pull before making changes**
   ```bash
   git pull origin main
   ```

3. **On VPS, restart API after pulling**
   ```bash
   sudo systemctl restart bliss-api
   ```

4. **Regular backups**
   ```bash
   npm run data:backup
   ```

## 🎯 Next Steps

1. ✅ **Fixed** - Admin panel "Mark Delivered" button now has proper width
2. ✅ **Fixed** - View Details on profile orders now works perfectly
3. ✅ **NEW** - All data persists in JSON files
4. ✅ **NEW** - Data syncs via Git
5. ✅ **NEW** - Complete API server
6. ✅ **NEW** - VPS deployment ready

## 🎊 You're All Set!

Your BlissHairStudio now has:
- ✅ Persistent data storage
- ✅ Git-based sync
- ✅ API server
- ✅ Complete deployment setup
- ✅ Fixed admin panel buttons
- ✅ Working order details modal

Just run `npm run api` and `npm run dev` to start developing!

---

Made with 💝 for BlissHairStudio
