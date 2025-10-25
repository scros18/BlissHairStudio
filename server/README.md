Local JSON API for products

- Start: node server/index.js (uses port 8787)
- Data file: server/data/products.json (auto-seeded from public/products.json if present)
- Endpoints:
  - GET    /api/products
  - POST   /api/products         {title, description, price, image?, badge?}
  - PUT    /api/products/:id     partial updates
  - DELETE /api/products/:id

## Production on a VPS

1) Start the API locally on the server

- Optional once-off: choose a persistent data directory and create it
  sudo mkdir -p /var/www/blisshairstudio/data
  sudo chown -R www-data:www-data /var/www/blisshairstudio

- Start the API in the background (temporary)
  nohup node ./server/index.js > /var/log/bliss-api.log 2>&1 &

2) Nginx proxy for /api

Inside your site server block (same one serving the SPA), add:

  location /api/ {
    proxy_pass http://127.0.0.1:8787/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

Then apply:

  sudo nginx -t && sudo systemctl reload nginx

Test:

  curl -I https://<your-domain>/api/products

3) Optional: systemd service (auto-start)

Copy the example unit and enable it:

  sudo cp server/bliss-api.service.example /etc/systemd/system/bliss-api.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now bliss-api
  sudo systemctl status bliss-api

Logs:

  journalctl -u bliss-api -f

Vite dev proxy should forward /api -> http://localhost:8787
