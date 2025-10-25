# Testing the New Storage System

## ✅ Step-by-Step Test

### 1. Make Sure Both Servers Are Running

**Terminal 1 (PowerShell):** API Server
```powershell
node server/index.js
```
Should see: `🚀 API Server running on http://localhost:8787`

**Terminal 2:** Dev Server  
```powershell
npm run dev
```
Should see: `Local: http://localhost:5173/`

### 2. Test Order Creation

1. Open your website: http://localhost:5173
2. Add some products to cart
3. Go to checkout
4. Fill in shipping details
5. Click "Place Order"
6. **Check PowerShell (API server terminal)** - Should see:
   ```
   ✅ Order created and saved to data/orders.json: BHS-XXX
   ```
7. Open `data/orders.json` - Should see your new order!

### 3. Test Admin Panel - Orders

1. Login to admin: maxine@blisshairstudio.com
2. Go to Admin Panel → Orders
3. You should see the order you just created
4. Click the **checkmark icon** (Mark Delivered)
5. **Check PowerShell** - Should see:
   ```
   ✅ Order status updated and saved to data/orders.json
   ```
6. Open `data/orders.json` - Order status should be "delivered"!

### 4. Test Admin Panel - Products

1. Still in Admin Panel → Products
2. Click "Edit" on any product
3. Change the price (e.g., £29.95 → £19.95)
4. Click "Save"
5. **Check PowerShell** - Should see:
   ```
   ✅ Product updated and saved to data/products.json
   ```
6. Open `data/products.json` - Price should be updated!

### 5. Test Persistence Across Browsers

1. **Chrome**: View your orders in admin panel
2. **Open Firefox (or Edge)**
3. Login to admin: maxine@blisshairstudio.com
4. Go to Admin Panel → Orders
5. **Same orders should appear!** ✅

### 6. Test Private/Incognito Mode

1. Open **Incognito/Private window**
2. Go to: http://localhost:5173/admin
3. Login: maxine@blisshairstudio.com
4. **All orders and products should be there!** ✅

## 🎯 What You Should See

### In Browser Console (F12 → Console):
```
✅ Loaded 3 products from API (data/products.json)
✅ Loaded 5 orders from API (data/orders.json)
✅ Order created and saved to data/orders.json: BHS-XXX
✅ Order status updated and saved to data/orders.json: BHS-XXX delivered
✅ Product updated and saved to data/products.json: Moisture Senses
```

### In PowerShell (API Server):
```
🚀 API Server running on http://localhost:8787
GET /api/products
GET /api/orders
POST /api/orders
PUT /api/orders/order_123 { status: 'delivered' }
PUT /api/products/prod_456 { price: 19.95 }
```

### In JSON Files:
- `data/orders.json` - Gets bigger as orders come in
- `data/products.json` - Updates when you edit products
- Both files save **immediately** after any change

## 🔍 Troubleshooting

### "No orders showing up"
**Fix:** Make sure API server is running (check PowerShell)

### "Changes not saving"
**Fix:** 
1. Check API server is running
2. Look at browser console (F12) for errors
3. Try refreshing the page

### "API server crashed"
**Fix:**
1. Look at PowerShell error message
2. Restart: `node server/index.js`

### "Port 8787 already in use"
**Fix:**
```powershell
# Find and kill the process
netstat -ano | findstr :8787
taskkill /PID <PID_NUMBER> /F
# Then restart: node server/index.js
```

## 📊 Expected Results

| Action | File Updated | Browser Message |
|--------|-------------|-----------------|
| Place order | `data/orders.json` | "✨ Order #BHS-XXX placed successfully!" |
| Mark delivered | `data/orders.json` | "✅ Order marked as delivered" |
| Edit product price | `data/products.json` | "✅ Product updated successfully" |
| Add product | `data/products.json` | "✅ Product added successfully" |
| Delete product | `data/products.json` | "✅ Product deleted" |

## 🎉 Success Checklist

- [ ] API server running (port 8787)
- [ ] Dev server running (port 5173)
- [ ] Orders save to `data/orders.json`
- [ ] Products update in `data/products.json`
- [ ] Admin panel shows all orders
- [ ] Mark delivered works
- [ ] Product edits save
- [ ] Works in different browsers
- [ ] Works in private/incognito mode
- [ ] Data persists after page refresh

If all checked ✅ → **System is working perfectly!**

---

**Pro Tip:** Keep the PowerShell (API server) window visible while testing. You'll see real-time confirmations as data saves!
