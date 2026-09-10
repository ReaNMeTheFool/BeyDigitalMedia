# Gates: Leaf 1.2.1 — public pages wiring + contact form

Scope: Swap all Payload-calling public pages/components to @/lib/content; delete src/payload-types.ts, src/lib/lexicalToHtml.ts, src/lib/payload.ts; drop generateStaticParams; rewrite actions.ts to D1 + D1 rate limit + Resend with identical user-facing messages.

- [ ] G1: Zero references to payload anywhere in src/.
  CHECK: grep -rEn "payload-types|getPayloadClient|@payloadcms|from ['\"]payload['\"]|mongoose|lexicalToHtml" src/ --include="*.ts" --include="*.tsx" | wc -l
  EXPECT: /^0$/
  EVIDENCE: pending

- [ ] G2: Files deleted: src/payload-types.ts, src/lib/lexicalToHtml.ts, src/lib/payload.ts.
  CHECK: ls src/payload-types.ts src/lib/lexicalToHtml.ts src/lib/payload.ts 2>&1
  EXPECT: /No such file/ (3 times)
  EVIDENCE: pending

- [ ] G3: actions.ts uses D1 rate limit and Cf-Connecting-Ip; DB-write-first order preserved; Resend failure non-fatal; user-facing strings unchanged.
  CHECK: grep -cE "Cf-Connecting-Ip|datetime\('now','-5 minutes'\)" src/app/actions.ts
  EXPECT: /^[2-9]$|^[1-9][0-9]+$/
  EVIDENCE: pending

- [ ] G4: Type-check + next build: 0 errors; warnings listed verbatim if any.
  CHECK: npx tsc --noEmit && (npx next build > /tmp/build3.log 2>&1; tail -5 /tmp/build3.log; grep -ciE "warn" /tmp/build3.log || true)
  EXPECT: exit 0; warning count reported in EVIDENCE (app-code warnings must be 0)
  EVIDENCE: pending

- [ ] G5: Dev runtime: homepage, one service detail page, /blog, /portfolyo/[slug], /sitemap.xml, and a 404 URL all respond correctly (200/404) against seeded local D1.
  CHECK: (npm run dev > /tmp/dev3.log 2>&1 & echo $! > /tmp/dev3.pid; sleep 25; for p in / /sosyal-medya-yonetimi /blog /portfolyo/guzgun-tekstil /sitemap.xml /yok-boyle-sayfa; do printf "%s %s\n" "$p" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$p)"; done; kill $(cat /tmp/dev3.pid))
  EXPECT: all pages 200 except /yok-boyle-sayfa which is 404
  EVIDENCE: pending
