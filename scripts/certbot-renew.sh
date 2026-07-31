#!/usr/bin/env bash

# This script runs certbot renew and reloads nginx if certificates were updated.
# It supports both host-based nginx and docker-based nginx.

set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"

# Check if using dockerized nginx by checking if the nginx profile is active
# or simply executing a reload on the container if it's running.
# Let's create a hook script that certbot can use.

HOOK_SCRIPT=$(mktemp)
cat << 'EOF' > "$HOOK_SCRIPT"
#!/usr/bin/env bash
# Reload host nginx if it is active
if systemctl is-active --quiet nginx; then
    echo "Reloading host nginx..."
    systemctl reload nginx
fi

# Reload dockerized nginx if it is running
if docker ps --format '{{.Names}}' | grep -q 'nginx'; then
    echo "Reloading dockerized nginx..."
    docker exec $(docker ps --format '{{.Names}}' | grep 'nginx' | head -n 1) nginx -s reload || true
fi
EOF

chmod +x "$HOOK_SCRIPT"

# Run certbot renew
certbot renew --quiet --deploy-hook "$HOOK_SCRIPT"

rm -f "$HOOK_SCRIPT"
