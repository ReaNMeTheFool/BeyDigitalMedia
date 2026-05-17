#!/bin/bash
set -e

SERVER="root@212.68.34.84"
SERVER_PASS="Ahmetonur1"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[SYNC]${NC}  $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; }

run_ssh() {
  sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 "$SERVER" "$@"
}

cleanup() {
  rm -f /tmp/beydigital_dump.archive
  docker exec mongo rm -f /tmp/beydigital_dump.archive 2>/dev/null || true
  run_ssh "rm -f /tmp/beydigital_dump.archive; rm -rf /tmp/media_sync/" 2>/dev/null || true
}
trap cleanup EXIT

# ── 1. Check local MongoDB ──────────────────────────────────
log "Checking local MongoDB..."
MONGO_CONTAINER=$(docker ps --format '{{.Names}}' | grep '^mongo$' || true)
if [ -z "$MONGO_CONTAINER" ]; then
  err "Local MongoDB container 'mongo' is not running!"
  echo "   Start it first: npm run start:all"
  echo "   Or manually:    docker run -d --name mongo -p 27017:27017 mongo:7"
  exit 1
fi
log "Local MongoDB is running (container: mongo)"

# ── 2. Dump MongoDB on server ───────────────────────────────
log "Dumping production MongoDB (this may take a few seconds)..."
run_ssh "
  docker exec beydigital-mongo-1 mongodump \
    --db beydigital \
    --archive=/tmp/beydigital_dump.archive \
    2>&1
"
log "MongoDB dump created on server"

run_ssh "
  docker cp beydigital-mongo-1:/tmp/beydigital_dump.archive /tmp/beydigital_dump.archive
"

# ── 3. Download dump ────────────────────────────────────────
log "Downloading MongoDB dump..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no \
  "$SERVER:/tmp/beydigital_dump.archive" \
  /tmp/beydigital_dump.archive
log "Dump downloaded ($(du -h /tmp/beydigital_dump.archive | cut -f1))"

run_ssh "rm -f /tmp/beydigital_dump.archive"

# ── 4. Restore to local MongoDB ─────────────────────────────
log "Restoring to local MongoDB..."
docker cp /tmp/beydigital_dump.archive mongo:/tmp/beydigital_dump.archive
docker exec mongo mongorestore \
  --db beydigital \
  --drop \
  --archive=/tmp/beydigital_dump.archive \
  2>&1 || true
docker exec mongo rm -f /tmp/beydigital_dump.archive
rm -f /tmp/beydigital_dump.archive
log "MongoDB restored locally"

# ── 5. Sync media files ─────────────────────────────────────
log "Syncing media files from production..."
LOCAL_MEDIA_DIR="./public/media"
mkdir -p "$LOCAL_MEDIA_DIR"

run_ssh "
  rm -rf /tmp/media_sync/
  docker cp beydigital-app-1:/app/public/media/. /tmp/media_sync/ 2>/dev/null || true
"

sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no -r \
  "$SERVER:/tmp/media_sync/" \
  /tmp/media_sync_download/ 2>/dev/null || true

cp /tmp/media_sync_download/* "$LOCAL_MEDIA_DIR/" 2>/dev/null || true
rm -rf /tmp/media_sync_download/

run_ssh "rm -rf /tmp/media_sync/"

FILE_COUNT=$(ls -1 "$LOCAL_MEDIA_DIR"/ 2>/dev/null | wc -l)
log "Media files synced: $FILE_COUNT files in $LOCAL_MEDIA_DIR/"

# ── 6. Summary ──────────────────────────────────────────────
echo ""
echo -e "${GREEN}Sync complete!${NC}"
echo "   MongoDB:  beydigital DB restored to local mongo:27017"
echo "   Media:    $FILE_COUNT files in ./public/media/"
echo ""
echo "   Start dev:  npm run start:all"
echo "   Dev site:   http://localhost:3000"
echo "   Admin:      http://localhost:3000/admin"
