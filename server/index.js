// Comprehensive JSON API for BlissHairStudio data persistence
// Handles: products, orders, users, categories
// Run: node server/index.js

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8787;
const DATA_DIR = process.env.BLISS_DATA_DIR
  ? path.resolve(process.env.BLISS_DATA_DIR)
  : path.join(process.cwd(), 'data');

// Data file paths
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PASSWORDS_FILE = path.join(DATA_DIR, 'passwords.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

// Fallback to public folder for initial seed data
const PUBLIC_PRODUCTS = path.join(process.cwd(), 'public', 'products.json');
const PUBLIC_CATEGORIES = path.join(process.cwd(), 'public', 'categories.json');

// Ensure data directory and files exist
function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`✅ Created data directory: ${DATA_DIR}`);
  }

  // Initialize products
  if (!fs.existsSync(PRODUCTS_FILE)) {
    try {
      const seed = fs.readFileSync(PUBLIC_PRODUCTS, 'utf-8');
      fs.writeFileSync(PRODUCTS_FILE, seed);
      console.log('✅ Initialized products.json from public folder');
    } catch (e) {
      fs.writeFileSync(PRODUCTS_FILE, '[]');
      console.log('✅ Created empty products.json');
    }
  }

  // Initialize categories
  if (!fs.existsSync(CATEGORIES_FILE)) {
    try {
      const seed = fs.readFileSync(PUBLIC_CATEGORIES, 'utf-8');
      fs.writeFileSync(CATEGORIES_FILE, seed);
      console.log('✅ Initialized categories.json from public folder');
    } catch (e) {
      fs.writeFileSync(CATEGORIES_FILE, '[]');
      console.log('✅ Created empty categories.json');
    }
  }

  // Initialize orders
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, '[]');
    console.log('✅ Created empty orders.json');
  }

  // Initialize users
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
    console.log('✅ Created empty users.json');
  }

  // Initialize passwords
  if (!fs.existsSync(PASSWORDS_FILE)) {
    fs.writeFileSync(PASSWORDS_FILE, '{}');
    console.log('✅ Created empty passwords.json');
  }

  // Initialize bookings
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, '[]');
    console.log('✅ Created empty bookings.json');
  }
}

// Generic read/write functions
function readData(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message);
    return [];
  }
}

function writeData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error(`Error writing ${filePath}:`, e.message);
    return false;
  }
}

