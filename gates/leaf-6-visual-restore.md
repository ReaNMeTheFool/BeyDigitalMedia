# Gates: Leaf 6 — visual restore to commit 7d5f113b (post-migration)

Scope: Public site appearance returned to the Aug-29 state of commit 7d5f113b (pre-"fatura-kase" redesign), while KEEPING the entire Cloudflare migration stack (D1 data layer, mini admin, wrangler/open-next config, actions.ts). The redesign stays recoverable in git history (commit 6fed861).

- [ ] G1: Visual files restored from 7d5f113b; fatura-kase-only components gone.
  CHECK: git diff 7d5f113b..HEAD --name-only -- 'src/app/(site)' src/components/globals.css src/components/sections src/components/ui src/components/blocks src/app/globals.css 2>/dev/null | grep -vE "components/admin|sitemap.xml" | wc -l; ls src/components/document 2>&1 | grep -c "No such file"
  EXPECT: /^0$/ and /^1$/
  EVIDENCE: CHECK output "16" and "1" (LC_ALL=C): 8 document/* fatura-kase components deleted (ls clause = 1); 21 of 37 in-pathspec visual files byte-identical to 7d5f113b; the 16 listed diffs (6 pages, layout, BlocksRenderer, 7 *Server wrappers, ContactForm, NavbarServer) change ONLY data plumbing (getPayloadClient/@payload-types/lexicalToHtml -> @/lib/content + @/types/content, richText -> string render); git diff grep for className/tag/font changes shows zero visual diffs.
ABANDON: G1 first clause unsatisfiable as written: diff=0 requires byte-identical pages, which reintroduces payload-era imports that G2 forbids (grep must be 0); the leaf method itself mandates adapting these 16 files to @/lib/content. G1 substance (fatura-kase gone, old visuals back) is met per EVIDENCE; only the plumbing-adapted files necessarily differ.

- [x] G2: Zero payload-era imports in src/; adapted files import from @/lib/content and @/types/content only.
  CHECK: grep -rEn "payload-types|getPayloadClient|@payloadcms|from ['\"]payload['\"]|mongoose|lexicalToHtml|components/document" src/ --include="*.ts" --include="*.tsx" | wc -l
  EXPECT: /^0$/
  EVIDENCE: ran verbatim -> "0" matching lines (grep exit 1, no output); gate-check's JS matcher cannot pass it mechanically because wc -l's trailing newline fails /^0$/ (verified: /^0$/.test("0\n") === false). All adapted files import from @/lib/content and @/types/content only.

- [x] G3: Root not-found shell preserved (html/body shell per memory dead-end) and styled without fatura-kase document components.
  CHECK: grep -cE "<html|</html>" src/app/not-found.tsx && grep -cE "components/document|KaseStamp|SerialStrip" src/app/not-found.tsx
  EXPECT: first >= 1; second = 0
  EVIDENCE: first = 2 (html/body shell kept per memory dead-end), second = 0; content reuses restored (site)/not-found (old 404 look, Turkish, no document/* imports); rendered 404 verified dark bg #181825 + "Sayfa Bulunamadı".

- [x] G4: Type-check + next build: 0 errors; warnings listed verbatim.
  CHECK: npx tsc --noEmit && (npx next build > /tmp/build6.log 2>&1; echo "exit:$?"; grep -ciE "warn" /tmp/build6.log || true)
  EXPECT: /exit:0/
  EVIDENCE: tsc exit 0; next build "exit:0" with warning count "0" (grep -ciE "warn" /tmp/build6.log -> 0); no warnings to list.

- [x] G5: Dev runtime against local D1: home, service detail, /blog, /portfolyo/[slug], /hakkimizda, /iletisim, /sitemap.xml all 200; 404 URL → 404; /admin/login 200 (admin untouched).
  CHECK: (npm run dev > /tmp/dev6.log 2>&1 & echo $! > /tmp/dev6.pid; sleep 25; for p in / /sosyal-medya-yonetimi /blog /portfolyo/guzgun-tekstil /hakkimizda /iletisim /sitemap.xml /yok-404 /admin/login; do printf "%s:%s " "$p" "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000$p)"; done; kill $(cat /tmp/dev6.pid))
  EXPECT: all :200 except /yok-404:404
  EVIDENCE: "/:200 /sosyal-medya-yonetimi:200 /blog:200 /portfolyo/guzgun-tekstil:200 /hakkimizda:200 /iletisim:200 /sitemap.xml:200 /yok-404:404 /admin/login:200"; note: local D1 had to be re-seeded (migrations 0001+0002) because the Sep-12 account-id fix (31c1d72) re-keyed the local miniflare D1 file, leaving a6bf3e14 empty.

- [x] G6: Contact form still works end-to-end with the restored form: submit (with a service selected) persists to D1.
  CHECK: (npm run dev > /tmp/dev6b.log 2>&1 & echo $! > /tmp/dev6b.pid; sleep 25; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ > /dev/null; kill $(cat /tmp/dev6b.pid)) && npx wrangler d1 execute DB --local --command "SELECT COUNT(*) FROM contact_submissions"
  EXPECT: form submit verified by driver browser pass (EVIDENCE quote); count query exits 0
  EVIDENCE: dev boots + home 200; count query exits 0 ("COUNT(*)": 0 pre-submit); restored ContactForm.tsx line 179 always sets service on FormData: formData.set("service", selectedServices.join(",")) -> "" when none (never null; actions.ts zod optional + split(",") handles it); wiring compiles (tsc exit 0, build exit 0). DRIVER PASS 2026-09-13 on restored old form: fill + submit → "Talebiniz alındı ve kaydedildi..." rendered, D1 row persisted (id 1, service="" — no null-service error). G6 MET.
