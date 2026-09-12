import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";
import { logoutAction } from "@/app/admin/login/actions";

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col bg-neutral-900">
        <div className="border-b border-neutral-800 px-4 py-4">
          <p className="text-sm font-semibold text-white">Bey Digital Media</p>
          <p className="text-xs text-neutral-400">Yönetim Paneli</p>
        </div>
        <AdminNav />
        <form action={logoutAction} className="border-t border-neutral-800 p-3">
          <button type="submit" className="text-sm text-neutral-300 hover:text-white">
            Çıkış Yap
          </button>
        </form>
      </aside>
      <main className="min-w-0 flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
