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

## Dead ends

### 2026-08-29 — code-reviewer subagent type
Failed: dispatching the `code-reviewer` agent type twice returned harness error "captcha verify failed" (no work performed).
Don't retry unless: the harness error disappears. Use `Explore` (read-only, has Bash for git diff) for diff reviews instead.