// Send JSON response
function send(res, status, data) {
  const body = typeof data === 'string' ? data : JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

// Parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', (chunk) => (buf += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(buf));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// API Routes Handler
const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') return send(res, 204, '');

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method;

  try {
    // ===== PRODUCTS API =====
    if (pathname === '/api/products' && method === 'GET') {
      const products = readData(PRODUCTS_FILE);
      return send(res, 200, products);
    }

    if (pathname === '/api/products' && method === 'POST') {
      const product = await parseBody(req);
      const products = readData(PRODUCTS_FILE);
      product.id = product.id || `prod_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      product.createdAt = product.createdAt || Date.now();
      product.updatedAt = Date.now();
      products.push(product);
      writeData(PRODUCTS_FILE, products);
      return send(res, 201, product);
    }

    if (pathname.startsWith('/api/products/') && method === 'PUT') {
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const products = readData(PRODUCTS_FILE);
      const idx = products.findIndex((p) => p.id === id);
      if (idx === -1) return send(res, 404, { error: 'Product not found' });
      products[idx] = { ...products[idx], ...updates, id, updatedAt: Date.now() };
      writeData(PRODUCTS_FILE, products);
      return send(res, 200, products[idx]);
    }

    if (pathname.startsWith('/api/products/') && method === 'DELETE') {
      const id = pathname.split('/').pop();
      const products = readData(PRODUCTS_FILE);
      const filtered = products.filter((p) => p.id !== id);
      if (filtered.length === products.length) return send(res, 404, { error: 'Product not found' });
      writeData(PRODUCTS_FILE, filtered);
      return send(res, 204, '');
    }

    // ===== ORDERS API =====
    if (pathname === '/api/orders' && method === 'GET') {
      const orders = readData(ORDERS_FILE);
      return send(res, 200, orders);
    }

    if (pathname === '/api/orders' && method === 'POST') {
      const order = await parseBody(req);
      const orders = readData(ORDERS_FILE);
      order.id = order.id || `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      order.createdAt = order.createdAt || Date.now();
      order.updatedAt = Date.now();
      orders.push(order);
      writeData(ORDERS_FILE, orders);
      return send(res, 201, order);
    }

    if (pathname.startsWith('/api/orders/') && method === 'PUT') {
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const orders = readData(ORDERS_FILE);
      const idx = orders.findIndex((o) => o.id === id);
      if (idx === -1) return send(res, 404, { error: 'Order not found' });
      orders[idx] = { ...orders[idx], ...updates, id, updatedAt: Date.now() };
      writeData(ORDERS_FILE, orders);
      return send(res, 200, orders[idx]);
    }

    if (pathname.startsWith('/api/orders/') && method === 'DELETE') {
      const id = pathname.split('/').pop();
      const orders = readData(ORDERS_FILE);
      const filtered = orders.filter((o) => o.id !== id);
      if (filtered.length === orders.length) return send(res, 404, { error: 'Order not found' });
      writeData(ORDERS_FILE, filtered);
      return send(res, 204, '');
    }

    // ===== CATEGORIES API =====
    if (pathname === '/api/categories' && method === 'GET') {
      const categories = readData(CATEGORIES_FILE);
      return send(res, 200, categories);
    }

    if (pathname === '/api/categories' && method === 'POST') {
      const category = await parseBody(req);
      const categories = readData(CATEGORIES_FILE);
      category.id = category.id || `cat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      category.createdAt = category.createdAt || Date.now();
      categories.push(category);
      writeData(CATEGORIES_FILE, categories);
      return send(res, 201, category);
    }

    if (pathname.startsWith('/api/categories/') && method === 'PUT') {
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const categories = readData(CATEGORIES_FILE);
      const idx = categories.findIndex((c) => c.id === id);
      if (idx === -1) return send(res, 404, { error: 'Category not found' });
      categories[idx] = { ...categories[idx], ...updates, id };
      writeData(CATEGORIES_FILE, categories);
      return send(res, 200, categories[idx]);
    }

    if (pathname.startsWith('/api/categories/') && method === 'DELETE') {
      const id = pathname.split('/').pop();
      const categories = readData(CATEGORIES_FILE);
      const filtered = categories.filter((c) => c.id !== id);
      if (filtered.length === categories.length) return send(res, 404, { error: 'Category not found' });
      writeData(CATEGORIES_FILE, filtered);
      return send(res, 204, '');
    }

    // ===== USERS API =====
    if (pathname === '/api/users' && method === 'GET') {
      const users = readData(USERS_FILE);
      return send(res, 200, users);
    }

    if (pathname === '/api/users' && method === 'POST') {
      const user = await parseBody(req);
      const users = readData(USERS_FILE);
      user.id = user.id || `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      user.createdAt = user.createdAt || new Date().toISOString();
      users.push(user);
      writeData(USERS_FILE, users);
      return send(res, 201, user);
    }

    if (pathname.startsWith('/api/users/') && method === 'PUT') {
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const users = readData(USERS_FILE);
      const idx = users.findIndex((u) => u.id === id);
      if (idx === -1) return send(res, 404, { error: 'User not found' });
      users[idx] = { ...users[idx], ...updates, id };
      writeData(USERS_FILE, users);
      return send(res, 200, users[idx]);
    }

    // ===== PASSWORDS API =====
    if (pathname === '/api/passwords' && method === 'GET') {
      const passwords = readData(PASSWORDS_FILE);
      return send(res, 200, passwords);
    }

    if (pathname === '/api/passwords' && method === 'POST') {
      const { userId, password } = await parseBody(req);
      const passwords = readData(PASSWORDS_FILE);
      passwords[userId] = password;
      writeData(PASSWORDS_FILE, passwords);
      return send(res, 200, { success: true });
    }

    // ===== BOOKINGS API =====
    if (pathname === '/api/bookings' && method === 'GET') {
      const bookings = readData(BOOKINGS_FILE);
      return send(res, 200, bookings);
    }

    if (pathname === '/api/bookings' && method === 'POST') {
      const booking = await parseBody(req);
      const bookings = readData(BOOKINGS_FILE);
      booking.id = booking.id || `booking_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      booking.createdAt = booking.createdAt || Date.now();
      booking.updatedAt = Date.now();
      bookings.push(booking);
      writeData(BOOKINGS_FILE, bookings);
      return send(res, 201, booking);
    }

    if (pathname.startsWith('/api/bookings/') && method === 'PUT') {
      const id = pathname.split('/').pop();
      const updates = await parseBody(req);
      const bookings = readData(BOOKINGS_FILE);
      const idx = bookings.findIndex((b) => b.id === id);
      if (idx === -1) return send(res, 404, { error: 'Booking not found' });
      bookings[idx] = { ...bookings[idx], ...updates, id, updatedAt: Date.now() };
      writeData(BOOKINGS_FILE, bookings);
      return send(res, 200, bookings[idx]);
    }

    if (pathname.startsWith('/api/bookings/') && method === 'DELETE') {
      const id = pathname.split('/').pop();
      const bookings = readData(BOOKINGS_FILE);
      const filtered = bookings.filter((b) => b.id !== id);
      if (filtered.length === bookings.length) return send(res, 404, { error: 'Booking not found' });
      writeData(BOOKINGS_FILE, filtered);
      return send(res, 204, '');
    }

    // Health check
    if (pathname === '/api/health' && method === 'GET') {
      return send(res, 200, { 
        status: 'ok', 
        dataDir: DATA_DIR,
        files: {
          products: fs.existsSync(PRODUCTS_FILE),
          orders: fs.existsSync(ORDERS_FILE),
          users: fs.existsSync(USERS_FILE),
          passwords: fs.existsSync(PASSWORDS_FILE),
          categories: fs.existsSync(CATEGORIES_FILE),
          bookings: fs.existsSync(BOOKINGS_FILE)
        }
      });
    }

    // Not found
    send(res, 404, { error: 'Endpoint not found' });
  } catch (error) {
    console.error('Server error:', error);
    send(res, 500, { error: error.message });
  }
});

// Start server
ensureDataFiles();
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   BlissHairStudio API Server          ║
╠════════════════════════════════════════╣
║  Status: RUNNING ✅                    ║
║  Port: ${PORT}                            ║
║  Data Dir: ${DATA_DIR}
║                                        ║
║  Endpoints:                            ║
║  • GET/POST/PUT/DELETE /api/products  ║
║  • GET/POST/PUT/DELETE /api/orders    ║
║  • GET/POST/PUT/DELETE /api/bookings  ║
║  • GET/POST/PUT/DELETE /api/categories║
║  • GET/POST/PUT /api/users            ║
║  • GET/POST /api/passwords            ║
║  • GET /api/health                    ║
╚════════════════════════════════════════╝
  `);
});
