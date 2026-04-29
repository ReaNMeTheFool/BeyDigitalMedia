#!/bin/bash
set -e

echo "🚀 Bey Digital Media + Payload CMS başlatılıyor..."

# MongoDB kontrolü — çökmüş veya durmuşsa silip yeniden oluştur
if docker ps --format '{{.Names}}' | grep -q '^mongo$'; then
  echo "✅ MongoDB zaten çalışıyor"
elif docker ps -a --format '{{.Names}}' | grep -q '^mongo$'; then
  echo "🐳 MongoDB container'ı silinip yeniden oluşturuluyor..."
  docker rm -f mongo >/dev/null
  docker run -d --name mongo -p 27017:27017 mongo:7 >/dev/null
else
  echo "🐳 MongoDB container'ı oluşturuluyor..."
  docker run -d --name mongo -p 27017:27017 mongo:7 >/dev/null
fi

# MongoDB'nin hazır olmasını bekle
echo "⏳ MongoDB hazır olması bekleniyor..."
for i in {1..30}; do
  if nc -z localhost 27017 2>/dev/null; then
    echo "✅ MongoDB portu açık"
    break
  fi
  sleep 1
done

# Port açık olsa da init tamamlanması için bekle
echo "⏳ MongoDB init tamamlanması bekleniyor..."
sleep 3

# .env.local değerlerini shell environment'a yükle
echo "🔧 Ortam değişkenleri yükleniyor..."
set -a
source .env.local
set +a

# Seed
echo "🌱 Seed script çalıştırılıyor (idempotent)..."
npx tsx src/payload/seed.ts

# Dev sunucusu başlat
echo ""
echo "🖥️ Next.js dev sunucusu başlatılıyor..."
echo "   🌐 Site:     http://localhost:3000"
echo "   🔐 Admin:    http://localhost:3000/admin"
echo "   📧 Email:    admin@beydigitalmedia.com"
echo "   🔑 Password: admin123"
echo ""
npm run dev
