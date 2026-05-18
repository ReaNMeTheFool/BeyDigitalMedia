#!/bin/bash
set -e

echo "🌱 Payload CMS seed script çalıştırılıyor..."

# MongoDB kontrolü
if ! nc -z localhost 27017 2>/dev/null; then
  echo "❌ MongoDB çalışmıyor! Önce başlatın:"
  echo "   docker run -d --name mongo -p 27017:27017 mongo:8"
  exit 1
fi

npx tsx src/payload/seed/index.ts
