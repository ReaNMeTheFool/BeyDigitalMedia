# Bey Digital Media

Kurumsal lead-gen sitesi: Next.js 16 + Cloudflare Workers (OpenNext) + D1 + R2 + Resend.

## Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4 |
| Barındırma | Cloudflare Workers (`@opennextjs/cloudflare`) |
| Veritabanı | Cloudflare D1 (SQLite) |
| Medya | Cloudflare R2 (bucket: `beydigitalmedia-media`) |
| E-posta | Resend (iletişim formu bildirimi) |
| İçerik | Mini admin panel (`/admin`, D1 + R2 üzerinde) |

## Proje Yapısı

```
src/
├── app/
│   ├── (site)/               # Herkese açık sayfalar (anasayfa, hizmet, proje, blog)
│   ├── admin/                # Mini admin panel (login, leads, içerik CRUD, medya)
│   ├── dyn-media/[...key]/   # R2 medya sunumu (cache-control: immutable)
│   └── actions.ts            # İletişim formu (zod + rate limit + D1 + Resend)
├── lib/
│   ├── db.ts                 # Cloudflare binding erişimi (D1 -> DB, R2 -> MEDIA)
│   ├── content.ts            # Tüm içerik sorguları + admin CRUD
│   ├── content-defaults.ts   # Boş DB için varsayılan içerik
│   └── admin-auth.ts         # PBKDF2 + HMAC imzalı oturum cookie'si
└── types/content.ts          # İçerik tipleri (tek kaynak)
migrations/
├── 0001_schema.sql           # 10 tablo şeması
└── 0002_seed.sql             # Başlangıç içeriği (9 hizmet, 5 proje, 5 referans, 6 FAQ, home + about, 3 global)
scripts/
├── migrate-mongo-to-d1.ts    # Eski Payload/MongoDB içeriğini D1 SQL'ine çevirir
└── fixtures/sample.archive   # Dönüştürücü için test mongodump arşivi
```

## Environment Variables

Değişken listesi ve açıklamaları için [.env.example](.env.example). Yerel geliştirmede aynı değişkenler `.dev.vars` dosyasına yazılır ([.dev.vars.example](.dev.vars.example)).

## Geliştirme

```bash
npm install

# Yerel veritabanı şeması ve başlangıç içeriği
npx wrangler d1 execute DB --local --file migrations/0001_schema.sql
npx wrangler d1 execute DB --local --file migrations/0002_seed.sql

# Geliştirme sunucusu (wrangler binding'leri initOpenNextCloudflareForDev ile gelir)
npm run dev

# Admin panel: http://localhost:3000/admin (.dev.vars içindeki ADMIN_USERNAME / ADMIN_PASSWORD ile giriş)
```

## Deploy (Cloudflare)

```bash
npx opennextjs-cloudflare build   # veya: npm run build:worker
npx wrangler deploy               # veya: npm run deploy
```

Dashboard üzerinden git entegrasyonu, secret'lar, D1/R2 kurulumu, özel alan adı ve geçiş (cutover) sırası için [DEPLOY-CLOUDFLARE.md](DEPLOY-CLOUDFLARE.md) dosyasına bakın.

## Eski Payload/MongoDB içeriğini D1'e taşıma

```bash
# VPS'ten mongodump arşivi alındıktan sonra:
npx tsx scripts/migrate-mongo-to-d1.ts <dump.archive> --out /tmp/dump.sql
npx wrangler d1 execute DB --remote --file migrations/0001_schema.sql
npx wrangler d1 execute DB --remote --file /tmp/dump.sql
```

Dönüştürücü, Payload 3.x mongodump arşivlerini (koleksiyonlar + `globals.globalType`) okur, Lexical richText'i düz metin/HTML'e çevirir ve idempotent `INSERT OR IGNORE` üretir. Test arşivi: `scripts/fixtures/sample.archive`.
