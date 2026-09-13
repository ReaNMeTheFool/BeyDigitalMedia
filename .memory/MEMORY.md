# Project memory

## Decisions

### 2026-08-29 — Scope: prod-ready lead-gen site, not e-commerce
Why: user chose "prod-ready lead-gen site". Codebase has no products/cart/checkout/payment; goal is security, slop removal, SEO, lead persistence.
Rejected: building products/cart/checkout with payment gateway; order flow with manual payment.

### 2026-08-29 — Canonical contact identity
Why: user picked +90 544 376 03 39 (Footer/service pages). Unify phone everywhere. Email unified on info@beydigitalmedia.com (branded domain, matches seed globals); flagged to user.
Rejected: +90 501 392 70 88 (/iletisim), Beydigitalmedia@gmail.com as displayed contact, info@beydigital.com.tr (n8n domain).

### 2026-08-29 — Stats and client claims are real, keep
Why: user says the fabricated-looking numbers are real. Unify conflicting sets on 150+ proje / 100+ memnun müşteri / 8+ yıl / %100 memnuniyet. Do not remove stats or testimonials.
Rejected: empty-by-default CMS-managed stats.

### 2026-08-29 — Blog stays, empty until real content
Why: user chose it. Keep blogPosts collection, /blog routes and nav link; remove 3 stub seed posts (end in "...") from seed and DB. No invented articles.

### 2026-09-05 — Product record locked in PRODUCT.md
Why: user interview for impeccable init. Primary customer = Turkish SMBs nationwide (not Bursa-local). Positioning = measured results + full-service partner + direct founder access. No legal entity displayed. Full record in PRODUCT.md; keep it in sync, don't re-interview.
Rejected: Bursa/local-first focus, AI-first as lead positioning (AI services stay a service, not the differentiator), displaying legal registration.

### 2026-09-05 — Visual direction locked: Fatura & Kaşe
Why: impeccable direction round (seed 16ad156d, roll assigned candidate 5, user confirmed via decision flow). Redesign presents every result as a certified Turkish fiscal document: serials, dotted ledger rules, line-item results, kaşe stamps, founder signature; one red action stamp = quote CTA. Raises absorbed: one-gesture ink commitment per viewport (from Ebru), exposed-mechanism interactions (from automata). Code-led build (no image generation on this machine). Logo stays as-is; "Bursa" banned from site copy; build scope = full site.
Rejected: Hesap Defteri (model pick, stayed alternate), Enstrüman Panosu VU-meter (competitive), Ebru + Kâğıt Otomata (declined), kategori standardı (canon).

### 2026-09-10 — Hosting locked: full Cloudflare; Resend is the single external exception
Why: user decisions — Workers via @opennextjs/cloudflare + D1; Payload+MongoDB replaced by D1 + custom mini admin panel (services, projects, home, leads, login). Contact form keeps DB-write-first flow, Resend notification stays.
Rejected: Railway/Fly/Vercel, git-based CMS, content-as-code, no-email option, keeping the VDS, any non-CF hosting.

## Dead ends

### 2026-09-06 — Root layout passthrough breaks not-found SSR
Failed: src/app/layout.tsx renders <>{children}</>, so 404s serve the __next_error__ client shell and (site)/not-found.tsx never renders for unmatched URLs; fixed by adding src/app/not-found.tsx with its own html/body shell.
Don't retry unless: the root layout becomes a real document shell (ripples into payload admin and (site) layouts).

### 2026-09-05 — npm run payload:seed locally
Failed: exits requiring ADMIN_USERNAME/ADMIN_PASSWORD env vars that are not in .env; full local seeding impossible as-is.
Don't retry unless: those vars are added to .env. Individual globals/collections can be seeded selectively without them.

### 2026-08-29 — code-reviewer subagent type
Failed: dispatching the `code-reviewer` agent type twice returned harness error "captcha verify failed" (no work performed).
Don't retry unless: the harness error disappears. Use `Explore` (read-only, has Bash for git diff) for diff reviews instead.

