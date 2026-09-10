# Gates: Leaf 1.1.1 — OpenNext skeleton + compat proof

Scope: Add @opennextjs/cloudflare + wrangler, wrangler.jsonc, next.config dev-bindings hook, scripts, .dev.vars(.example); prove the CURRENT app (Payload still present) builds through OpenNext on Next 16.1.6 with node 26.

- [x] G1: Dependencies installed: @opennextjs/cloudflare, wrangler, @cloudflare/workers-types present in devDependencies.
  CHECK: node -e "const p=require('./package.json'); const d=[...Object.keys(p.dependencies||{}),...Object.keys(p.devDependencies||{})]; console.log(d.filter(x=>/opennextjs|wrangler|workers-types/.test(x)).sort().join(' '))"
  EXPECT: /@opennextjs\/cloudflare .*wrangler .*@cloudflare\/workers-types|@cloudflare\/workers-types .*@opennextjs\/cloudflare|wrangler/
  EVIDENCE: `@cloudflare/workers-types @opennextjs/cloudflare wrangler` (devDependencies: @cloudflare/workers-types ^5.20260910.1, @opennextjs/cloudflare ^1.20.6, wrangler ^4.130.0)

- [x] G2: wrangler.jsonc exists with name beydigitalmedia, main .open-next/worker.js, nodejs_compat, ASSETS/DB/MEDIA bindings.
  CHECK: grep -E "beydigitalmedia|nodejs_compat|\.open-next/worker\.js|\"ASSETS\"|\"DB\"|\"MEDIA\"" wrangler.jsonc
  EXPECT: /beydigitalmedia/ and /nodejs_compat/ and /\.open-next\/worker\.js/ and /"ASSETS"/ and /"DB"/ and /"MEDIA"/
  EVIDENCE: `"name": "beydigitalmedia"`, `"main": ".open-next/worker.js"`, `"compatibility_flags": ["nodejs_compat"]`, `"binding": "ASSETS"`, `"binding": "DB"` (database_id eb3df19d-c4b4-4d59-818d-cda91e2cd1ba, real), `"binding": "MEDIA"` (bucket beydigitalmedia-media, created)

- [x] G3: OpenNext build succeeds on the current app (Next 16.1.6, reactCompiler on, Payload still in tree).
  CHECK: npx opennextjs-cloudflare build 2>&1 | tail -5
  EXPECT: /worker\.js|Worker written|Build (succeeded|completed)/i and exit code 0 (record full warning list in EVIDENCE)
  EVIDENCE: `Worker saved in `.open-next/worker.js` 🚀` + `OpenNext build complete.`, exit 0. Installed Next is 16.3.4 (^16.1.6 range), satisfies @opennextjs/cloudflare 1.20.6 peer `>=16.3.3`. Turbopack build fails in esbuild worker bundling (`Could not resolve "sharp-20c6a5da84e2135f"` — Turbopack hashed external, OpenNext excludes sharp); fixed via `buildCommand: "next build --webpack"` in open-next.config.ts (see report). reactCompiler: true kept. Full warning list: (1) `(node:53548) [DEP0205] DeprecationWarning: \`module.register()\` is deprecated. Use \`module.registerHooks()\` instead.` (node 26 deprecation triggered inside Next, not app code); (2) `▲ [WARNING] The "typeof" operator will never evaluate to "null" [impossible-typeof]` at `.open-next/server-functions/default/.next/server/app/(payload)/admin/[[...segments]]/page.js` (esbuild linting Next's minified chunk, not app code).

- [x] G4: next.config.ts calls initOpenNextCloudflareForDev() from @opennextjs/cloudflare (withPayload kept for now), and `next dev` still boots.
  CHECK: grep -n "initOpenNextCloudflareForDev" next.config.ts && (npm run dev > /tmp/dev1.log 2>&1 & echo $! > /tmp/dev1.pid; sleep 25; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/; kill $(cat /tmp/dev1.pid))
  EXPECT: /initOpenNextCloudflareForDev/ and /200/
  EVIDENCE: `7:initOpenNextCloudflareForDev();` in next.config.ts; curl printed `200`; dev log ` GET / 200 in 4.7s`. Mongo reachable on localhost:27017 (existing stopped `mongo` container restarted — the compose mongo service publishes no host port, so `docker compose up -d mongo` cannot satisfy DATABASE_URI; used the scripts/start-dev.sh flow instead). All dev processes killed, port 3000 free after.

- [x] G5: Local D1 usable: migrations dir prepared with 0001_schema.sql placeholder-comment only (schema itself is leaf 2), and `npx wrangler d1 execute DB --local --command "SELECT 1"` exits 0.
  CHECK: npx wrangler d1 execute DB --local --command "SELECT 1" 2>&1 | tail -3
  EXPECT: /\[\s*\{\s*"1"\s*:\s*1\s*\}\s*\]|Executed 1 query/i
  EVIDENCE: exit 0, `🚣 1 command executed successfully.`, results `[ { "1": 1 } ]`; output regex-verified against EXPECT (EXPECT_MATCH: true). migrations/0001_schema.sql contains only a placeholder comment.

- [x] G6: .dev.vars (gitignored, placeholder values) and .dev.vars.example (committed) exist with all 7 env var names.
  CHECK: cat .dev.vars.example | grep -cE "^(NEXT_PUBLIC_SERVER_URL|RESEND_API_KEY|RECIPIENT_EMAIL|RESEND_FROM_EMAIL|ADMIN_USERNAME|ADMIN_PASSWORD|AUTH_SECRET)=" && git check-ignore .dev.vars
  EXPECT: /7/ and exit 0
  EVIDENCE: `7` and `.dev.vars` printed by git check-ignore (both exit 0)
