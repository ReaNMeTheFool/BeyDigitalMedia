# Gates: Leaf 1.3.1 — integration, e2e smoke, deploy docs, cutover prep

Scope: Full verification pass (browser e2e by the driver), DEPLOY-CLOUDFLARE.md (CF dashboard settings, secrets, custom domain, cutover order incl. mongodump→D1), VDS stack removal AFTER data path is secured, final build ledger.

- [ ] G1: OpenNext build: 0 errors, 0 app-code warnings (full warning list in EVIDENCE).
  CHECK: npx opennextjs-cloudflare build > /tmp/final-build.log 2>&1; echo "exit:$?"; grep -iE "warn" /tmp/final-build.log || echo "no-warnings"
  EXPECT: /exit:0/
  EVIDENCE: pending

- [ ] G2: Browser e2e (driver runs this personally, evidence = screenshots/quotes): homepage renders with D1 content, service detail, project detail, blog (empty state), sitemap.xml lists URLs, 404 custom page, contact form submit persists to D1 and fires Resend (test key) or logs graceful failure, admin: login → read lead → mark read → edit a service → home editor save → media upload shows.
  CHECK: grep -c "PASS" /tmp/e2e-notes.md
  EXPECT: /11/
  EVIDENCE: pending

- [ ] G3: DEPLOY-CLOUDFLARE.md contains: exact CF dashboard form values (build/deploy commands), wrangler deploy alternative, full secrets list with sources, D1 remote creation + migration commands, R2 bucket creation, custom domain steps, cutover order with mongodump step, rollback note.
  CHECK: grep -cE "^#|^##" DEPLOY-CLOUDFLARE.md && grep -E "mongodump|migrate-mongo-to-d1|wrangler secret put|Custom Domain" DEPLOY-CLOUDFLARE.md | wc -l
  EXPECT: section count > 5 and checklist lines >= 4
  EVIDENCE: pending

- [ ] G4: scripts/migrate-mongo-to-d1.ts proven against a real or fixture mongodump archive (fixture committed under scripts/fixtures/ if VPS unreachable), producing valid SQL that loads into local D1.
  CHECK: ls scripts/fixtures/*.archive 2>/dev/null || true; npx tsx scripts/migrate-mongo-to-d1.ts $(ls scripts/fixtures/*.archive 2>/dev/null | head -1) --out /tmp/dump.sql && npx wrangler d1 execute DB --local --file /tmp/dump.sql
  EXPECT: exit 0 (OR an explicit ABANDON line with the exact user command to run on cutover day)
  EVIDENCE: pending

- [ ] G5: VDS stack removed only if G4's data path is proven or ABANDON-documented: Dockerfile, docker-compose.yml, scripts/deploy.sh, scripts/build-and-push.sh, scripts/push-to-server.sh, scripts/sync-from-server.sh, and payload/mongo leftovers in README/env examples.
  CHECK: ls Dockerfile docker-compose.yml scripts/deploy.sh scripts/build-and-push.sh scripts/push-to-server.sh scripts/sync-from-server.sh 2>&1 | grep -c "No such file"
  EXPECT: /^6$/
  EVIDENCE: pending

- [ ] G6: .env/.env.example updated: DATABASE_URI, PAYLOAD_SECRET, ADMIN_USERNAME/PASSWORD semantics (now admin login), AUTH_SECRET added; README deploy section replaced.
  CHECK: grep -cE "AUTH_SECRET" .env.example && grep -cE "DATABASE_URI|PAYLOAD_SECRET" .env.example
  EXPECT: first >= 1; second = 0
  EVIDENCE: pending
