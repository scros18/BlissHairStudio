// Minimal JSON API for products persistence
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
  : path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const PUBLIC_PRODUCTS = path.join(process.cwd(), 'public', 'products.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(PRODUCTS_FILE)) {
    try {
      const seed = fs.readFileSync(PUBLIC_PRODUCTS, 'utf-8');
      fs.writeFileSync(PRODUCTS_FILE, seed);
    } catch (e) {
      fs.writeFileSync(PRODUCTS_FILE, '[]');
    }
  }
}

function readProducts() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
}

function writeProducts(products) {
  ensureDataFile();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

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

const server = http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') return send(res, 204, '');

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/products' && req.method === 'GET') {
    return send(res, 200, readProducts());
  }

  if (url.pathname === '/api/products' && req.method === 'POST') {
    let buf = '';
    req.on('data', (c) => (buf += c));
    req.on('end', () => {
      try {
        const prod = JSON.parse(buf);
        const products = readProducts();
        prod.id = prod.id || `prod_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        prod.createdAt = prod.createdAt || Date.now();
        prod.updatedAt = Date.now();
        products.push(prod);
        writeProducts(products);
        send(res, 201, prod);
      } catch (e) {
        send(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  if (url.pathname.startsWith('/api/products/') && req.method === 'PUT') {
    const id = url.pathname.split('/').pop();
    let buf = '';
    req.on('data', (c) => (buf += c));
    req.on('end', () => {
      try {
        const updates = JSON.parse(buf);
        const products = readProducts();
        const idx = products.findIndex((p) => p.id === id);
        if (idx === -1) return send(res, 404, { error: 'Not found' });
        products[idx] = { ...products[idx], ...updates, id, updatedAt: Date.now() };
        writeProducts(products);
        send(res, 200, products[idx]);
      } catch (e) {
        send(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  if (url.pathname.startsWith('/api/products/') && req.method === 'DELETE') {
    const id = url.pathname.split('/').pop();
    const products = readProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return send(res, 404, { error: 'Not found' });
    writeProducts(filtered);
    return send(res, 204, '');
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, '0.0.0.0', () => {
  ensureDataFile();
  console.log(`API running on http://localhost:${PORT}`);
});
