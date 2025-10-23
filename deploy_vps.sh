#!/usr/bin/env bash
set -euo pipefail

# deploy_vps.sh
# Idempotent deploy script for a fresh Ubuntu/Debian-based VPS.
# Usage: sudo ./deploy_vps.sh
# Edit the DOMAIN and EMAIL variables below before running.

#########################
# Configuration
#########################
DOMAIN="blisshairstudio.co.uk"
EMAIL="admin@blisshairstudio.co.uk"  # used for Let's Encrypt registration
REPO_URL="https://github.com/scros18/blisshairstudio.git"
APP_DIR="/var/www/blisshairstudio"
NODE_VERSION="18"
NGINX_CONF_PATH="/etc/nginx/sites-available/blisshairstudio"

#########################
# Helper functions
#########################
echoinfo(){ echo -e "\e[34m[INFO]\e[0m $*"; }
echowarn(){ echo -e "\e[33m[WARN]\e[0m $*"; }
echoerr(){ echo -e "\e[31m[ERROR]\e[0m $*" >&2; }

require_root(){
  if [ "$(id -u)" -ne 0 ]; then
    echoerr "This script must be run as root. Use: sudo $0"
    exit 1
  fi
}

install_packages(){
  echoinfo "Updating apt and installing packages..."
  apt-get update -y
  # Ensure git and rsync are available for cloning and copying build artifacts
  apt-get install -y curl ca-certificates gnupg lsb-release software-properties-common nginx unzip git rsync
}

install_node(){
  if command -v node >/dev/null 2>&1; then
    local current_version
    current_version=$(node -v | sed 's/v//')
    echoinfo "Node detected: v${current_version}"
  else
    echoinfo "Installing Node.js ${NODE_VERSION}..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
  fi
}

install_certbot(){
  if ! command -v certbot >/dev/null 2>&1; then
    echoinfo "Installing Certbot (snapd)..."
    apt-get install -y snapd
    snap install core; snap refresh core
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
  else
    echoinfo "certbot already installed"
  fi
}

setup_app_dir(){
  echoinfo "Ensuring application directory exists: ${APP_DIR}"
  mkdir -p "${APP_DIR}"
  chmod -R 755 "${APP_DIR}"
}

clone_or_update_repo(){
  if [ -d "${APP_DIR}/.git" ]; then
    echoinfo "Updating repository in ${APP_DIR}..."
    git -C "${APP_DIR}" fetch --all --prune
    git -C "${APP_DIR}" reset --hard origin/main
    git -C "${APP_DIR}" pull origin main || true
  else
    echoinfo "Cloning repository into ${APP_DIR}..."
    rm -rf "${APP_DIR}" || true
    mkdir -p "$(dirname "${APP_DIR}")"
    git clone "${REPO_URL}" "${APP_DIR}"
  fi
  # ensure permissions for the deployer user if available
  if [ -n "${SUDO_USER:-}" ]; then
    chown -R "${SUDO_USER}" :root "${APP_DIR}" || true
  fi
}

build_site(){
  echoinfo "Installing npm dependencies and building site..."
  cd "${APP_DIR}"
  # run npm as the non-root SUDO_USER if possible
  if [ "${SUDO_USER:-}" != "" ] && [ "${SUDO_USER:-}" != "root" ]; then
    sudo -u "${SUDO_USER}" npm install --production=false --no-audit --no-fund
    sudo -u "${SUDO_USER}" npm run build
  else
    npm install --production=false --no-audit --no-fund
    npm run build
  fi

  # Ensure dist exists
  if [ ! -d "${APP_DIR}/dist" ]; then
    echoerr "Build did not produce a dist/ directory"
    exit 1
  fi

  # Ensure 'current' folder exists and sync built files
  mkdir -p "${APP_DIR}/current"
  rsync -a --delete "${APP_DIR}/dist/" "${APP_DIR}/current/"
  chown -R www-data:www-data "${APP_DIR}/current"
}

