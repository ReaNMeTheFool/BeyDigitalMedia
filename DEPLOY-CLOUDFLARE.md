# Cloudflare Deploy Rehberi

Site Cloudflare Workers uzerinde `@opennextjs/cloudflare` ile calisir. Bu dokuman, dashboard git entegrasyonu kurulumundan alan adi gecisine (cutover) kadar tum adimlari icerir.

## 1. Cloudflare Dashboard — Workers & Pages Git Entegrasyonu

Dashboard > Workers & Pages > Create > "Import an existing Git repository".

| Form Alani | Deger |
|---|---|
| Project name | `beydigitalmedia` |
| Production branch | `master` |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` (repo kökü) |
| Non-production branch builds | On (preview branch'lere push'ta otomatik preview build alinir) |
| Build variables | `NODE_VERSION` = `22` (istenen surum), `NEXT_PUBLIC_SERVER_URL` = `https://beydigitalmedia.com` (düz metin degisken — secret degil) |

Build varsayilan `wrangler.jsonc` okur (binding'ler: `DB`, `MEDIA`, `ASSETS`); `wrangler deploy` adimi ayni dizinden calisir.

Alternatif (dashboard'suz, lokal veya CI'dan): `npm run deploy` (= `opennextjs-cloudflare build && wrangler deploy`). Ilk kurulumda `npx wrangler login` gerekir.

Not: `NEXT_PUBLIC_*` degiskenler build zamaninda bundle'a gomulur. Kod simdilik sabit `https://beydigitalmedia.com` kullaniyor (bu degisken su an hicbir yerde okunmuyor); ileride kullanilacagi durumda build variables kismina da girilmelidir.

## 2. Secret'lar (Runtime)

Tum secret'lar Worker runtime'inda `process.env` / `getCloudflareContext().env` uzerinden okunur. Lokaldeki karsiliklari `.dev.vars` dosyasindadir. Repo icinde deger yoktur; asagidaki komutlar interaktif sorar:

```bash
npx wrangler secret put RESEND_API_KEY      # Resend API anahtari (re_... ile baslar)
npx wrangler secret put RECIPIENT_EMAIL     # Iletisim formu bildirim e-postasi (info@beydigitalmedia.com)
npx wrangler secret put RESEND_FROM_EMAIL   # Gonderen adres (no-reply@beydigitalmedia.com)
npx wrangler secret put ADMIN_USERNAME      # Admin panel giris kullanici adi
npx wrangler secret put ADMIN_PASSWORD      # Admin panel giris sifresi (guclu sifre)
npx wrangler secret put AUTH_SECRET         # Oturum cookie imza anahtari (>= 32 byte rastgele)
```

Durum:

- `NEXT_PUBLIC_SERVER_URL`: secret DEGIL — build/deploy degiskeni olarak (Bolum 1) duz metin girilir; kod simdilik kullanmiyor.
- Diger 6 deger secret olarak `wrangler secret put` ile girilir. Dashboard'da sifreli (encrypted) degisken olarak da girilebilir; komutla girmek daha güvenlidir.
- Kaynak: `RESEND_API_KEY` Resend paneli > API Keys; `RECIPIENT_EMAIL` / `RESEND_FROM_EMAIL` ekip karari (info@beydigitalmedia.com / no-reply@beydigitalmedia.com); `ADMIN_USERNAME` / `ADMIN_PASSWORD` / `AUTH_SECRET` kurulumci belirler (`openssl rand -base64 32` ile AUTH_SECRET uretilebilir).

## 3. D1 — Uzak Veritabani Kurulumu

Veritabani zaten olusturuldu: `beydigitalmedia` (id: `eb3df19d-c4b4-4d59-818d-cda91e2cd1ba`), `wrangler.jsonc` icinde bagli. Durumu kontrol:

```bash
npx wrangler d1 info beydigitalmedia --remote
```

Sema + baslangic icerigi (takip edilen migration olarak uygulanir):

```bash
npx wrangler d1 migrations apply DB --remote
```

Not: `wrangler.jsonc` icin migrations dizini belirtilmemisse varsayilan `migrations/` kullanilir; `0001_schema.sql` + `0002_seed.sql` sirayla ve bir kez uygulanir.

Eski Payload/MongoDB icerigi aktarimi (cutover gunu, Bolum 5'teki sira ile):

```bash
# VPS'ten alinan mongodump arsivini SQL'e cevir
npx tsx scripts/migrate-mongo-to-d1.ts dump.archive --out /tmp/dump.sql

# Uzak D1'e yukle (INSERT OR IGNORE — mevcut seed satirlarini korur)
npx wrangler d1 execute DB --remote --file /tmp/dump.sql
```

Test arsivi: `scripts/fixtures/sample.archive` (yerel prova icin `--local` ile).

## 4. R2 — Medya Bucket'i

Bucket zaten olusturuldu: `beydigitalmedia-media` (`wrangler.jsonc` icinde `MEDIA` binding'i). Admin panelindeki yuklemeler buraya gider ve `/dyn-media/<key>` uzerinden servis edilir.

Eski siteden gelen medya dosyalari (VPS `/app/public/media`) cutover'da R2'ye tasınır:

```bash
# VPS'ten dosyalari cektikten sonra (scp vb.)
for f in medya-yedek/*; do
  npx wrangler r2 object put "beydigitalmedia-media/$(basename "$f")" --file "$f"
done
```

`migrate-mongo-to-d1.ts` eski `/media/<dosya>` yollarini otomatik `/dyn-media/<dosya>` yazar; dosya anahtari (key) dosya adi ile birebir ayni olmalidir.

## 5. Gecis Sirasi (Cutover)

1. **Preview dogrulama:** Git entegrasyonu kurulduktan sonra workers.dev preview adresinde (`beydigitalmedia.<hesap>.workers.dev`) siteyi doğrula: anasayfa, hizmet/proje detaylari, admin girisi, iletisim formu test kaydi.
2. **Veri gecisi:** VPS'ten `mongodump` al:
   `ssh root@212.68.34.84 "docker exec beydigital-mongo-1 mongodump --db beydigital --archive" > dump.archive`
   (alternatif: sunucuda `--archive=/tmp/x.archive` + `docker cp` + `scp`). Ardindan:
   `npx tsx scripts/migrate-mongo-to-d1.ts dump.archive --out /tmp/dump.sql` → `npx wrangler d1 execute DB --remote --file /tmp/dump.sql` → medya dosyalarini R2'ye yukle (Bolum 4).
3. **Alan adi gecisi:** Custom Domain bagla (Bolum 6). DNS yayildiktan sonra trafik Workers'a akar.
4. **VDS kapatma:** Alan adi tamamen Workers'a dustukten sonra (birkac gun gozlem) VPS'teki docker yiginini durdur ve makineyi kapat/iptal et. VPS notlari: `sunucu_bilgi.md`, `sunucuyedek.md`.

## 6. Ozel Alan Adi (Custom Domain)

1. Dashboard > Workers & Pages > `beydigitalmedia` > Settings > Domains & Routes > Add > **Custom Domain**.
2. `beydigitalmedia.com` gir → Cloudflare alan adini otomatik dogrular ve gerekli DNS kaydini olusturur (Workers Custom Domains).
3. `www.beydigitalmedia.com` icin ayri bir Custom Domain eklemek yerine mevcut yonlendirme korunur: `next.config.ts` icindeki kalici redirect `www` > `non-www` yapar; www'yi ayni Worker'a baglamak icin ikinci Custom Domain olarak ekle.
4. SSL: Cloudflare otomatik keser (Universal SSL); ekstra islem gerekmez.

## 7. Geri Alma (Rollback)

Workers deploy'lari surumlenir. Sorun durumunda:

- Dashboard: Workers & Pages > `beydigitalmedia` > Deployments > eski surum > Rollback.
- Komut satiri: `npx wrangler rollback` (interaktif surum listesinden onceki surume doner).

D1 verisi geri alinmaz; buyuk veri islemlerinden once `npx wrangler d1 export beydigitalmedia --remote --output yedek.sql` ile yedek al.

## 8. Resend — Gonderen Alan Adi

- `no-reply@beydigitalmedia.com` kullanilacaksa: Resend paneli > Domains > Add Domain > `beydigitalmedia.com` eklenir, Cloudflare DNS'e Resend'in verdigi DKIM/SPF kayitlari girilir, dogrulanana kadar beklenir.
- Alan adi dogrulanana kadar gecici olarak `RESEND_FROM_EMAIL=onboarding@resend.dev` birakilabilir; bu durumda e-postalar yalnizca Resend hesabi sahibinin adresine gider (test modu).
