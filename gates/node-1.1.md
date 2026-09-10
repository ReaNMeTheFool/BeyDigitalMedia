# Gates: Branch 1.1 — foundation integrated

Scope: After leaves 1.1.1 + 1.1.2: deps install cleanly, OpenNext build still passes on the Payload-free tree, local D1 reachable from next dev via bindings.

- [x] B1-G1: Clean install works (no missing/phantom deps).
  CHECK: rm -rf node_modules && npm ci 2>&1 | tail -3
  EXPECT: /added [0-9]+ packages/ and exit 0
  EVIDENCE: resequenced after leaf 1.2.1 (sharp install-script failure on node 26; see PLAN.md status log). Plain `npm ci` exit 0 (log /tmp/ci.log), run by driver 2026-09-10 after dep removal.

- [x] B1-G2: OpenNext build passes on the Payload-free tree.
  CHECK: npx opennextjs-cloudflare build 2>&1 | tail -3
  EXPECT: exit code 0
  EVIDENCE: "OpenNext build complete." — exit 0 (driver re-run 2026-09-10, /tmp/b1b.log)

- [x] B1-G3: next dev serves homepage (200) with content.ts fallbacks (D1 may be empty here; page must not 500).
  CHECK: (npm run dev > /tmp/devb1.log 2>&1 & echo $! > /tmp/devb1.pid; sleep 25; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/; kill $(cat /tmp/devb1.pid))
  EXPECT: /^200$/
  EVIDENCE: home:200; /sosyal-medya-yonetimi contains D1 content ("sosyal medya"); sitemap.xml 200 (driver re-run 2026-09-10)
