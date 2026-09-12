# Bey Digital Media — product brief for a new website build

Purpose of this file: give any agent everything it needs to build a new website for this company without losing anything. It deliberately does NOT describe a visual direction. The existing implementation has a visual world ("Fatura & Kaşe" — a fiscal-document aesthetic). **Ignore it completely. Do not inherit, reference, soften, or partially reuse it. Treat this brief as the only input that constrains your choices.**

## 1. What this is

Bey Digital Media is a Turkish digital-marketing agency (tagline: "Dijital Pazarlama Ajansı"). Its website is a lead-generation site: the entire job of the site is to convince a visiting business owner that this agency can be trusted with their marketing budget, and to convert them into a quote request. Success is measured in qualified quote submissions, not traffic or time-on-page.

- Founder and only public person: **Yiğit Emre Balaban** (clients know him as "Yiğit Bey"; he is the person clients work with directly — no account managers).
- Domain: https://beydigitalmedia.com
- Canonical contact identity (locked, must appear consistently everywhere): **+90 544 376 03 39** and **info@beydigitalmedia.com**
- Socials: Instagram, YouTube, Facebook, TikTok — all **@beydigitalmedia**
- Logo: `public/beydigital_logo.webp` (white-on-transparent). Keep the file as-is.
- Language: **Turkish only** (`lang="tr"`). No i18n, no language switcher.
- No legal entity is displayed anywhere (not yet registered). Displayed address is just "Türkiye". Never fabricate registration numbers, tax IDs, or an imprint.
- The word **"Bursa" must not appear anywhere** on the site, in copy, metadata, or seed data. If you find it in inherited content, remove it.

## 2. Who the site must win

Primary customer: **Turkish SMB owners and marketing decision-makers across all of Türkiye** — restaurants, retail, textile/manufacturing, local services, e-commerce brands. Not a local/Bursa audience: the whole country is the market. They arrive from search, social, or outbound outreach; they are skeptical (many have been burned by agencies before), mostly on mobile, and they think in concrete terms: "will my sales go up, and will I be able to see it?"

Secondary user: the founder himself. He authors and edits all site content through the CMS admin without touching code.

## 3. Positioning (the claims the site is built on)

All three are durably true and user-confirmed:

1. **Measured results** — every engagement is reportable; the site shows real numbers, not vibes.
2. **Full-service partner** — ads, social media, web, branding under one roof; the client doesn't juggle vendors.
3. **Direct founder access** — clients work directly with Yiğit Emre Balaban.

Deliberately NOT the positioning: "AI-first agency". AI & Otomasyon and AI SEO (GEO/AEO) are services the agency sells — they are not the lead claim. Don't push them to the front of the story.

## 4. Services (each has, or must have, a dedicated page)

1. Sosyal Medya Yonetimi (social media management)
2. Meta Ads
3. Google Ads
4. Web Tasarim (web design)
5. SEO (including Yerel SEO and AI SEO / GEO-AEO)
6. Logo Tasarimi (logo design)
7. Kurumsal Kimlik (corporate identity)
8. AI & Otomasyon
9. Detayli Raporlama (detailed reporting)

The contact form additionally offers **İçerik Üretimi** and **Dijital Danışmanlık** as selectable interests (no dedicated pages needed). All service names above must render with correct Turkish diacritics (ş, ğ, İ, ı) — this list is transliterated here only for file safety; use proper Turkish on the site.

## 5. Proof — all of it is real (user-confirmed). Never dilute or remove it, never add to it

- **Stats (canonical set, display exactly these):** 150+ Tamamlanan Proje, 100+ Memnun Müşteri, 8+ Yıllık Deneyim, %100 Müşteri Memnuniyeti
- **Testimonials (5, real people/companies):**
  - Mehmet — Lada Wedding — "satışları %150 arttı"
  - Erenalp Guzgun — Guzgun Tekstil
  - Erkutay Torun — Emfa Pet
  - Murat Adlığ — Nil Forklift
  - Ebru Özpehlivan — İşbir Yatak
- **Portfolio projects (5, with metrics and client logos in `/public`):**
  - Guzgun Tekstil — "Etkileşim Oranı +2000%"
  - İşbir Yatak — "+150%"
  - Lada Wedding — "Dönüşüm oranı +300%"
  - Nil Forklift — "+200%"
  - Emfa Pet — "+500%"
- **Anonymized real campaign data** (Meta/Google ads dashboards, growth charts) is available as evidence material — you may design around it, labeled as anonymized.
- **Absences that must NOT be fabricated:** case-study documents, press coverage, certifications, client counts beyond the stats above, pricing, awards, legal registration, blog articles. If a proof slot has nothing real behind it, design an honest empty state instead of inventing content.

## 6. Conversion path (primary on every surface)

The primary action everywhere is **"Ücretsiz Teklif Al"** (free quote) leading to the contact form. Form fields: name, email, phone, service multi-select, message. The form must: validate server-side (zod), rate-limit per IP (5 requests / 5 minutes), **persist every lead to the `contact_submissions` table first**, then send an optional Resend email notification whose failure is non-fatal. No third-party form embeds; no chat widgets required.

## 7. Functional requirements that must survive any redesign

- **CMS:** Mini admin panel at `/admin`, Turkish UI, backed by Cloudflare D1 (services, projects, testimonials, FAQs, blogPosts, pages, settings) + R2 (media). The founder edits every page's content here; the seed migration (`migrations/0002_seed.sql`) is idempotent and restores canonical content.
- **SEO:** Organization + WebSite JSON-LD sitewide; Service + BreadcrumbList JSON-LD on service pages; Article JSON-LD on blog posts; `sitemap.xml` route; `robots.txt`; canonical/OG metadata with metadataBase `https://beydigitalmedia.com`; semantic headings; server rendering.
- **Blog:** collection and routes exist but **stay empty until real articles exist** — ship a designed empty state ("arşiv hazırlanıyor" honesty), never placeholder posts.
- **404:** a designed, on-brand not-found page.
- **Accessibility:** skip-to-content link, aria labels on interactive/carousel controls, keyboard-navigable custom widgets (dropdowns, carousels), visible-but-minimal focus states, `prefers-reduced-motion` respected, correct Turkish uppercase via `lang="tr"` (never hand-upcase i→İ).
- **Performance:** no heavy raster dependencies for structure; imagery limited to the real client logos and any real campaign evidence.

## 8. Working stack

The current implementation is Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Cloudflare Workers via `@opennextjs/cloudflare` (D1 database, R2 media), framer-motion, lucide-react, deployed with `npx opennextjs-cloudflare build` + `npx wrangler deploy`. If your build targets this repo, keep the stack and the functional contract above; if it targets another platform, carry the requirements, not the stack.

## 9. Confirmed anti-goals (user-confirmed, apply to the new design)

- No agency-template cliché (dark hero + gradient blobs + glass cards + stock photos).
- Nothing so avant-garde that an SMB owner can't scan it in seconds and trust it.
- No hype/hard-sell devices: neon glow, fake countdowns, aggressive popups, hype claims.
- Nothing resembling a SaaS dashboard or admin panel — the site must feel like a business, not a tool.
- No "Bursa" anywhere.

## 10. What you are free to choose

Everything visual and structural: visual world, typography, color strategy, composition, motion, information architecture, navigation model, how services/portfolio/proof are presented, page count and structure. This brief intentionally constrains product truth, content, conversion, and quality — not the design. That is the point.
