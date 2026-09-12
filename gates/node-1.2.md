# Gates: Branch 1.2 — app integrated

Scope: After leaves 1.2.1 + 1.2.2: public site and admin coexist; auth guard does not leak into public routes; production OpenNext build passes.

- [x] B2-G1: OpenNext production build on the complete tree, 0 errors; warning list recorded.
  CHECK: npx opennextjs-cloudflare build > /tmp/buildb2.log 2>&1; echo "exit:$?"; grep -ciE "warn" /tmp/buildb2.log || true
  EXPECT: /exit:0/
  EVIDENCE: exit 0, "OpenNext build complete." (driver re-run 2026-09-10). Only toolchain deprecation present: node DEP0205 module.register (node 26 vs Next internal loader) + its trace-deprecation hint line — not app code.

- [x] B2-G2: Public homepage and /admin/login both reachable in the same dev process (200), no auth leakage: /admin redirects without cookie.
  CHECK: (npm run dev > /tmp/devb2.log 2>&1 & echo $! > /tmp/devb2.pid; sleep 25; printf "home:%s " "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)"; printf "login:%s " "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin/login)"; printf "admin:%s" "$(curl -s -o /dev/null -w "%{redirect_url}" http://localhost:3000/admin)"; kill $(cat /tmp/devb2.pid))
  EXPECT: /home:200 login:200 admin:.*\/admin\/login/
  EVIDENCE: "home:200 login:200 admin:http://localhost:3000/admin/login" (driver re-run 2026-09-10); tsc 0 errors; leaf-4 gate-check 6/6 (commit 34ea089, driver-verified scope: 28 new admin files)
