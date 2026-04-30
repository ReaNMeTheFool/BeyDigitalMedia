# www.beydigitalmedia.com JSON Hatası — Sorun Tespiti ve Çözüm Raporu

> **Oluşturma Tarihi:** 2026-04-30  
> **İlgili Domain:** `www.beydigitalmedia.com`, `beydigitalmedia.com`  
> **İlgili Sunucu:** `212.68.34.84` (AlmaLinux 9)  
> **Teknolojiler:** Next.js 16 (standalone), Payload CMS 3.84.1, Docker, Docker Compose, Nginx Proxy Manager, Cloudflare

---

## 1. Sorun Özeti

### Ne Oldu?
- **Cloudflare Tunnel** (`trycloudflare.com` → `localhost:3000`) ile siteye girildiğinde **sayfa düzgün gözüküyordu**.
- **Ancak** `www.beydigitalmedia.com` adresinden girildiğinde, tarayıcıda **garip bir JSON yanıtı** çıkıyordu:
  ```json
  {
    "status": "OK",
    "setup": true,
    "version": {
      "major": 2,
      "minor": 14,
      "revision": 0
    }
  }
  ```
- Bu JSON, **Payload CMS 2.x** API'sine ait bir yanıttı. Halbuki projemiz **Payload CMS 3.84.1** kullanıyordu.

### Neden Şüpheliydi?
- Aynı `localhost:3000` portuna hem Cloudflare Tunnel hem de Nginx Proxy Manager (NPM) bağlıydı.
- Cloudflare Tunnel düzgün çalışıyordu, ama domain üzerinden girilince farklı bir yanıt dönüyordu.
- Bu, kodda bir hata olmadığını — sorunun **altyapı/yönlendirme katmanında** olduğunu gösteriyordu.

---

## 2. Tanı Süreci (Adım Adım Nasıl Bulundu?)

Bu bölümde, gelecekte benzer bir sorunla karşılaşırsanız izleyebileceğiniz tam adımlar yer alıyor.

### Adım 2.1 — DNS ve IP Doğrulaması
```bash
dig +short www.beydigitalmedia.com
# Çıktı: 188.114.97.7, 188.114.96.7 (Cloudflare proxy IP'leri)
# Bu normal. Domain Cloudflare üzerinden geliyor.
```

