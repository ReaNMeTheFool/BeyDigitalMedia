import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { COOKIE_NAME, isValidSession } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yönetim Paneli",
    template: "%s | Yönetim Paneli",
  },
  robots: { index: false, follow: false },
};

/**
 * Oturum varsa panel kabugunu (yan menu) basar; yoksa children ciplak
 * sayfa olarak akar (login sayfasi). Korunan sayfalar requireAdmin() ile
 * /admin/login'e yonlendirilir.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const authed = token ? await isValidSession(token) : false;

  return (
    <html lang="tr">
      <body className="bg-neutral-100 text-neutral-900 antialiased">
        {authed ? <AdminShell>{children}</AdminShell> : children}
      </body>
    </html>
  );
}