configure_nginx(){
  echoinfo "Configuring nginx site..."
  cat > "${NGINX_CONF_PATH}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    root ${APP_DIR}/current;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \.(?:manifest|appcache|html?|xml|json)
    {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location ~* \.(?:css|js|woff2?|ttf|svg|ico|png|jpg|jpeg|webp)$ {
        try_files \$uri =404;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

  ln -sf "${NGINX_CONF_PATH}" /etc/nginx/sites-enabled/blisshairstudio
  # Remove default site if present
  if [ -f /etc/nginx/sites-enabled/default ]; then
    rm -f /etc/nginx/sites-enabled/default
  fi
  nginx -t
  # Use service to reload so we avoid systemctl when it's unavailable
  if command -v service >/dev/null 2>&1; then
    service nginx reload || nginx -s reload || true
  else
    nginx -s reload || true
  fi
}

enable_ssl_nginx(){
  echoinfo "Enabling SSL nginx server block..."
  # write a TLS-enabled nginx block using Certbot locations
  cat > "${NGINX_CONF_PATH}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    root ${APP_DIR}/current;
    index index.html;

    location /.well-known/acme-challenge/ {
        try_files \$uri =404;
    }

    location / {
        try_files \$uri \$uri/ =404;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN};

    root ${APP_DIR}/current;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \.(?:css|js|woff2?|ttf|svg|ico|png|jpg|jpeg|webp)$ {
        try_files \$uri =404;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

  ln -sf "${NGINX_CONF_PATH}" /etc/nginx/sites-enabled/blisshairstudio
  nginx -t
  if command -v service >/dev/null 2>&1; then
    service nginx reload || nginx -s reload || true
  else
    nginx -s reload || true
  fi
}

obtain_ssl(){
  echoinfo "Requesting SSL certificate from Let's Encrypt using webroot (no systemctl calls)..."
  mkdir -p "${APP_DIR}/current/.well-known/acme-challenge"
  chown -R www-data:www-data "${APP_DIR}/current/.well-known"

  # Use webroot only to avoid invoking systemd
  if certbot certonly --webroot -w "${APP_DIR}/current" --non-interactive --agree-tos --email "${EMAIL}" -d "${DOMAIN}"; then
    echoinfo "Certificate obtained successfully"
    enable_ssl_nginx
  else
    echoerr "Certbot webroot issuance failed. Inspect /var/log/letsencrypt/letsencrypt.log"
    return 1
  fi
}

setup_cron_renewal(){
  echoinfo "Setting up a daily cron for certbot renew (snap installs usually handle this)."
  # ensure a simple cron exists for certbot renew
  (crontab -l 2>/dev/null | grep -v certbot || true; echo "0 3 * * * /usr/bin/certbot renew --quiet --deploy-hook \"systemctl reload nginx\"") | crontab -
}

main(){
  require_root
  install_packages
  install_node
  install_certbot
  setup_app_dir
  clone_or_update_repo
  build_site
  configure_nginx
  obtain_ssl
  setup_cron_renewal
  echoinfo "Deployment finished — visit https://${DOMAIN}"
}

main "$@"
#!/usr/bin/env bash
set -euo pipefail

# deploy_vps.sh
# Idempotent deploy script for a fresh Ubuntu/Debian-based VPS.
# Usage: sudo ./deploy_vps.sh
# Edit the DOMAIN and EMAIL variables below before running.

#########################
# Configuration
#########################
DOMAIN="blisshairstudio.co.uk"
EMAIL="admin@blisshairstudio.co.uk"  # used for Let's Encrypt registration
REPO_URL="https://github.com/scros18/blisshairstudio.git"
APP_DIR="/var/www/blisshairstudio"
NODE_VERSION="18"
NGINX_CONF_PATH="/etc/nginx/sites-available/blisshairstudio"

#########################
# Helper functions
#########################
echoinfo(){ echo -e "\e[34m[INFO]\e[0m $*"; }
echowarn(){ echo -e "\e[33m[WARN]\e[0m $*"; }
echoerr(){ echo -e "\e[31m[ERROR]\e[0m $*" >&2; }

require_root(){
  if [ "$(id -u)" -ne 0 ]; then
    echoerr "This script must be run as root. Use: sudo $0"
    exit 1
  fi
}

install_packages(){
  echoinfo "Updating apt and installing packages..."
  apt-get update -y
  apt-get install -y curl ca-certificates gnupg lsb-release software-properties-common nginx unzip
}

install_node(){
  if command -v node >/dev/null 2>&1; then
    local current_version
    current_version=$(node -v | sed 's/v//')
    echoinfo "Node detected: v${current_version}"
  else
    echoinfo "Installing Node.js ${NODE_VERSION}..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
  fi
}

install_certbot(){
  if ! command -v certbot >/dev/null 2>&1; then
    echoinfo "Installing Certbot (snapd)..."
    apt-get install -y snapd
    snap install core; snap refresh core
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
  else
    echoinfo "certbot already installed"
  fi
}

setup_app_dir(){
  echoinfo "Ensuring application directory exists: ${APP_DIR}"
  mkdir -p "${APP_DIR}"
  chown -R $SUDO_USER:root "${APP_DIR}" || true
  chmod -R 755 "${APP_DIR}"
}

clone_or_update_repo(){
  if [ -d "${APP_DIR}/.git" ]; then
    echoinfo "Updating repository..."
    git -C "${APP_DIR}" fetch --all --prune
    git -C "${APP_DIR}" reset --hard origin/main
    git -C "${APP_DIR}" pull origin main || true
  else
    echoinfo "Cloning repository into ${APP_DIR}..."
    git clone "${REPO_URL}" "${APP_DIR}"
  fi
  chown -R $SUDO_USER:root "${APP_DIR}"
}

build_site(){
  echoinfo "Installing npm dependencies and building site..."
  cd "${APP_DIR}"
  npm install --production=false --no-audit --no-fund
  npm run build
  # Ensure dist exists
  if [ ! -d "${APP_DIR}/dist" ]; then
    echoerr "Build did not produce a dist/ directory"
    exit 1
  fi
  # Copy built files to APP_DIR (already inside APP_DIR/dist)
  rsync -a --delete "${APP_DIR}/dist/" "${APP_DIR}/current/" || true
  chown -R www-data:www-data "${APP_DIR}/current"
}

configure_nginx(){
  echoinfo "Configuring nginx site..."
  cat > "${NGINX_CONF_PATH}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    root ${APP_DIR}/current;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \.(?:manifest|appcache|html?|xml|json)
    {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location ~* \.(?:css|js|woff2?|ttf|svg|ico|png|jpg|jpeg|webp)$ {
        try_files \$uri =404;
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

  ln -sf "${NGINX_CONF_PATH}" /etc/nginx/sites-enabled/blisshairstudio
  # Remove default site if present
  if [ -f /etc/nginx/sites-enabled/default ]; then
    rm -f /etc/nginx/sites-enabled/default
  fi
  nginx -t
  systemctl reload nginx
}

obtain_ssl(){
  echoinfo "Requesting SSL certificate from Let's Encrypt..."
  # Use webroot plugin; certbot will place challenge files under ${APP_DIR}/current/.well-known
  mkdir -p "${APP_DIR}/current/.well-known/acme-challenge"
  chown -R www-data:www-data "${APP_DIR}/current/.well-known"

  certbot --nginx --non-interactive --agree-tos --redirect --email "${EMAIL}" -d "${DOMAIN}" || \
    certbot certonly --webroot -w "${APP_DIR}/current" --non-interactive --agree-tos --email "${EMAIL}" -d "${DOMAIN}"

  echoinfo "SSL certificate request finished. Certbot will handle renewals via snap." 
}

setup_cron_renewal(){
  echoinfo "Setting up a daily cron for certbot renew (snap installs usually handle this)."
  # ensure a simple cron exists for certbot renew
  (crontab -l 2>/dev/null | grep -v certbot || true; echo "0 3 * * * /usr/bin/certbot renew --quiet --deploy-hook \"systemctl reload nginx\"") | crontab -
}

main(){
  require_root
  install_packages
  install_node
  install_certbot
  setup_app_dir
  clone_or_update_repo
  build_site
  configure_nginx
  obtain_ssl
  setup_cron_renewal
  echoinfo "Deployment finished — visit https://${DOMAIN}"
}

main "$@"
