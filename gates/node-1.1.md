# Gates: Branch 1.1 — foundation integrated

Scope: After leaves 1.1.1 + 1.1.2: deps install cleanly, OpenNext build still passes on the Payload-free tree, local D1 reachable from next dev via bindings.

- [ ] B1-G1: Clean install works (no missing/phantom deps).
  CHECK: rm -rf node_modules && npm ci 2>&1 | tail -3
  EXPECT: /added [0-9]+ packages/ and exit 0
  EVIDENCE: pending

- [ ] B1-G2: OpenNext build passes on the Payload-free tree.
  CHECK: npx opennextjs-cloudflare build 2>&1 | tail -3
  EXPECT: exit code 0
  EVIDENCE: pending

- [ ] B1-G3: next dev serves homepage (200) with content.ts fallbacks (D1 may be empty here; page must not 500).
  CHECK: (npm run dev > /tmp/devb1.log 2>&1 & echo $! > /tmp/devb1.pid; sleep 25; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/; kill $(cat /tmp/devb1.pid))
  EXPECT: /^200$/
  EVIDENCE: pending
