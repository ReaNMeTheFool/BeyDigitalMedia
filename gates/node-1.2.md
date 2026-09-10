# Gates: Branch 1.2 — app integrated

Scope: After leaves 1.2.1 + 1.2.2: public site and admin coexist; auth guard does not leak into public routes; production OpenNext build passes.

- [ ] B2-G1: OpenNext production build on the complete tree, 0 errors; warning list recorded.
  CHECK: npx opennextjs-cloudflare build > /tmp/buildb2.log 2>&1; echo "exit:$?"; grep -ciE "warn" /tmp/buildb2.log || true
  EXPECT: /exit:0/
  EVIDENCE: pending

- [ ] B2-G2: Public homepage and /admin/login both reachable in the same dev process (200), no auth leakage: /admin redirects without cookie.
  CHECK: (npm run dev > /tmp/devb2.log 2>&1 & echo $! > /tmp/devb2.pid; sleep 25; printf "home:%s " "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/)"; printf "login:%s " "$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin/login)"; printf "admin:%s" "$(curl -s -o /dev/null -w "%{redirect_url}" http://localhost:3000/admin)"; kill $(cat /tmp/devb2.pid))
  EXPECT: /home:200 login:200 admin:.*\/admin\/login/
  EVIDENCE: pending
