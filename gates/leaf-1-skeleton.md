# Gates: Leaf 1.1.1 — OpenNext skeleton + compat proof

Scope: Add @opennextjs/cloudflare + wrangler, wrangler.jsonc, next.config dev-bindings hook, scripts, .dev.vars(.example); prove the CURRENT app (Payload still present) builds through OpenNext on Next 16.1.6 with node 26.

- [ ] G1: Dependencies installed: @opennextjs/cloudflare, wrangler, @cloudflare/workers-types present in devDependencies.
  CHECK: node -e "const p=require('./package.json'); const d=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})]; console.log(d.filter(x=>/opennextjs|wrangler|workers-types/.test(x)).sort().join(' '))"
  EXPECT: /@opennextjs\/cloudflare .*wrangler .*@cloudflare\/workers-types|@cloudflare\/workers-types .*@opennextjs\/cloudflare|wrangler/
  EVIDENCE: pending

- [ ] G2: wrangler.jsonc exists with name beydigitalmedia, main .open-next/worker.js, nodejs_compat, ASSETS/DB/MEDIA bindings.
  CHECK: grep -E "beydigitalmedia|nodejs_compat|\.open-next/worker\.js|\"ASSETS\"|\"DB\"|\"MEDIA\"" wrangler.jsonc
  EXPECT: /beydigitalmedia/ and /nodejs_compat/ and /\.open-next\/worker\.js/ and /"ASSETS"/ and /"DB"/ and /"MEDIA"/
  EVIDENCE: pending

- [ ] G3: OpenNext build succeeds on the current app (Next 16.1.6, reactCompiler on, Payload still in tree).
  CHECK: npx opennextjs-cloudflare build 2>&1 | tail -5
  EXPECT: /worker\.js|Worker written|Build (succeeded|completed)/i and exit code 0 (record full warning list in EVIDENCE)
  EVIDENCE: pending

- [ ] G4: next.config.ts calls initOpenNextCloudflareForDev() from @opennextjs/cloudflare (withPayload kept for now), and `next dev` still boots.
  CHECK: grep -n "initOpenNextCloudflareForDev" next.config.ts && (npm run dev > /tmp/dev1.log 2>&1 & echo $! > /tmp/dev1.pid; sleep 25; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/; kill $(cat /tmp/dev1.pid))
  EXPECT: /initOpenNextCloudflareForDev/ and /200/
  EVIDENCE: pending

- [ ] G5: Local D1 usable: migrations dir prepared with 0001_schema.sql placeholder-comment only (schema itself is leaf 2), and `npx wrangler d1 execute DB --local --command "SELECT 1"` exits 0.
  CHECK: npx wrangler d1 execute DB --local --command "SELECT 1" 2>&1 | tail -3
  EXPECT: /\[\s*\{\s*"1"\s*:\s*1\s*\}\s*\]|Executed 1 query/i
  EVIDENCE: pending

- [ ] G6: .dev.vars (gitignored, placeholder values) and .dev.vars.example (committed) exist with all 7 env var names.
  CHECK: cat .dev.vars.example | grep -cE "^(NEXT_PUBLIC_SERVER_URL|RESEND_API_KEY|RECIPIENT_EMAIL|RESEND_FROM_EMAIL|ADMIN_USERNAME|ADMIN_PASSWORD|AUTH_SECRET)=" && git check-ignore .dev.vars
  EXPECT: /7/ and exit 0
  EVIDENCE: pending
