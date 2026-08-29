#!/bin/bash
set -e

# Proje kok dizinine git
cd "$(dirname "$0")/.."

SERVER_HOST="${SERVER_HOST:?SERVER_HOST environment variable is required}"
SERVER_USER="${SERVER_USER:?SERVER_USER environment variable is required}"
SERVER_PASS="${SERVER_SSH_PASSWORD:?SERVER_SSH_PASSWORD environment variable is required}"
SERVER="${SERVER_USER}@${SERVER_HOST}"
PROJECT_DIR="/opt/sayfalar/beydigital"
IMAGE_NAME="beydigital-app"
TAR_FILE="${IMAGE_NAME}.tar.gz"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[BUILD]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; }

# ── 1. Local build ─────────────────────────────────────────────
log "Localde Docker imaji build ediliyor..."
docker build -t "${IMAGE_NAME}" .

log "Imaj boyutu:"
docker images "${IMAGE_NAME}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# ── 2. Export & compress ───────────────────────────────────────
log "Imaj disari aktariliyor ve sıkıstırılıyor..."
docker save "${IMAGE_NAME}" | gzip > "${TAR_FILE}"

TAR_SIZE=$(du -h "${TAR_FILE}" | cut -f1)
log "Sıkıstırılmıs imaj: ${TAR_FILE} (${TAR_SIZE})"

# ── 3. Transfer to server ──────────────────────────────────────
log "Imaj sunucuya gonderiliyor (${SERVER})..."
sshpass -p "${SERVER_PASS}" scp -o StrictHostKeyChecking=no "${TAR_FILE}" "${SERVER}:${PROJECT_DIR}/"

# ── 4. Load on server & deploy ─────────────────────────────────
log "Sunucuda imaj yukleniyor ve deploy ediliyor..."
sshpass -p "${SERVER_PASS}" ssh -o StrictHostKeyChecking=no "${SERVER}" "
  set -e
  cd ${PROJECT_DIR}

  echo '📦 Imaj yukleniyor...'
  docker load < ${TAR_FILE}
  rm ${TAR_FILE}

  echo '🛑 App container durduruluyor...'
  docker compose down app 2>/dev/null || true

  echo '🚀 App container baslatiliyor...'
  docker compose up -d --no-build

  echo ''
  echo '📊 Container durumu:'
  docker compose ps
"

# ── 5. Cleanup local tar ───────────────────────────────────────
rm -f "${TAR_FILE}"

echo ""
echo -e "${GREEN}✅ Deploy tamamlandı!${NC}"
echo "   Site:    https://beydigitalmedia.com"
echo "   Admin:   https://beydigitalmedia.com/admin"
echo ""
echo "   Logları izlemek için:"
echo "   ssh ${SERVER} 'cd ${PROJECT_DIR} && docker compose logs -f app'"
