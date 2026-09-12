import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold">Sayfa bulunamadı</h1>
      <p className="mt-1 text-sm text-neutral-500">Aradığınız yönetim sayfası mevcut değil.</p>
      <Link href="/admin" className="mt-4 inline-block text-sm text-neutral-700 underline underline-offset-2">
        Panele dön
      </Link>
    </div>
  );
}
