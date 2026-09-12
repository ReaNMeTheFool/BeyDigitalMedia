import Link from "next/link";
import { notFound } from "next/navigation";
import { listMedia } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getServiceById } from "@/lib/admin-data";
import { upsertServiceAction } from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import RepeatableRows from "@/components/admin/RepeatableRows";
import { SelectField, TextAreaField, TextField } from "@/components/admin/fields";

export const metadata = { title: "Hizmet" };

export default async function ServiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const isNew = id === "new";
  const numericId = Number(id);
  if (!isNew && !Number.isFinite(numericId)) notFound();

  const [service, media] = await Promise.all([
    isNew ? Promise.resolve(null) : getServiceById(numericId),
    listMedia(),
  ]);
  if (!isNew && !service) notFound();

  const mediaOptions = media.map((item) => ({ value: String(item.id), label: item.filename }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{isNew ? "Yeni hizmet" : `Hizmet: ${service?.title}`}</h1>
        <Link href="/admin/services" className="text-sm text-neutral-600 underline underline-offset-2">
          Listeye dön
        </Link>
      </div>

      <ActionForm action={upsertServiceAction} submitLabel="Kaydet" className="max-w-3xl space-y-5">
        {!isNew && <input type="hidden" name="id" value={service?.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Slug" name="slug" defaultValue={service?.slug} required hint="URL: /<slug>" />
          <TextField label="Sıra" name="order" type="number" defaultValue={service?.order ?? 0} />
        </div>
        <TextField label="Başlık" name="title" defaultValue={service?.title} required />
        <TextField label="Alt başlık" name="subtitle" defaultValue={service?.subtitle} />
        <TextAreaField label="Kısa açıklama" name="description" defaultValue={service?.description} rows={3} />
        <TextAreaField label="Uzun açıklama" name="longDescription" defaultValue={service?.longDescription} rows={8} />

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Özellikler</p>
          <RepeatableRows
            name="features"
            addLabel="Özellik ekle"
            initialRows={service?.features ?? []}
            fields={[
              { key: "title", label: "Başlık" },
              { key: "description", label: "Açıklama", type: "textarea" },
            ]}
          />
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Süreç</p>
          <RepeatableRows
            name="process"
            addLabel="Adım ekle"
            initialRows={service?.process ?? []}
            fields={[
              { key: "title", label: "Başlık" },
              { key: "description", label: "Açıklama", type: "textarea" },
            ]}
          />
          <p className="mt-1 text-xs text-neutral-400">Adım numaraları kaydetme sırasında otomatik atanır.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="İkon"
            name="iconMediaId"
            defaultValue={service?.icon?.id ?? ""}
            options={mediaOptions}
            emptyLabel="— yok —"
          />
          <TextField
            label="Vurgu rengi"
            name="accentColor"
            defaultValue={service?.accentColor ?? "#0040ff"}
            placeholder="#60a5fa"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Meta başlık" name="metaTitle" defaultValue={service?.metaTitle} />
          <TextField label="Meta açıklama" name="metaDescription" defaultValue={service?.metaDescription} />
        </div>
      </ActionForm>
    </div>
  );
}