### 2026-09-10 — Cloudflare Pages/Workers for current code
Failed: app is Next.js 16 + Payload + MongoDB + sharp, server-rendered (force-dynamic, Payload admin, server actions). No wrangler config, so `npx wrangler deploy` fails; Payload/sharp/mongodb driver do not run in workerd.
Don't retry unless: DB swapped (D1/Postgres+Hyperdrive), CMS+media layer replaced, @opennextjs/cloudflare added — a rewrite, not a config change.

### 2026-09-10 — Turbopack builds for opennextjs-cloudflare (while sharp is in the tree)
Failed: Turbopack emits content-hashed externals (e.g. `sharp-20c6a5da84e2135f` symlink under .next/node_modules); OpenNext excludes sharp from traced node_modules, so esbuild fails "Could not resolve sharp-<hash>". Fix in place: open-next.config.ts `buildCommand: "next build --webpack"`.
Don't retry unless: sharp is fully removed from the dependency tree (planned in leaf 1.2.1) or OpenNext stops excluding sharp/copies hashed targets.

### 2026-09-10 — `docker compose up -d mongo` for local dev DB
Failed: compose mongo service publishes no host port, so DATABASE_URI (mongodb://localhost:27017) is unreachable. Use the pre-existing `mongo` container (publishes 0.0.0.0:27017) instead.
Don't retry unless: docker-compose.yml adds `ports: 27017:27017`. (Obsolete since Payload/mongo removal, kept for history.)

### 2026-09-13 — Production Cloudflare account is balaban.yigitemre@gmail.com (9141694319c7507693fd8c4947bdc5ad)
Why: user connected the repo via CF dashboard under this account; domain cutover happens here. D1 `beydigitalmedia` id `a6bf3e14-9b19-4a77-b304-eed22d87bc9b` created here; wrangler.jsonc pins account_id.
Rejected: R34nm3@gmail.com account (`cb6cdeb0…`) — leaf-1 created D1 `eb3df19d…` + R2 bucket there by mistake; junk (delete later).
Note: R2 not enabled on this account yet (code 10042) — user must enable via dashboard before the `beydigitalmedia-media` bucket can be created.

### 2026-09-13 — Local D1 re-seed required after wrangler database_id changes
Failed: miniflare keys the local sqlite file by database_id; the 2026-09-13 account fix (commit 31c1d72, db id eb3df19d… → a6bf3e14…) orphaned the seeded local file and `next dev` came up empty.
Fix: `npx wrangler d1 execute DB --local --file migrations/0001_schema.sql` then `0002_seed.sql` after any database_id change.
Rejected: assuming local D1 state persists across id changes.

### 2026-09-13 — Public site visuals restored to 7d5f113b (redesign rolled back)
Why: user instruction after seeing the fatura-kase redesign on the Cloudflare deployment — live site should keep the Aug-29 look. Commit 8d4daf1 restores all site visuals on the D1 stack; the redesign remains recoverable at commit 6fed861 (visual diff: 44 files, ±~2.4k lines).
Rejected: keeping fatura-kase on the public site; git revert of migration commits.

### 2026-09-12 — mongodump from VPS via deleted sync scripts
Failed: 2026-09-12 probe — SERVER_HOST/SERVER_USER/SERVER_SSH_PASSWORD exist nowhere (shell, .env, .env.local, .dev.vars); sunucu_bilgi.md password marked "(gizli)"; SSH probe returned REMOTE HOST IDENTIFICATION HAS CHANGED (host key rotated/reinstalled). Migrator proven against committed fixture scripts/fixtures/sample.archive instead.
Don't retry unless: user supplies fresh VPS SSH creds before cutover day (cutover step 2 in DEPLOY-CLOUDFLARE.md needs it).

### 2026-09-12 — .env RESEND_API_KEY is invalid (401)
Failed: e2e contact submit → Resend 401 validation_error; email failed gracefully (non-fatal by design), lead persisted to D1.
Don't retry unless: user provides a valid RESEND_API_KEY (production secret + local .env); also verify sending domain in Resend or keep onboarding@resend.dev from-address.

