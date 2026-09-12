import Link from "next/link";
import { listFaqs } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getFaqById } from "@/lib/admin-data";
import { deleteFaqAction, upsertFaqAction } from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import { TextAreaField, TextField } from "@/components/admin/fields";
import { adminDangerButtonClass, adminGhostButtonClass } from "@/components/admin/styles";

export const metadata = { title: "SSS" };

export default async function FaqsAdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const editIdRaw = typeof params.edit === "string" ? Number(params.edit) : null;
  const editId = editIdRaw != null && Number.isFinite(editIdRaw) ? editIdRaw : null;
  const deleteIdRaw = typeof params.delete === "string" ? Number(params.delete) : null;
  const deleteId = deleteIdRaw != null && Number.isFinite(deleteIdRaw) ? deleteIdRaw : null;

  const [faqs, editing] = await Promise.all([
    listFaqs(),
    editId != null ? getFaqById(editId) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Sık Sorulan Sorular</h1>

      <ActionForm
        action={upsertFaqAction}
        submitLabel={editing ? "Güncelle" : "Ekle"}
        className="max-w-2xl space-y-4 rounded border border-neutral-200 bg-white p-4"
      >
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">{editing ? `Düzenleniyor: #${editing.id}` : "Yeni soru"}</h2>
          {editing && (
            <Link href="/admin/faqs" className="text-xs text-neutral-500 underline underline-offset-2">
              Yeni kayda geç
            </Link>
          )}
        </div>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <TextField label="Soru" name="question" defaultValue={editing?.question} required />
          </div>
          <div className="w-32">
            <TextField label="Sıra" name="order" type="number" defaultValue={editing?.order ?? 0} />
          </div>
        </div>
        <TextAreaField label="Cevap" name="answer" defaultValue={editing?.answer} rows={5} required />
      </ActionForm>

      {deleteId != null && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">Bu soru kalıcı olarak silinecek. Emin misiniz?</p>
          <div className="mt-3 flex gap-2">
            <form action={deleteFaqAction}>
              <input type="hidden" name="id" value={deleteId} />
              <button type="submit" className={adminDangerButtonClass}>
                Evet, sil
              </button>
            </form>
            <Link href="/admin/faqs" className={adminGhostButtonClass}>
              Vazgeç
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-2xl">
        {faqs.length === 0 ? (
          <p className="text-sm text-neutral-500">Kayıt yok.</p>
        ) : (
          <ul className="space-y-3">
            {faqs.map((faq) => (
              <li key={faq.id} className="rounded border border-neutral-200 bg-white p-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{faq.question}</span>
                  <span className="ml-auto text-xs text-neutral-400">Sıra: {faq.order ?? 0}</span>
                </div>
                <p className="mt-1 text-neutral-700">{faq.answer}</p>
                <div className="mt-2 flex gap-3">
                  <Link href={`/admin/faqs?edit=${faq.id}`} className="text-neutral-700 underline underline-offset-2">
                    Düzenle
                  </Link>
                  <Link href={`/admin/faqs?delete=${faq.id}`} className="text-red-600 underline underline-offset-2">
                    Sil
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
