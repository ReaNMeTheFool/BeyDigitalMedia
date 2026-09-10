# Plan: BeyDigitalMedia — full Cloudflare migration (Workers + D1 + R2)

Depth: tree 3   Mode: orchestrated
Budget note: 5 leaves, each 1-3 hours of focused implementation. Backend/data leaf and admin leaf are the heavy ones. All work sequential (shared files: package.json, next.config.ts across leaves 1-2).

## Contract

Decided BEFORE fan-out. Locked decisions (from .memory/MEMORY.md 2026-09-10): full Cloudflare, Workers via @opennextjs/cloudflare, D1 for data, Resend = only external service, content via custom mini admin panel.

- **Bindings/env:** D1 binding `DB` (database_name `beydigitalmedia`), R2 binding `MEDIA` (bucket `beydigitalmedia-media`), assets binding `ASSETS` (OpenNext-managed). Env vars: `NEXT_PUBLIC_SERVER_URL`, `RESEND_API_KEY`, `RECIPIENT_EMAIL`, `RESEND_FROM_EMAIL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`. Local secrets in `.dev.vars`, committed `.dev.vars.example`.
- **Types:** `src/types/content.ts` is the new source of truth. Export names IDENTICAL to the used surface of `src/payload-types.ts`: `Service, Project, Testimonial, Faq, BlogPost, Category, Page, ContactSubmission, User` + blocks `HeroBlock, MarqueeBlock, ServicesGridBlock, PortfolioSliderBlock, TestimonialsCarouselBlock, FaqAccordionBlock, AboutBlock, AiAutomationBlock, WhyUsBlock, PricingBlock, PartnerBadgesBlock, CtaBlock` + globals `SiteSettings, Navigation, Footer` + `MediaRef { id: number; url: string; alt: string | null }`. RichText fields become `string`: `Service.longDescription`, `Faq.answer`, `BlogPost.content` (HTML), `AboutBlock.content`, `AiAutomationBlock.description`. Image fields become `MediaRef | null` with the same accessor names (`icon`, `logo`, `image`, `featuredImage`). `Page.content: PageBlock[]` (blockType discriminant, shapes identical to payload blocks). `src/payload-types.ts` is deleted only in leaf 3.
- **Data layer:** `src/lib/db.ts` exports `getDB(): D1Database`, `getMEDIA(): R2Bucket` (via `getCloudflareContext()` from `@opennextjs/cloudflare`), row→domain mappers. `src/lib/content.ts` exports exactly: `getSiteSettings, getNavigation, getFooter, getHomePage, getPage, listServices, getService, listProjects, getProject, listTestimonials, listFaqs, listBlogPosts, getBlogPost, listCategories, listMedia, getMedia, createContactSubmission, countRecentSubmissions, listContactSubmissions, markSubmissionRead` — plus admin CRUD (`upsertService, deleteService, upsertProject, deleteProject, upsertTestimonial, deleteTestimonial, upsertFaq, deleteFaq, upsertBlogPost, deleteBlogPost, upsertSettings, createMedia, reorder`). Same try/catch fallback semantics as today's Payload calls (public pages must never 500 on empty DB; defaults live in `src/lib/content-defaults.ts`).
- **D1 schema (`migrations/0001_schema.sql`), 10 tables:** `services(id INTEGER PK AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title, subtitle, description, long_description TEXT, features JSON, process JSON, meta_title, meta_description, icon_media_id INTEGER NULL, accent_color TEXT, sort_order INTEGER DEFAULT 0)`, `projects(id, slug UNIQUE, title, category, services_tags JSON, results, results_color, logo_media_id NULL, logo_scale REAL DEFAULT 1, small_tags INTEGER DEFAULT 0, color TEXT, sort_order)`, `testimonials(id, name, company, role, rating INTEGER DEFAULT 5, text, image_media_id NULL, sort_order)`, `faqs(id, question, answer TEXT, sort_order)`, `blog_posts(id, slug UNIQUE, title, excerpt, content TEXT /*HTML*/, published_date, category_id NULL, featured_image_media_id NULL, meta_title, meta_description)`, `pages(id, slug UNIQUE, title, content JSON, meta_title, meta_description)`, `categories(id, name, slug UNIQUE)`, `media(id, filename UNIQUE, url, alt)`, `settings(key TEXT PK, value JSON)` (keys: `siteSettings`, `navigation`, `footer`), `contact_submissions(id, name, email, phone, service, message, read INTEGER DEFAULT 0, ip TEXT, created_at TEXT DEFAULT (datetime('now')))`. Seed: `migrations/0002_seed.sql` derived from current seed (9 services, 5 projects, 5 testimonials, 6 faqs, pages home+about, 3 settings rows). Mongo→D1 converter: `scripts/migrate-mongo-to-d1.ts` (tsx; input mongodump archive or extended-JSON dump dir; emits SQL).
- **App wiring:** pages import from `@/lib/content` instead of `getPayloadClient`; `src/lib/lexicalToHtml.ts` and `src/lib/payload.ts` deleted; `generateStaticParams` in `(site)/[slug]` removed (fully dynamic). `actions.ts`: zod validation unchanged; rate limit = `SELECT COUNT(*) FROM contact_submissions WHERE ip = ? AND created_at > datetime('now','-5 minutes')` (>=5 → same error message as today), IP from `Cf-Connecting-Ip` falling back to `x-forwarded-for`; DB insert first, Resend second, email failure non-fatal; all user-facing messages byte-identical to current.
- **Admin:** routes `/admin/login`, `/admin` (leads dashboard), `/admin/services`, `/admin/projects`, `/admin/testimonials`, `/admin/faqs`, `/admin/blog`, `/admin/home`, `/admin/settings`, `/admin/media`. Auth lib `src/lib/admin-auth.ts`: `verifyAdminLogin(u,p)`, `createSessionToken()`, `isValidSession(t)`, `requireAdmin()` (redirect to login); PBKDF2 via WebCrypto, cookie `bdm_admin` (HttpOnly, Secure, SameSite=Lax, 7d), HMAC-signed with `AUTH_SECRET`. Admin mutations in `src/app/admin/actions.ts` ("use server", guarded, revalidatePath). Media upload → R2 `MEDIA.put()`, served by `src/app/dyn-media/[...key]/route.ts` with content-type + `Cache-Control: public, max-age=31536000, immutable`. Admin UI: minimal clean styling (plain Tailwind, no marketing theme), Turkish labels.
- **wrangler.jsonc:** name `beydigitalmedia`, main `.open-next/worker.js`, `compatibility_flags: ["nodejs_compat"]`, `assets: { directory: ".open-next/assets", binding: "ASSETS" }`, d1 + r2 as above. Scripts: `build:worker` (opennextjs-cloudflare build), `deploy` (build + wrangler deploy), `db:migrate` / `db:seed` (local by default, remote via flag).
- **Conventions:** TypeScript strict, no new deps beyond wrangler/@opennextjs/cloudflare/@cloudflare/workers-types (+tsx already present). No fallbacks beyond existing behavior. Comments only when necessary, Turkish. Commits minimal messages, English. No `git push`.
- **Warnings policy:** builds must reach 0 errors; any warning emitted must be listed in the leaf report verbatim and fixed if it originates from app code. Unfixable toolchain deprecations are listed, never hidden.

