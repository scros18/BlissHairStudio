# Admin Panel Guide

## ✅ Changes Made

### 1. Focus Border Styling
- **Changed**: Admin panel and site-wide focus borders from green (#16A34A) to subtle grey (#D1D5DB)
- **Files Updated**:
  - `src/styles/base.css` - Site-wide focus outline
  - `src/styles/admin-panel.css` - Admin panel focus outlines (2 locations)

### 2. Edit & Delete Functionality

#### **Current Status: ✅ FULLY FUNCTIONAL**

The Edit and Delete buttons are already working! Here's how:

#### Edit Product
1. Click the "Edit" button on any product card
2. Product details load into the modal form
3. Make your changes
4. Click "Save Product"
5. Product is updated in localStorage
6. Changes appear immediately across the entire site

#### Delete Product  
1. Click the "Delete" button on any product card
2. Confirm the deletion in the popup dialog
3. Product is removed from localStorage
4. Product disappears from all pages immediately

### 3. Data Persistence

#### How Products Are Stored:

**Loading Priority:**
1. **First**: Tries to load from `/public/products.json`
2. **Then**: Falls back to localStorage if JSON not found
3. **Finally**: Uses default products if neither exist

**Saving:**
- All changes (add/edit/delete) save to **localStorage**
- localStorage persists in the browser even after closing/reopening
- The site always pulls from productManager which checks both sources

#### Why Not Directly Save to products.json?

Browser JavaScript **cannot write to server files** for security reasons. To persist to `products.json`, you would need:

- A backend server (Node.js, PHP, etc.)
- An API endpoint to handle file writes
- OR manually download and replace the file

### 4. Exporting Products

**To Export Your Updated Products:**

1. Go to Admin Panel
2. Click **"Export JSON"** button
3. A `products-YYYY-MM-DD.json` file downloads
4. **Manual Step**: Replace `/public/products.json` with the downloaded file
5. Redeploy the site

This ensures your changes become the "source of truth" for all users.

### 5. Current Workflow

**For Development/Testing:**
- Edit and delete products freely in admin panel
- Changes persist in localStorage
- Works perfectly for single-user/single-browser scenarios

**For Production:**
- Make changes in admin panel
- Export JSON when done
- Replace `/public/products.json` with exported file
- Commit and deploy

---

## Testing the Changes

### Test Focus Borders:
1. Navigate to home page or admin panel
2. Click on any product card
3. **Expected**: Subtle grey border appears (not green/teal)

### Test Edit:
1. Go to `/admin` page
2. Click "Edit" on a product
3. Change title or price
4. Save
5. **Expected**: Changes appear immediately

### Test Delete:
1. Go to `/admin` page  
2. Click "Delete" on a product
3. Confirm deletion
4. **Expected**: Product disappears from admin and site

---

## Technical Details

### Files Modified:
- `src/styles/base.css` - Line 168-170
- `src/styles/admin-panel.css` - Lines 171-173 and 1174-1176

### Files Already Functional:
- `src/main.ts` - Edit/Delete button handlers (lines 1116-1134)
- `src/utils/productManager.ts` - CRUD methods
- `src/pages/admin.ts` - Admin panel template

### Product Manager Methods:
- `getAllProducts()` - Get all products
- `getProduct(id)` - Get single product
- `addProduct(data)` - Add new product
- `updateProduct(id, updates)` - Update existing product
- `deleteProduct(id)` - Remove product
- `downloadJSON()` - Export to JSON file

---

## Need Help?

If Edit/Delete buttons aren't working:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Try: `window.deleteProduct('product-id')` in console to test manually
4. Verify products load: `productManager.getAllProducts()`
