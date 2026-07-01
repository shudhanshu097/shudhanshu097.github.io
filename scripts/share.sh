#!/bin/bash
# Build + temporary public Cloudflare Tunnel link (works while this machine is on)
set -e
cd "$(dirname "$0")/.."

echo "Building site..."
npm run build

echo ""
echo "Starting local server on port 4173..."
npx serve@latest out -p 4173 &
SERVE_PID=$!
trap 'kill $SERVE_PID 2>/dev/null || true' EXIT

sleep 2
echo ""
echo "Creating Cloudflare public tunnel..."
echo "Your link will appear below (trycloudflare.com):"
echo ""
npx cloudflared@latest tunnel --url http://localhost:4173
