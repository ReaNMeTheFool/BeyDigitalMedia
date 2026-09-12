import Link from "next/link";
import { listContactSubmissions } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteLeadAction, markLeadReadAction } from "@/app/admin/actions";
import { adminDangerButtonClass, adminGhostButtonClass } from "@/components/admin/styles";

export const metadata = { title: "Lead'ler" };

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const deleteIdRaw = typeof params.delete === "string" ? Number(params.delete) : null;
  const deleteId = deleteIdRaw != null && Number.isFinite(deleteIdRaw) ? deleteIdRaw : null;

  const leads = await listContactSubmissions(200);
  const unreadCount = leads.filter((lead) => !lead.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Lead&apos;ler</h1>
          <p className="text-sm text-neutral-500">
            {leads.length} kayıt{unreadCount > 0 ? `, ${unreadCount} okunmadı` : ""}
          </p>
        </div>
      </div>

      {deleteId != null && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">Bu lead kalıcı olarak silinecek. Emin misiniz?</p>
          <div className="mt-3 flex gap-2">
            <form action={deleteLeadAction}>
              <input type="hidden" name="id" value={deleteId} />
              <button type="submit" className={adminDangerButtonClass}>
                Evet, sil
              </button>
            </form>
            <Link href="/admin" className={adminGhostButtonClass}>
              Vazgeç
            </Link>
          </div>
        </div>
      )}

      {leads.length === 0 ? (
        <p className="text-sm text-neutral-500">Kayıt yok.</p>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <li key={lead.id} className="rounded border border-neutral-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{lead.name}</span>
                {!lead.read && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    Okunmadı
                  </span>
                )}
                <span className="ml-auto text-xs text-neutral-400">
                  {lead.createdAt.replace("T", " ")}
                </span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">
                <a href={`mailto:${lead.email}`} className="underline underline-offset-2">
                  {lead.email}
                </a>
                {lead.phone != null && <span> · {lead.phone}</span>}
                {lead.service != null && lead.service !== "" && <span> · {lead.service}</span>}
              </p>
              <p className="mt-2 whitespace-pre-line text-sm text-neutral-800">{lead.message}</p>
              <div className="mt-3 flex gap-2">
                <form action={markLeadReadAction}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="read" value={lead.read ? "0" : "1"} />
                  <button type="submit" className="text-sm text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
                    {lead.read ? "Okunmadı işaretle" : "Okundu işaretle"}
                  </button>
                </form>
                <Link
                  href={`/admin?delete=${lead.id}`}
                  className="ml-3 text-sm text-red-600 underline underline-offset-2 hover:text-red-500"
                >
                  Sil
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
