Local JSON API for products

- Start: node server/index.js (uses port 8787)
- Data file: server/data/products.json (auto-seeded from public/products.json if present)
- Endpoints:
  - GET    /api/products
  - POST   /api/products         {title, description, price, image?, badge?}
  - PUT    /api/products/:id     partial updates
  - DELETE /api/products/:id

Vite dev proxy should forward /api -> http://localhost:8787
