# Gates: Leaf 6 — visual restore to commit 7d5f113b (post-migration)

Scope: Public site appearance returned to the Aug-29 state of commit 7d5f113b (pre-"fatura-kase" redesign), while KEEPING the entire Cloudflare migration stack (D1 data layer, mini admin, wrangler/open-next config, actions.ts). The redesign stays recoverable in git history (commit 6fed861).

- [ ] G1: Visual files restored from 7d5f113b; fatura-kase-only components gone.
  CHECK: git diff 7d5f113b..HEAD --name-only -- 'src/app/(site)' src/components/globals.css src/components/sections src/components/ui src/components/blocks src/app/globals.css 2>/dev/null | grep -vE "components/admin|sitemap.xml" | wc -l; ls src/components/document 2>&1 | grep -c "No such file"
  EXPECT: /^0$/ and /^1$/
  EVIDENCE: pending

- [ ] G2: Zero payload-era imports in src/; adapted files import from @/lib/content and @/types/content only.
  CHECK: grep -rEn "payload-types|getPayloadClient|@payloadcms|from ['\"]payload['\"]|mongoose|lexicalToHtml|components/document" src/ --include="*.ts" --include="*.tsx" | wc -l
  EXPECT: /^0$/
  EVIDENCE: pending

- [ ] G3: Root not-found shell preserved (html/body shell per memory dead-end) and styled without fatura-kase document components.
  CHECK: grep -cE "<html|</html>" src/app/not-found.tsx && grep -cE "components/document|KaseStamp|SerialStrip" src/app/not-found.tsx
  EXPECT: first >= 1; second = 0
  EVIDENCE: pending

- [ ] G4: Type-check + next build: 0 errors; warnings listed verbatim.
  CHECK: npx tsc --noEmit && (npx next build > /tmp/build6.log 2>&1; echo "exit:$?"; grep -ciE "warn" /tmp/build6.log || true)
  EXPECT: /exit:0/
  EVIDENCE: pending

- [ ] G5: Dev runtime against local D1: home, service detail, /blog, /portfolyo/[slug], /hakkimizda, /iletisim, /sitemap.xml all 200; 404 URL → 404; /admin/login 200 (admin untouched).
  CHECK: (npm run dev > /tmp/dev6.log 2>&1 & echo $! > /tmp/dev6.pid; sleep 25; for p in / /sosyal-medya-yonetimi /blog /portfolyo/guzgun-tekstil /hakkimizda /iletisim /sitemap.xml /yok-404 /admin/login; do printf "%s:%s " "$p" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$p)"; done; kill $(cat /tmp/dev6.pid))
  EXPECT: all :200 except /yok-404:404
  EVIDENCE: pending

- [ ] G6: Contact form still works end-to-end with the restored form: submit (with a service selected) persists to D1.
  CHECK: (npm run dev > /tmp/dev6b.log 2>&1 & echo $! > /tmp/dev6b.pid; sleep 25; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ > /dev/null; kill $(cat /tmp/dev6b.pid)) && npx wrangler d1 execute DB --local --command "SELECT COUNT(*) FROM contact_submissions"
  EXPECT: form submit verified by driver browser pass (EVIDENCE quote); count query exits 0
  EVIDENCE: pending (driver re-verifies submit over HTTP/browser)
