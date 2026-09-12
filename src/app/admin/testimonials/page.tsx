import Link from "next/link";
import { listMedia, listTestimonials } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getTestimonialById } from "@/lib/admin-data";
import { deleteTestimonialAction, upsertTestimonialAction } from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import { SelectField, TextAreaField, TextField } from "@/components/admin/fields";
import { adminDangerButtonClass, adminGhostButtonClass } from "@/components/admin/styles";

export const metadata = { title: "Referanslar" };

export default async function TestimonialsAdminPage({
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

  const [testimonials, media, editing] = await Promise.all([
    listTestimonials(),
    listMedia(),
    editId != null ? getTestimonialById(editId) : Promise.resolve(null),
  ]);

  const mediaOptions = media.map((item) => ({ value: String(item.id), label: item.filename }));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Referanslar</h1>

      <ActionForm
        action={upsertTestimonialAction}
        submitLabel={editing ? "Güncelle" : "Ekle"}
        className="max-w-2xl space-y-4 rounded border border-neutral-200 bg-white p-4"
      >
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">
            {editing ? `Düzenleniyor: ${editing.name}` : "Yeni referans"}
          </h2>
          {editing && (
            <Link href="/admin/testimonials" className="text-xs text-neutral-500 underline underline-offset-2">
              Yeni kayda geç
            </Link>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="İsim" name="name" defaultValue={editing?.name} required />
          <TextField label="Şirket" name="company" defaultValue={editing?.company} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField label="Ünvan" name="role" defaultValue={editing?.role} />
          <SelectField
            label="Puan"
            name="rating"
            defaultValue={editing?.rating ?? 5}
            options={[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n} yıldız` }))}
          />
          <TextField label="Sıra" name="order" type="number" defaultValue={editing?.order ?? 0} />
        </div>
        <TextAreaField label="Yorum" name="text" defaultValue={editing?.text} rows={4} required />
        <SelectField
          label="Fotoğraf"
          name="imageMediaId"
          defaultValue={editing?.image?.id ?? ""}
          options={mediaOptions}
          emptyLabel="— yok —"
        />
      </ActionForm>

      {deleteId != null && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">Bu referans kalıcı olarak silinecek. Emin misiniz?</p>
          <div className="mt-3 flex gap-2">
            <form action={deleteTestimonialAction}>
              <input type="hidden" name="id" value={deleteId} />
              <button type="submit" className={adminDangerButtonClass}>
                Evet, sil
              </button>
            </form>
            <Link href="/admin/testimonials" className={adminGhostButtonClass}>
              Vazgeç
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-2xl">
        {testimonials.length === 0 ? (
          <p className="text-sm text-neutral-500">Kayıt yok.</p>
        ) : (
          <ul className="space-y-3">
            {testimonials.map((testimonial) => (
              <li key={testimonial.id} className="rounded border border-neutral-200 bg-white p-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-neutral-500">— {testimonial.company}</span>
                  <span className="ml-auto text-xs text-neutral-400">Sıra: {testimonial.order ?? 0}</span>
                </div>
                <p className="mt-1 text-neutral-700">{testimonial.text}</p>
                <div className="mt-2 flex gap-3">
                  <Link
                    href={`/admin/testimonials?edit=${testimonial.id}`}
                    className="text-neutral-700 underline underline-offset-2"
                  >
                    Düzenle
                  </Link>
                  <Link
                    href={`/admin/testimonials?delete=${testimonial.id}`}
                    className="text-red-600 underline underline-offset-2"
                  >
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
