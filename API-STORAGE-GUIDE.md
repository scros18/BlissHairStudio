# API-Backed Data Storage System

## 🎯 Overview

Your Bliss Hair Studio website now uses **persistent JSON file storage** with a REST API backend. All data (orders, products, etc.) is saved to JSON files in the `/data` directory and syncs via Git between your local machine and VPS.

## 📁 Data Storage

### JSON Files (in `/data` directory):
- **`orders.json`** - All customer orders
- **`products.json`** - Product catalog  
- **`users.json`** - User accounts
- **`passwords.json`** - Password hashes
- **`categories.json`** - Product categories

### How It Works:
1. **Frontend** (website) → Calls API
2. **API Server** (Node.js) → Reads/Writes JSON files
3. **Git** → Syncs JSON files between local & VPS

## 🚀 Running Locally

### 1. Start API Server (Terminal 1):
```powershell
node server/index.js
```
**Port:** 8787  
**Status:** Check http://localhost:8787/api/health

### 2. Start Dev Server (Terminal 2):
```powershell
npm run dev
```
**Port:** 5173 (or whatever Vite assigns)  
**Status:** Your website runs here

### 3. Test It:
- Create an order → Saved to `data/orders.json`
- Add/edit products in admin → Saved to `data/products.json`
- Switch browsers/private mode → Data persists!

## 🔄 Syncing Data

### Local → VPS:
```powershell
git add data/
git commit -m "Update orders/products data"
git push origin main
```

### VPS → Local:
```powershell
git pull origin main
```

### On VPS After Pull:
```bash
sudo systemctl restart bliss-api
```

## 🎨 Admin Panel Features

### Orders Management:
- ✅ **View Details** - See full order info
- ✅ **Mark Delivered** - Update order status
- ✅ **Cancel** - Cancel orders

All changes **instantly saved** to `data/orders.json`!

### Products Management:
- Add new products → Saved to `data/products.json`
- Edit prices/titles → Saved to `data/products.json`
- Delete products → Removed from `data/products.json`

All changes **instantly saved** to `data/products.json`!

## 🛠 Technical Details

### API Endpoints:
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Code Changes:
- **`src/utils/orderManagerAPI.ts`** - New API-backed order manager
- **`src/utils/productManagerAPI.ts`** - New API-backed product manager
- **`src/main.ts`** - Updated to use API managers

### Old vs New:
| Old System | New System |
|------------|------------|
| localStorage only | JSON files + API |
| Browser-specific | Works across browsers |
| Not persistent | Fully persistent |
| No sync | Git sync enabled |

## 📝 For Your Mum (Admin User)

### Creating/Managing Orders:
1. When customers place orders, they're automatically saved
2. Go to Admin Panel → Orders section
3. Click icons to:
   - 👁️ **View** order details
   - ✓ **Mark Delivered** when shipped
   - ✕ **Cancel** if needed
4. All changes save automatically!

### Managing Products:
1. Go to Admin Panel → Products section
2. Edit product titles, prices, descriptions
3. Add new products with "Add Product" button
4. Delete products you no longer sell
5. All changes save automatically!

### Data is Saved:
- ✅ Switch computers → Data is there
- ✅ Close browser → Data is there
- ✅ Private mode → Data is there
- ✅ Different browsers → Data is there

## 🐛 Troubleshooting

### "Orders not appearing":
1. Check API server is running: http://localhost:8787/api/health
2. Check browser console (F12) for errors
3. Refresh the page

### "Changes not saving":
1. Make sure API server is running
2. Check `data/orders.json` or `data/products.json` - should update immediately
3. Check browser console (F12) for error messages

### "Can't see data on VPS":
1. Make sure you pushed changes: `git push origin main`
2. On VPS: `git pull origin main`
3. Restart API: `sudo systemctl restart bliss-api`

## 🎉 Benefits

✅ **Persistent** - Data never disappears  
✅ **Synced** - Works on local & VPS  
✅ **Simple** - Just JSON files  
✅ **Backed Up** - Git history = automatic backups  
✅ **Portable** - Easy to export/import  
✅ **Mom-Friendly** - Just use the admin panel normally!

---

**Need Help?** Check the browser console (F12 → Console tab) for helpful messages like:
- ✅ "Order created and saved to data/orders.json"
- ✅ "Product updated and saved to data/products.json"
- ✅ "Loaded 5 orders from API (data/orders.json)"
