#!/bin/bash

# Configuration
DOMAINS="samalook.com www.samalook.com"
EMAIL="samalook221@gmail.com" # Using the email found in the SSH key comment
STAGING=0 # Set to 1 for testing to avoid hitting rate limits

if [ -d "./data/certbot/conf/live/samalook.com" ]; then
  echo "Certificates already exist for samalook.com."
  read -p "Do you want to request new certificates? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -e "nginx.conf" ]; then
  echo "nginx.conf does not exist."
  exit 1
fi

echo "### Backing up nginx.conf ..."
cp nginx.conf nginx.conf.bak

echo "### Creating dummy nginx config for ACME challenge ..."
cat > nginx.conf <<EOF
server {
    listen 80;
    server_name $DOMAINS;
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    location / {
        return 301 https://\$host\$request_uri;
    }
}
EOF

echo "### Starting nginx ..."
docker compose up -d web

echo "### Requesting Let's Encrypt certificate ..."
# Join domains for certbot
DOMAIN_ARGS=""
for domain in $DOMAINS; do
  DOMAIN_ARGS="$DOMAIN_ARGS -d $domain"
done

# Select staging or production
if [ $STAGING != "0" ]; then STAGING_ARG="--staging"; fi

docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $STAGING_ARG \
    $DOMAIN_ARGS \
    --email $EMAIL \
    --rsa-key-size 4096 \
    --agree-tos \
    --force-renewal \
    --non-interactive" certbot

echo "### Restoring production nginx config ..."
mv nginx.conf.bak nginx.conf

echo "### Reloading nginx ..."
docker compose restart web

echo "### HTTPS Setup Complete! 🔒"
