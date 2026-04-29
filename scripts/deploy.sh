#!/bin/bash
set -e

echo "🚀 Production deploy başlatılıyor..."

# .env kontrolü
if [ ! -f ".env" ]; then
  echo "⚠️  .env dosyası bulunamadı! .env.example'dan kopyalayın:"
  echo "   cp .env.example .env"
  exit 1
fi

# Eski container'ları durdur
echo "🛑 Eski container'lar durduruluyor..."
docker compose down 2>/dev/null || true

# Build ve başlat
echo "🏗️  Docker image build ediliyor..."
docker compose up -d --build

# Durum kontrolü
echo ""
echo "📊 Container durumu:"
docker compose ps

echo ""
echo "✅ Deploy tamamlandı!"
echo "   Uygulama: http://localhost:3000"
echo "   Admin:    http://localhost:3000/admin"
echo ""
echo "📝 Logları izlemek için:"
echo "   docker compose logs -f app"