### Adım 2.2 — Sunucuda Dinlenen Portları Kontrol Et
```bash
ss -tlnp
```
**Bulgu:** Sadece `127.0.0.1:3000` portunda `docker-proxy` süreci dinliyordu (`beydigital-app-1` container'ı için).

### Adım 2.3 — Container'ları Kontrol Et
```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
```
**Bulgu:**
- `beydigital-app-1` → `127.0.0.1:3000->3000/tcp`
- `npm-app-1` → `0.0.0.0:80-81->80-81/tcp`, `0.0.0.0:443->443/tcp`

### Adım 2.4 — localhost:3000'e Doğrudan Erişim Testi
```bash
# Sunucu üzerinden doğrudan container'a istek at
curl -s http://127.0.0.1:3000/ | head -c 300

# Host header ekleyerek test et
curl -s -H "Host: www.beydigitalmedia.com" http://127.0.0.1:3000/ | head -c 300
```
**Bulgu:** İki test de **düzgün HTML** döndürdü. Yani container ve uygulama sağlıklı.

### Adım 2.5 — Nginx Proxy Manager Config'ini İncele
```bash
docker exec npm-app-1 cat /data/nginx/proxy_host/1.conf | grep -E 'server_name|forward|set \$server'
```
**Bulgu:**
```nginx
server_name beydigitalmedia.com www.beydigitalmedia.com;
set $server         "127.0.0.1";
set $port           3000;
```
NPM, istekleri `127.0.0.1:3000`'e yönlendiriyordu.

### Adım 2.6 — NPM Container'ından 127.0.0.1:3000'e Erişim Testi
**Bu en kritik adımdı.**
```bash
# NPM container'ının kendi 127.0.0.1:3000 portuna istek at
docker exec npm-app-1 sh -c "wget -qO- http://127.0.0.1:3000/ 2>/dev/null | head -c 300"
```
**Bulgu:** Aynı Payload 2.x JSON yanıtı döndü!  
Bu demek oldu ki NPM container'ı kendi **içindeki** `127.0.0.1:3000`'e yönlendiriyordu. Bu, `beydigital-app-1` değil, NPM'in **kendi backend API'si**ydi.

### Adım 2.7 — Container'ların Hangi Network'lerde Olduğunu Kontrol Et
```bash
docker inspect beydigital-app-1 -f '{{json .NetworkSettings.Networks}}' | python3 -m json.tool
docker inspect npm-app-1 -f '{{json .NetworkSettings.Networks}}' | python3 -m json.tool
```
**Bulgu:**
- `beydigital-app-1` → `beydigital_bey_net` (IP: `172.19.0.3`)
- `npm-app-1` → `npm_default` (IP: `172.18.0.x`)

İki container **farklı Docker bridge network'lerinde** çalışıyordu!

### Adım 2.8 — Beydigital Container'ında Hangi IP'de Dinlendiğini Kontrol Et
```bash
docker exec beydigital-app-1 sh -c "apk add --no-cache iproute2 >/dev/null 2>&1; ss -tlnp | grep 3000"
```
**Bulgu:**
```
LISTEN 0 511 172.19.0.3:3000 0.0.0.0:* users:(("next-server (v",pid=1,fd=18))
```
Next.js **sadece `172.19.0.3:3000`'de** dinliyordu, `0.0.0.0:3000`'de değil!

### Adım 2.9 — Neden Sadece `172.19.0.3`'te Dinlendiğini Bul
```bash
docker exec beydigital-app-1 grep -n "HOSTNAME" server.js
```
**Bulgu:**
```javascript
const hostname = process.env.HOSTNAME || '0.0.0.0'
```
Next.js standalone `server.js`, `HOSTNAME` ortam değişkenini okuyordu. Docker container'ında `HOSTNAME=0b4511a545f0` (container ID) olarak ayarlıydı. Bu hostname `/etc/hosts`'ta `172.19.0.3`'e çözümleniyordu.

---

## 3. Asıl Sebep (Root Cause)

Sorun aslında **üç faktörün bir araya gelmesinden** kaynaklanıyordu:

| # | Faktör | Açıklama |
|---|--------|----------|
| 1 | **Next.js `HOSTNAME` değişkeni** | Docker'ın verdiği `HOSTNAME=container-id`, Next.js tarafından dinleme adresi olarak kullanıldı. Sonuç: sadece `bey_net` IP'sinde (`172.19.0.3`) dinlendi. |
| 2 | **Farklı Docker Network'leri** | `beydigital-app-1` (`bey_net`) ile `npm-app-1` (`npm_default`) aynı network'te değildi. |
| 3 | **NPM'de `127.0.0.1` kullanımı** | NPM config'te `127.0.0.1:3000` yazdığı için, NPM container'ı **kendi** loopback'indeki 3000 portuna (kendi backend API'sine) yönlendiriyordu. |

**Özetle:** NPM, `www.beydigitalmedia.com` isteklerini kendi içindeki API'ye yönlendiriyordu, `beydigital-app-1`'e değil. Cloudflare Tunnel ise doğrudan host `127.0.0.1:3000`'e bağlı olduğu için (Docker port mapping'i ile `beydigital-app-1`'e yönlendiriliyordu) düzgün çalışıyordu.

---

## 4. Çözüm Adımları

### 4.1 — `docker-compose.yml` Güncellemesi

#### a) `HOSTNAME=0.0.0.0` Ekle
Next.js'in tüm arayüzlerde dinlemesini sağlamak için:
```yaml
app:
  environment:
    - NODE_ENV=production
    - HOSTNAME=0.0.0.0   # ← EKLENDİ
```

#### b) `npm_default` Network'ünü Ekle
`beydigital-app-1` container'ının NPM container'ıyla aynı network'te olmasını sağlamak için:
```yaml
app:
  networks:
    - bey_net
    - npm_default   # ← EKLENDİ

# ...

networks:
  bey_net:
    driver: bridge
  npm_default:
    external: true   # ← EKLENDİ
```

### 4.2 — Container'ı Yeniden Başlat
```bash
cd /opt/sayfalar/beydigital
docker compose up -d
```

### 4.3 — Nginx Proxy Manager Yapılandırmasını Güncelle

#### a) Nginx Config Dosyasını Düzenle
```bash
docker exec npm-app-1 sed -i 's/set \$server         "127.0.0.1";/set \$server         "beydigital-app-1";/' /data/nginx/proxy_host/1.conf
docker exec npm-app-1 nginx -s reload
```

#### b) NPM SQLite DB'sini Kalıcı Olarak Güncelle
```bash
# DB'yi container'dan host'a kopyala
docker cp npm-app-1:/data/database.sqlite /tmp/npm-db.sqlite

# Güncelle
python3 -c "
import sqlite3
conn = sqlite3.connect('/tmp/npm-db.sqlite')
conn.execute(\"UPDATE proxy_host SET forward_host='beydigital-app-1' WHERE domain_names LIKE '%beydigitalmedia.com%';\")
conn.commit()
conn.close()
"

# DB'yi geri kopyala
docker cp /tmp/npm-db.sqlite npm-app-1:/data/database.sqlite
docker exec npm-app-1 nginx -s reload
```

### 4.4 — Doğrulama
```bash
# 1. Next.js'in 0.0.0.0'de dinlediğini kontrol et
docker exec beydigital-app-1 sh -c "ss -tlnp | grep 3000"
# Beklenen: LISTEN 0 511 0.0.0.0:3000 ...

# 2. NPM container'ından beydigital-app-1'e erişim testi
docker exec npm-app-1 sh -c "node -e \"const http=require('http'); http.get('http://beydigital-app-1:3000/',r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>console.log(d.slice(0,300)))})\""
# Beklenen: <!DOCTYPE html>... (HTML)

# 3. Cloudflare üzerinden son test
curl -s -L https://www.beydigitalmedia.com/ | grep -o '<title>[^<]*</title>'
# Beklenen: <title>Bey Digital Media | Bursa Dijital Pazarlama Ajansı</title>
```

---

## 5. Önleme (Gelecekte Nasıl Önlenir?)

### 5.1 Docker Compose Şablonu
Yeni bir Next.js projesi deploy ederken:
```yaml
services:
  app:
    environment:
      - HOSTNAME=0.0.0.0   # Her zaman ekle
    networks:
      - app_net
      - npm_default        # Nginx Proxy Manager ile aynı network

networks:
  app_net:
    driver: bridge
  npm_default:
    external: true
```

### 5.2 Nginx Proxy Manager'da IP Yerine Container Adı Kullan
NPM'de proxy host oluştururken:
- ❌ Yanlış: `Forward Hostname / IP` = `127.0.0.1`
- ✅ Doğru: `Forward Hostname / IP` = `beydigital-app-1` (container adı)

Container adı, Docker DNS sayesinde otomatik olarak doğru IP'ye çözümlenir.

### 5.3 Next.js Standalone Build Kontrolü
`docker-compose.yml`'a `HOSTNAME=0.0.0.0` eklemek, Next.js'in sadece tek bir IP'de dinlemesini önler.

### 5.4 Network İzolasyonunu Anla
| Durum | Host'tan `127.0.0.1:3000` | Container'dan `127.0.0.1:3000` |
|-------|---------------------------|-------------------------------|
| `ports: - "127.0.0.1:3000:3000"` | ✅ Container'a gider | ❌ Container'ın kendi loopback'i |
| Container adı (`beydigital-app-1`) | — | ✅ Doğru container'a gider |

---

## 6. Hızlı Kontrol Listesi (Sorun Tekrar Edersa)

```bash
# 1. Container'lar çalışıyor mu?
docker ps

# 2. Next.js hangi IP'de dinliyor?
docker exec beydigital-app-1 sh -c "cat /proc/net/tcp | grep ':0BB8 '"
# 0BB8 = 3000 (hex). 00000000:0BB8 = 0.0.0.0:3000 ✅
# 030013AC:0BB8 = 172.19.0.3:3000 ❌ (sadece tek IP)

# 3. NPM hangi hedefe yönlendiriyor?
docker exec npm-app-1 cat /data/nginx/proxy_host/1.conf | grep 'set \$server'

# 4. NPM container'ından hedefe erişim var mı?
docker exec npm-app-1 sh -c "node -e \"const http=require('http'); http.get('http://beydigital-app-1:3000/',r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>console.log(d.slice(0,100)))})\""

# 5. Domain'e erişim testi (Cloudflare bypass)
curl -s -k --resolve www.beydigitalmedia.com:443:212.68.34.84 \
  https://www.beydigitalmedia.com/ | grep -o '<title>[^<]*</title>'
```

---

## 7. İlgili Dosyalar ve Lokasyonlar

| Dosya / Lokasyon | Açıklama |
|------------------|----------|
| `/opt/sayfalar/beydigital/docker-compose.yml` | Proje Docker Compose dosyası |
| `/opt/sayfalar/npm/` | Nginx Proxy Manager dizini |
| `npm-app-1:/data/nginx/proxy_host/1.conf` | NPM nginx config (runtime) |
| `npm-app-1:/data/database.sqlite` | NPM SQLite veritabanı (kalıcı ayarlar) |
| `beydigital-app-1:/app/server.js` | Next.js standalone server dosyası |

---

## 8. Sonuç

Sorun, **Docker container network izolasyonu** ve **Next.js'in `HOSTNAME` ortam değişkenine bağımlılığı** nedeniyle ortaya çıkmıştı. Nginx Proxy Manager kendi `127.0.0.1`'ine yönlendirme yaparken, asıl Next.js uygulamasına ulaşamıyordu.

Çözüm, `HOSTNAME=0.0.0.0` ayarı ile Next.js'in tüm arayüzlerde dinlemesini sağlamak, iki container'ı aynı Docker network'üne (`npm_default`) eklemek ve NPM'de `127.0.0.1` yerine **container adı** (`beydigital-app-1`) kullanmaktan ibarettir.
