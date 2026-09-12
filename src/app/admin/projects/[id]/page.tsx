import Link from "next/link";
import { notFound } from "next/navigation";
import { listMedia } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getProjectById } from "@/lib/admin-data";
import { upsertProjectAction } from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import RepeatableRows from "@/components/admin/RepeatableRows";
import { CheckboxField, SelectField, TextField } from "@/components/admin/fields";

export const metadata = { title: "Proje" };

export default async function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const isNew = id === "new";
  const numericId = Number(id);
  if (!isNew && !Number.isFinite(numericId)) notFound();

  const [project, media] = await Promise.all([
    isNew ? Promise.resolve(null) : getProjectById(numericId),
    listMedia(),
  ]);
  if (!isNew && !project) notFound();

  const mediaOptions = media.map((item) => ({ value: String(item.id), label: item.filename }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{isNew ? "Yeni proje" : `Proje: ${project?.title}`}</h1>
        <Link href="/admin/projects" className="text-sm text-neutral-600 underline underline-offset-2">
          Listeye dön
        </Link>
      </div>

      <ActionForm action={upsertProjectAction} submitLabel="Kaydet" className="max-w-3xl space-y-5">
        {!isNew && <input type="hidden" name="id" value={project?.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Slug" name="slug" defaultValue={project?.slug} required hint="URL: /portfolyo/<slug>" />
          <TextField label="Sıra" name="order" type="number" defaultValue={project?.order ?? 0} />
        </div>
        <TextField label="Başlık" name="title" defaultValue={project?.title} required />
        <TextField label="Kategori" name="category" defaultValue={project?.category} />

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-500">Hizmet etiketleri</p>
          <RepeatableRows
            name="tags"
            addLabel="Etiket ekle"
            initialRows={project?.services ?? []}
            fields={[
              { key: "label", label: "Etiket" },
              { key: "slug", label: "Slug (boşsa etiketten üretilir)" },
              { key: "breakBefore", label: "Alt satıra geç", type: "checkbox" },
            ]}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Sonuç metni" name="results" defaultValue={project?.results} placeholder="Etkileşim Oranı +200%" />
          <TextField label="Sonuç rengi" name="resultsColor" defaultValue={project?.resultsColor} placeholder="#d93b38" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Logo"
            name="logoMediaId"
            defaultValue={project?.logo?.id ?? ""}
            options={mediaOptions}
            emptyLabel="— yok —"
          />
          <TextField
            label="Logo ölçeği"
            name="logoScale"
            type="number"
            step="0.05"
            min="0.1"
            max="5"
            defaultValue={project?.logoScale ?? 1}
          />
        </div>

        <CheckboxField
          label="Küçük etiketler (smallTags)"
          name="smallTags"
          defaultChecked={Boolean(project?.smallTags)}
        />
        <TextField
          label="Arka plan (gradyan sınıfı)"
          name="color"
          defaultValue={project?.color}
          placeholder="from-emerald-500 to-teal-600"
        />
      </ActionForm>
    </div>
  );
}
