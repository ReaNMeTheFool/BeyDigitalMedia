# Gates: Leaf 1.2.2 — mini admin /admin

Scope: /admin routes with env-based auth (admin-auth.ts, PBKDF2 + HMAC cookie), leads dashboard, CRUD for services/projects/testimonials/faqs/blog, home page block editor (+ JSON advanced), settings/nav/footer forms, media list + R2 upload + /dyn-media route. Server actions in src/app/admin/actions.ts, guarded, revalidatePath.

- [ ] G1: Auth lib exports contracted functions; cookie bdm_admin; PBKDF2 + HMAC via WebCrypto only (no external auth deps).
  CHECK: grep -cE "export (async )?(function|const) (verifyAdminLogin|createSessionToken|isValidSession|requireAdmin)" src/lib/admin-auth.ts && grep -cE "pbkdf2|subtle" src/lib/admin-auth.ts && grep -rn "bdm_admin" src/lib/admin-auth.ts
  EXPECT: /4/ then nonzero, then /bdm_admin/
  EVIDENCE: pending

- [ ] G2: Unauthenticated /admin requests redirect to /admin/login; login page renders 200; wrong password rejected; correct env creds set cookie.
  CHECK: (npm run dev > /tmp/dev4.log 2>&1 & echo $! > /tmp/dev4.pid; sleep 25; printf "guard:%s " "$(curl -s -o /dev/null -w "%{redirect_url}" http://localhost:3000/admin)"; printf "login:%s " "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin/login)"; kill $(cat /tmp/dev4.pid))
  EXPECT: /guard:.*\/admin\/login/ and /login:200/
  EVIDENCE: pending

- [ ] G3: All 10 admin routes exist (files on disk, not redirects).
  CHECK: for r in login services projects testimonials faqs blog home settings media; do test -d "src/app/admin/$r" -o -f "src/app/admin/$r/page.tsx" || echo "MISSING:$r"; done
  EXPECT: no MISSING lines
  EVIDENCE: pending

- [ ] G4: R2 upload path exists: media admin page posts to server action using getMEDIA(); /dyn-media/[...key]/route.ts serves objects with immutable cache header.
  CHECK: grep -cE "MEDIA\.(put|get)" src/app/admin/actions.ts src/app/dyn-media/\[...key\]/route.ts && grep -c "immutable" src/app/dyn-media/\[...key\]/route.ts
  EXPECT: non-zero on both
  EVIDENCE: pending

- [ ] G5: Mutations guarded: every exported action in src/app/admin/actions.ts calls requireAdmin() (or isValidSession) before any write.
  CHECK: node -e "const s=require('fs').readFileSync('src/app/admin/actions.ts','utf8'); const fns=[...s.matchAll(/export async function (\w+)/g)].map(m=>m[1]); console.log(fns.length, fns.filter(f=>{const i=s.indexOf('export async function '+f); const body=s.slice(i, s.indexOf('export async function', i+1)>0?s.indexOf('export async function', i+1):s.length); return /requireAdmin|isValidSession/.test(body)}).length)"
  EXPECT: two equal numbers, > 0
  EVIDENCE: pending

- [ ] G6: Type-check + build pass (0 errors, warnings listed).
  CHECK: npx tsc --noEmit && npx next build > /tmp/build4.log 2>&1; echo "exit:$?"; grep -ciE "warn" /tmp/build4.log || true
  EXPECT: /exit:0/
  EVIDENCE: pending
