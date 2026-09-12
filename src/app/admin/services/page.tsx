import Link from "next/link";
import { listServices } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteServiceAction } from "@/app/admin/actions";
import { adminDangerButtonClass, adminGhostButtonClass } from "@/components/admin/styles";

export const metadata = { title: "Hizmetler" };

export default async function ServicesAdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const deleteIdRaw = typeof params.delete === "string" ? Number(params.delete) : null;
  const deleteId = deleteIdRaw != null && Number.isFinite(deleteIdRaw) ? deleteIdRaw : null;

  const services = await listServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hizmetler</h1>
        <Link
          href="/admin/services/new"
          className="rounded bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Yeni hizmet
        </Link>
      </div>

      {deleteId != null && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">Bu hizmet kalıcı olarak silinecek. Emin misiniz?</p>
          <div className="mt-3 flex gap-2">
            <form action={deleteServiceAction}>
              <input type="hidden" name="id" value={deleteId} />
              <button type="submit" className={adminDangerButtonClass}>
                Evet, sil
              </button>
            </form>
            <Link href="/admin/services" className={adminGhostButtonClass}>
              Vazgeç
            </Link>
          </div>
        </div>
      )}

      {services.length === 0 ? (
        <p className="text-sm text-neutral-500">Kayıt yok.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-xs uppercase tracking-wide text-neutral-500">
              <th className="py-2 pr-3 font-medium">Başlık</th>
              <th className="py-2 pr-3 font-medium">Slug</th>
              <th className="py-2 pr-3 font-medium">Sıra</th>
              <th className="py-2 pr-3 font-medium">Vurgu rengi</th>
              <th className="py-2 font-medium" />
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-neutral-100">
                <td className="py-2 pr-3">{service.title}</td>
                <td className="py-2 pr-3 text-neutral-500">/{service.slug}</td>
                <td className="py-2 pr-3">{service.order ?? 0}</td>
                <td className="py-2 pr-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: service.accentColor }}
                  />
                </td>
                <td className="py-2 text-right">
                  <Link href={`/admin/services/${service.id}`} className="text-neutral-700 underline underline-offset-2">
                    Düzenle
                  </Link>
                  <Link
                    href={`/admin/services?delete=${service.id}`}
                    className="ml-3 text-red-600 underline underline-offset-2"
                  >
                    Sil
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
