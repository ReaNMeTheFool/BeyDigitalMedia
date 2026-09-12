# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Turkish SMB owners and marketing decision-makers (restaurants, retail, textile, local services, e-commerce brands) across Türkiye. They arrive from search, social, or outbound outreach, evaluate whether Bey Digital Media can be trusted with their marketing spend, and act by requesting a free quote. Secondary audience: the founder, who authors and edits all site content in the Payload admin.

## Product Purpose

Lead-generation website for Bey Digital Media, a Turkish digital marketing agency. It presents nine services, verifiable proof (stats, testimonials, portfolio), and a contact path; every submitted lead is persisted in the CMS and optionally emailed. Success is qualified quote requests, not traffic.

## Positioning

Measured-results, full-service partner with direct founder access: clients get ads, social, web, and branding under one roof, every engagement is reportable, and they work directly with founder Yiğit Emre Balaban rather than account managers. AI-first is deliberately not the lead claim — AI & Otomasyon and AI SEO (GEO/AEO) are services, not the differentiator.

## Operating Context

Single-language Turkish site (`lang="tr"`, no i18n) at https://beydigitalmedia.com. All page content (services, portfolio, testimonials, FAQs, navigation, footer, site settings) is editable in the mini admin panel at `/admin`, backed by Cloudflare D1; canonical content lives in `migrations/0002_seed.sql`. Deployment is Cloudflare Workers (D1 + R2) via `@opennextjs/cloudflare`. Outbound lead generation runs in a separate n8n workflow (`n8n-automations/`) that is not wired into the site. The blog is intentionally empty until real articles exist.

## Capabilities and Constraints

- Services (9, each with a dedicated page): Sosyal Medya Yönetimi, Meta Ads, Google Ads, Web Tasarım, SEO, Logo Tasarımı, Kurumsal Kimlik, AI & Otomasyon, Detaylı Raporlama. The contact form additionally offers İçerik Üretimi and Dijital Danışmanlık.
- Contact form: zod-validated server action; rate-limited 5 req / 5 min per IP; persists to the `contact_submissions` table first, then sends an optional Resend notification (email failure is non-fatal).
- SEO infrastructure: Organization/WebSite JSON-LD sitewide, Service + BreadcrumbList JSON-LD on service pages, sitemap route, canonical/OG metadata (metadataBase `https://beydigitalmedia.com`).
- No legal entity or registration is displayed anywhere — keep it that way until registered; never fabricate one. Displayed address is "Türkiye" only.
- Blog collection and routes exist but must stay empty until real content is provided.

## Brand Commitments

- Name "Bey Digital Media", tagline "Dijital Pazarlama Ajansı"; logo `public/beydigital_logo.webp`, `public/favicon.png`, `public/og-image.jpg`.
- Canonical contact (locked 2026-08-29): +90 544 376 03 39, info@beydigitalmedia.com.
- Socials: Instagram, YouTube, Facebook, TikTok — all @beydigitalmedia.
- All visitor-facing copy is Turkish.

## Evidence on Hand

- Canonical stats (user-confirmed real): 150+ Tamamlanan Proje, 100+ Memnun Müşteri, 8+ Yıllık Deneyim, %100 Müşteri Memnuniyeti (defaults in `src/components/sections/Hero.tsx`).
- 5 testimonials with real names and companies (Lada Wedding, Guzgun Tekstil, Emfa Pet, Nil Forklift, İşbir Yatak) — `migrations/0002_seed.sql`.
- 5 portfolio projects with performance metrics and client logos in `public/` — `migrations/0002_seed.sql`.
- Absences that must not be fabricated: case-study documents, press coverage, certifications, legal registration, blog articles.

## Product Principles

1. Proof over promise — every number, testimonial, and case metric traces to real evidence; nothing invented.
2. One roof, one owner — present full-service breadth with direct founder accountability.
3. Shortest path to a quote — the contact/quote action is the primary conversion on every surface.
4. Turkish-first clarity — plain, scannable Turkish an SMB owner trusts; no untranslated jargon.
5. Content is operable — the founder edits everything through the mini admin panel without code changes.
