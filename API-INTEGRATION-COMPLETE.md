# Complete API Integration - All Data Persisted to JSON

## ✅ What Was Fixed

### 1. **Double `/api/api/` Path Issue** - CRITICAL FIX
**Problem:** 
- API_BASE was set to `/api`
- Code was calling `/api/products`
- Result: `/api` + `/api/products` = `/api/api/products` ❌

**Solution:**
- Removed `/api` prefix from all fetch URLs
- Now: `/api` + `/products` = `/api/products` ✅

**Files Changed:**
- `src/utils/orderManagerAPI.ts` - All endpoints now use `/orders` instead of `/api/orders`
- `src/utils/productManagerAPI.ts` - All endpoints now use `/products` instead of `/api/products`

### 2. **User Authentication & Data** - NEW API-BACKED SYSTEM
**Created:** `src/utils/authManagerAPI.ts`

**Features:**
- ✅ User registration → Saves to `data/users.json`
- ✅ User login with password verification
- ✅ Password storage → Saves to `data/passwords.json`
- ✅ User profile updates
- ✅ Address management (add/update/delete)
- ✅ User preferences (SMS notifications, email settings)
- ✅ Session management (7-day expiry)
- ✅ Default admin account creation

**API Endpoints Used:**
- `GET /api/users` - Load all users
- `POST /api/users` - Register new user
- `PUT /api/users/:id` - Update user profile/addresses/preferences
- `GET /api/passwords` - Load password hashes
- `POST /api/passwords` - Save user password

---

## 📁 Data Files on VPS

All data is stored in `/var/www/blisshairstudio/data/`:

```
data/
├── orders.json       ← Customer orders
├── products.json     ← Product catalog
├── users.json        ← User accounts, addresses, preferences
├── passwords.json    ← Password hashes
└── categories.json   ← Product categories
```

---

## 🚀 Deploy to VPS

### Quick Deploy (One Command):
```bash
cd /var/www/blisshairstudio && git pull origin main && chmod +x fix-vps.sh && sudo ./fix-vps.sh
```

### Manual Deploy:
```bash
cd /var/www/blisshairstudio
git pull origin main
npm run build
sudo systemctl reload nginx
sudo systemctl restart bliss-api
```

---

## 📊 What Gets Saved

### Products
- ✅ Add new product → `data/products.json`
- ✅ Update product → `data/products.json`
- ✅ Delete product → `data/products.json`

### Orders
- ✅ Customer checkout → `data/orders.json`
- ✅ Admin mark delivered → `data/orders.json`
- ✅ Admin cancel order → `data/orders.json`

### Users
- ✅ User registration → `data/users.json` + `data/passwords.json`
- ✅ Profile updates → `data/users.json`
- ✅ Add/update address → `data/users.json`
- ✅ Update preferences (SMS, email) → `data/users.json`

---

## 🔧 User Preferences

Users can now control:
- **SMS Notifications** - Get text alerts for orders
- **Email Notifications** - Get email updates
- **Marketing Emails** - Receive promotional emails

Saved in user object:
```json
{
  "id": "user_123",
  "email": "customer@example.com",
  "name": "John Doe",
  "preferences": {
    "smsNotifications": true,
    "emailNotifications": true,
    "marketingEmails": false
  },
  "addresses": [
    {
      "id": "addr_001",
      "name": "Home",
      "street": "123 Main St",
      "city": "London",
      "postalCode": "SW1A 1AA",
      "country": "United Kingdom",
      "isDefault": true
    }
  ]
}
```

---

## 🔐 Default Admin Account

**Email:** maxine.croston@email.com  
**Password:** Password123

- Full admin access
- Can manage orders
- Can manage products
- Has sample address and preferences

---

## ✅ Testing Checklist

After deployment:

### Products
- [ ] Admin can add products
- [ ] Products appear on homepage
- [ ] Products save to `data/products.json`

### Orders
- [ ] Customer can checkout
- [ ] Order appears in admin panel
- [ ] Order saves to `data/orders.json`
- [ ] Admin can mark delivered

### Users
- [ ] New user can register
- [ ] User can login
- [ ] User data saves to `data/users.json`
- [ ] User can add address
- [ ] User can update preferences
- [ ] User can view order history

### API
- [ ] No `/api/api/` errors in DevTools
- [ ] All requests go to `/api/products`, `/api/orders`, `/api/users`
- [ ] API server shows console logs

---

## 🐛 Troubleshooting

### Still seeing `/api/api/` errors?
1. Make sure you ran `npm run build` on VPS
2. Hard refresh browser (Ctrl+Shift+R)
3. Check nginx config has `proxy_pass http://127.0.0.1:8787;` (no /api/ at end)

### Orders not saving?
1. Check API server is running: `sudo systemctl status bliss-api`
2. Check data directory permissions: `ls -la /var/www/blisshairstudio/data/`
3. Check API logs: `sudo journalctl -u bliss-api -n 50`

### Users not persisting?
1. Verify authManagerAPI is being used (check imports in files)
2. Check `data/users.json` exists and is writable
3. Check API /users endpoint works: `curl http://localhost:8787/api/users`

---

## 📝 Next Steps

To use the new auth system, update imports in your files:

**Before:**
```typescript
import { authManager } from './utils/authManager';
```

**After:**
```typescript
import { authManagerAPI as authManager } from './utils/authManagerAPI';
```

This will automatically switch to API-backed storage! 🎉
