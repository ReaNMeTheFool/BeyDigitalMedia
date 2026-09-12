"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Lead'ler" },
  { href: "/admin/services", label: "Hizmetler" },
  { href: "/admin/projects", label: "Projeler" },
  { href: "/admin/testimonials", label: "Referanslar" },
  { href: "/admin/faqs", label: "SSS" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/home", label: "Ana Sayfa" },
  { href: "/admin/settings", label: "Site Ayarları" },
  { href: "/admin/media", label: "Medya" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 px-2 py-3 text-sm">
      {items.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded px-3 py-1.5 ${
              active ? "bg-neutral-800 text-white" : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