## Tree

- 1 Full Cloudflare migration (root)
  - 1.1 Foundation
    - 1.1.1 Leaf: OpenNext skeleton + compat proof .... gates/leaf-1-skeleton.md
    - 1.1.2 Leaf: D1 data layer (additive only) ....... gates/leaf-2-data-layer.md
    - 1.1.x Branch gate: foundation integrated ........ gates/node-1.1.md
  - 1.2 Application
    - 1.2.1 Leaf: Payload removal + pages wiring + contact form .. gates/leaf-3-wiring-form.md
    - 1.2.2 Leaf: mini admin ........................... gates/leaf-4-admin.md
    - 1.2.x Branch gate: app integrated ............... gates/node-1.2.md
  - 1.3 Integration & cutover
    - 1.3.1 Leaf: integration, e2e smoke, deploy docs . gates/leaf-5-integration.md

## Status log

Append-only. One line per event.

- 2026-09-10 plan written, contract fixed
- 2026-09-10 gates files written (5 leaves + 2 branch gates); dispatching leaf 1.1.1
- 2026-09-10 leaf 1.1.1 verified 6/6 by driver (commit c72bf5a). OpenNext 1.20.6 + Next 16.3.4 works, via `buildCommand: "next build --webpack"` (Turbopack hashed-externals × OpenNext sharp-exclusion conflict). Real D1 eb3df19d + R2 bucket created (wrangler authed).
- 2026-09-10 contract amendment: leaf 1.1.2 is purely ADDITIVE (types, db, content layer, migrations, migrate script — no deletions, no dep changes). All Payload deletions + import swaps + deps removal move to leaf 1.2.1. Reason: deleting payload runtime in leaf 2 would break tsc (pages still import getPayloadClient/payload-types until the swap), violating per-leaf compilability.
- 2026-09-10 leaf 1.1.2 verified 5/5 by driver (commit 26287d2, additive; counts 9/5/5/6/2/3 re-confirmed on local D1).
- 2026-09-10 node-1.1 branch gate RESEQUENCED to run after leaf 1.2.1: plain `npm ci` currently fails on sharp@0.34.5 install script (node 26 check.js fails → node-gyp fallback → no node-addon-api). sharp is scheduled for removal in leaf 1.2.1; clean-install proof is more meaningful on the final dependency set anyway. node_modules restored via `npm ci --ignore-scripts`.
