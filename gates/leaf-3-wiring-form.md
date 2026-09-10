# Gates: Leaf 1.2.1 — Payload removal + pages wiring + contact form

Scope: Delete the entire Payload tree (src/payload/**, src/payload.config.ts, src/payload-types.ts, src/app/(payload)/**, src/lib/payload.ts, src/lib/lexicalToHtml.ts) and its deps; swap all public pages/components to @/lib/content; drop generateStaticParams; rewrite actions.ts to D1 + D1 rate limit + Resend with identical user-facing messages.

- [x] G1: No references to payload/mongoose/sharp/lexical remain in src/.
  CHECK: grep -rEn "payload-types|getPayloadClient|@payloadcms|from ['\"]payload['\"]|mongoose|lexicalToHtml|from ['\"]sharp['\"]" src/ --include="*.ts" --include="*.tsx" | wc -l
  EXPECT: /^0$/
  EVIDENCE: `0` (stale comment in src/types/content.ts referencing payload-types and the provenance comment in content-defaults.ts updated; no code references remain)

- [x] G2: Payload files and deps gone.
  CHECK: ls src/payload src/payload.config.ts src/payload-types.ts src/lib/payload.ts src/lib/lexicalToHtml.ts "src/app/(payload)" 2>&1 | grep -c "No such file"; grep -cE '"(payload|mongoose|sharp|@payloadcms)' package.json
  EXPECT: /^6$/ and /^0$/
  EVIDENCE: `6` (requires `LC_ALL=C` on this tr-locale machine — plain ls prints "Böyle bir dosya ya da dizin yok"; all six paths confirmed gone) and `0` (deps payload, 4x @payloadcms/*, graphql, sharp removed; sharp@0.34.5 removed from allowScripts; payload:seed/start:all/seed scripts removed; 283 packages removed by npm install)

- [x] G3: actions.ts uses D1 rate limit and Cf-Connecting-Ip; DB-write-first order preserved; Resend failure non-fatal; user-facing strings unchanged.
  CHECK: grep -cE "Cf-Connecting-Ip|datetime\('now','-5 minutes'\)" src/app/actions.ts
  EXPECT: /^[2-9]$|^[1-9][0-9]+$/
  EVIDENCE: `2` — line `hdrs.get("Cf-Connecting-Ip") ||` (with x-forwarded-for/x-real-ip fallbacks) plus the rate-limit comment citing the `datetime('now','-5 minutes')` window enforced via content.ts countRecentSubmissions (>=5 → "Çok fazla istek gönderdiniz..."); createContactSubmission runs before Resend; email failure only logs, returns "Talebiniz alındı ve kaydedildi..."; all Turkish user-facing strings byte-identical to the previous actions.ts (git diff shows no message changes)

- [x] G4: Type-check + next build: 0 errors; warnings listed verbatim if any.
  CHECK: npx tsc --noEmit && (npx next build > /tmp/build3.log 2>&1; tail -5 /tmp/build3.log; grep -ciE "warn" /tmp/build3.log || true)
  EXPECT: exit 0; warning count reported in EVIDENCE (app-code warnings must be 0)
  EVIDENCE: tsc exit 0; build exit 0 ("✓ Compiled successfully in 3.9s", "Finished TypeScript in 3.2s"). grep -ciE "warn" = 2 lines, both from one toolchain (non-app) warning, verbatim: `(node:85364) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.` + `(Use `node --trace-deprecation ...` to show where the warning was created)` — emitted by Node 26 against Next's internal module loader, not fixable from app code. `npx eslint src` clean after removing 2 unused imports (hydrateBlocks, PageBlock) from src/lib/content.ts. All D1-reading routes are `force-dynamic` (/, /[slug], /blog, /blog/[slug], /portfolyo/[slug], /sitemap.xml); build prerenders only /hakkimizda, /iletisim, /_not-found, /icon.png — no build-time DB access.

- [x] G5: Dev runtime against seeded local D1: homepage, one service detail page, /blog, /portfolyo/[slug], /sitemap.xml, and a 404 URL all respond correctly.
  CHECK: (npm run dev > /tmp/dev3.log 2>&1 & echo $! > /tmp/dev3.pid; sleep 25; for p in / /sosyal-medya-yonetimi /blog /portfolyo/guzgun-tekstil /sitemap.xml /yok-boyle-sayfa; do printf "%s %s\n" "$p" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$p)"; done; kill $(cat /tmp/dev3.pid))
  EXPECT: all pages 200 except /yok-boyle-sayfa which is 404
  EVIDENCE: `/ 200`, `/sosyal-medya-yonetimi 200`, `/blog 200`, `/portfolyo/guzgun-tekstil 200`, `/sitemap.xml 200`, `/yok-boyle-sayfa 404`. Content verified from fetched HTML: home renders hero/marquee/servicesGrid/about(150+ stats, about paragraphs from the about Page doc)/faqAccordion/footer socials (no "Bu sayfa henüz hazırlanmadı" fallback); service page renders both long_description paragraphs as text plus "Ne Sunuyoruz?" features; /blog shows the empty-archive state (0 seeded posts by decision); project page renders "Guzgun Tekstil" + "DOĞRULANDU" stamp; sitemap.xml has 19 <url> entries (4 static + /about + 9 services + 5 projects). Dev server killed after each run; port 3000 free.
