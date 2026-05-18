#!/bin/bash
set -e

SERVER="root@212.68.34.84"
SERVER_PASS="Ahmetonur1"
PROJECT_DIR="/opt/sayfalar/beydigital"
IMAGE_NAME="beydigital-app"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[DEPLOY]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; }

run_ssh() {
  sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$SERVER" "$@"
}

# ── 1. Check server available RAM ──────────────────────────────
log "Checking server available RAM..."
AVAILABLE_MEM_KB=$(run_ssh "grep MemAvailable /proc/meminfo | awk '{print \$2}'")
AVAILABLE_MEM_MB=$((AVAILABLE_MEM_KB / 1024))
AVAILABLE_MEM_GB=$(awk "BEGIN {printf \"%.1f\", $AVAILABLE_MEM_MB/1024}")

log "Server available RAM: ${AVAILABLE_MEM_MB}MB (${AVAILABLE_MEM_GB}GB)"

# Reserve 1GB for OS + running containers, use rest for build
RESERVE_MB=1024
BUILD_MEM_MB=$((AVAILABLE_MEM_MB - RESERVE_MB))

if [ "$BUILD_MEM_MB" -lt 1024 ]; then
  err "Not enough memory! Available: ${AVAILABLE_MEM_MB}MB, need at least 2GB."
  err "Try stopping some containers or checking server load."
  exit 1
fi

# Cap build memory at 3GB max (server total is 4GB)
MAX_BUILD_MEM_MB=3072
if [ "$BUILD_MEM_MB" -gt "$MAX_BUILD_MEM_MB" ]; then
  BUILD_MEM_MB=$MAX_BUILD_MEM_MB
fi

# Swap = build_mem + 2GB (but not exceeding 11GB total)
BUILD_SWAP_MB=$((BUILD_MEM_MB + 2048))
MAX_SWAP_MB=11264  # 11GB
if [ "$BUILD_SWAP_MB" -gt "$MAX_SWAP_MB" ]; then
  BUILD_SWAP_MB=$MAX_SWAP_MB
fi

BUILD_MEM="${BUILD_MEM_MB}m"
BUILD_SWAP="${BUILD_SWAP_MB}m"

log "Build memory limit: ${BUILD_MEM} (swap: ${BUILD_SWAP})"

# ── 2. Push latest code ────────────────────────────────────────
log "Pushing latest commits..."
git push origin master

# ── 3. Pull on server ──────────────────────────────────────────
log "Pulling latest code on server..."
run_ssh "cd $PROJECT_DIR && git stash && git pull"

# ── 4. Clean Docker build cache ────────────────────────────────
log "Cleaning Docker build cache on server..."
run_ssh "docker builder prune -f" 2>/dev/null || true

# ── 5. Build image with dynamic memory limits ──────────────────
log "Building Docker image on server (--memory=${BUILD_MEM} --memory-swap=${BUILD_SWAP})..."
run_ssh "cd $PROJECT_DIR && docker build --memory=${BUILD_MEM} --memory-swap=${BUILD_SWAP} -t ${IMAGE_NAME} ."

# ── 6. Restart app container ───────────────────────────────────
log "Restarting app container..."
run_ssh "cd $PROJECT_DIR && docker compose down app && docker compose up -d --no-build"

# ── 7. Verify deployment ───────────────────────────────────────
log "Checking container status..."
run_ssh "cd $PROJECT_DIR && docker compose ps"

echo ""
echo -e "${GREEN}Deploy complete!${NC}"
echo "   Site:    https://beydigitalmedia.com"
echo "   Admin:   https://beydigitalmedia.com/admin"
echo ""
echo "   Check logs:"
echo "   ssh root@212.68.34.84 'docker logs beydigital-app-1 -f'"
