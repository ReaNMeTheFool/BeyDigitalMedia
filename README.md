# Bey Digital Media — Payload CMS Entegrasyonu

Bey Digital Media kurumsal web sitesi, **Payload CMS 3.84+** + **Next.js 16** + **MongoDB 8** + **React 19** ile tamamen headless CMS yapısına dönüştürülmüştür.

## 🚀 Teknoloji Stack

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 16.2, React 19, Tailwind CSS 4 |
| CMS | Payload CMS 3.84+ |
| Database | MongoDB 8 |
| Container | Docker + Docker Compose |
| Reverse Proxy | Nginx Proxy Manager |
| Container Yönetimi | Portainer CE |

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── (frontend)/           # Mevcut frontend sayfaları
│   ├── (payload)/            # Payload Admin + API routes
│   │   ├── admin/[[...segments]]/page.tsx
│   │   ├── api/[...slug]/route.ts
│   │   └── layout.tsx
│   ├── blog/                 # Blog listesi + detay
│   ├── [slug]/               # Dinamik servis sayfaları
│   └── page.tsx              # Ana sayfa (CMS blocks)
├── payload/
│   ├── collections/          # 10 Collection tanımı
│   ├── globals/              # 3 Global tanımı
│   ├── blocks/               # 10 Block tanımı
│   └── seed.ts               # Seed script
├── components/
│   ├── blocks/               # Block render bileşenleri
│   └── sections/             # Sayfa section bileşenleri
├── lib/
│   ├── payload.ts            # Payload client helper
│   └── lexicalToHtml.ts      # Lexical → HTML converter
└── payload.config.ts         # Payload yapılandırması
```

## 📦 Collections (Veritabanı Tabloları)

| Collection | Amaç |
|------------|------|
| `users` | Admin / Editor kullanıcıları |
| `media` | Dosya yükleme (görseller, logolar) |
| `categories` | Blog kategorileri |
| `services` | 9 hizmet sayfası içeriği |
| `blogPosts` | Blog yazıları |
| `projects` | Portfolyo projeleri |
| `testimonials` | Müşteri referansları |
| `faqs` | Sıkça sorulan sorular |
| `contactSubmissions` | İletişim formu kayıtları |
| `pages` | Dinamik sayfalar (blocks ile) |

## 🌍 Globals (Site Geneli Ayarlar)

| Global | Amaç |
|--------|------|
| `siteSettings` | Site adı, logo, SEO varsayılanları, iletişim bilgileri |
| `navigation` | Menü linkleri, CTA butonu |
| `footer` | Footer sütunları, alt metin |

## 🧱 Blocks (Sayfa Bileşenleri)

Admin panelinden sürükle-bırak ile sayfa oluşturabileceğiniz 10 block:

- `hero` — Ana sayfa hero section
- `marquee` — Yazı kaydırma bandı
- `servicesGrid` — Hizmetler grid
- `aiAutomation` — AI & Otomasyon section
- `whyUs` — Neden Biz section
- `portfolioSlider` — Portfolyo slider
- `testimonialsCarousel` — Referanslar carousel
- `faqAccordion` — FAQ accordion
- `cta` — CTA section
- `about` — Hakkımızda section

## ⚙️ Environment Variables

`.env.local` (geliştirme) veya `.env` (production):

```env
# Database
DATABASE_URI=mongodb://localhost:27017/beydigital

# Payload
PAYLOAD_SECRET=your-random-secret-key-min-32-chars

# App
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Email
RESEND_API_KEY=re_xxxxxxxx
RECIPIENT_EMAIL=info@beydigitalmedia.com
```

## 🖥️ Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu
npm run dev

# Admin panel: http://localhost:3000/admin
```

## 🌱 Seed (İlk Verileri Yükleme)

MongoDB çalışıyor olmalı:

```bash
# Docker ile MongoDB başlat
docker run -d -p 27017:27017 --name mongo mongo:8

# Seed script çalıştır
npm run payload:seed
```

Seed script şunları oluşturur:
- Admin kullanıcısı (`admin@beydigitalmedia.com` / `admin123`)
- 9 hizmet (services-data.ts'den)
- 3 blog yazısı
- 5 portfolyo projesi
- 5 müşteri referansı
- 6 FAQ
- Home page (blocks ile)
- SiteSettings, Navigation, Footer globals

## 🐳 Docker Deploy (Production)

```bash
# .env dosyasını oluştur
cp .env.example .env
# .env dosyasını düzenle

# Build ve başlat
docker compose up -d --build
```

Container'lar:
- `mongo` — MongoDB 8
- `app` — Next.js + Payload (port 3000)

## 🔐 Admin Paneli

İlk kurulumda `/admin` adresine gidip create-first-user ekranından admin kullanıcısı oluşturun. Seed kullanıldıysa:

- **Email:** `admin@beydigitalmedia.com`
- **Password:** `admin123`

## 🌐 Nginx Proxy Manager Ayarları

1. `http://212.68.34.84:81` adresinden NPM paneline giriş yap
2. Proxy Host ekle:
   - **Domain Names:** `beydigitalmedia.com`, `www.beydigitalmedia.com`
   - **Forward Hostname/IP:** `app` (Docker network adı) veya `127.0.0.1`
   - **Forward Port:** `3000`
3. SSL sekmesinden "Request a new SSL Certificate" ile Let's Encrypt aktif et

## 🔌 API Endpoint'leri

Payload otomatik olarak REST ve GraphQL API sunar:

- **REST:** `/api/{collection}`
  - Örn: `GET /api/services` — Tüm hizmetler
  - Örn: `GET /api/blogPosts?sort=-publishedDate` — Blog yazıları
- **GraphQL:** `/api/graphql`
- **Admin:** `/admin`

## 📋 Yapılan Değişiklikler Özeti

1. ✅ Payload CMS 3.84+ kurulumu
2. ✅ 10 Collection tanımı
3. ✅ 3 Global tanımı
4. ✅ 10 Block tanımı
5. ✅ Next.js App Router entegrasyonu (admin + API)
6. ✅ Standalone Docker build
7. ✅ Mevcut statik verilerin CMS'e aktarımı (seed script)
8. ✅ İletişim formu → Payload CMS kayıtları
9. ✅ Blog sayfaları (liste + detay)
10. ✅ Servis sayfaları dinamik CMS'den çekiliyor
11. ✅ Ana sayfa CMS blocks sistemi ile yönetilebilir
12. ✅ Lexical rich text → HTML converter
